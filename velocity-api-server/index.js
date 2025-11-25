require('dotenv').config()

const express = require('express')
const { generateSlug } = require('random-word-slugs')
const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs')
const { Server } = require('socket.io')
const Redis = require('ioredis')

const app = express()
const PORT = process.env.PORT || 9000

// Redis
const subscriber = new Redis(process.env.REDIS_URL)

// Socket Server
const io = new Server({
    cors: '*'
})

io.on('connection', socket => {
    socket.on('subscribe', channel => {
        socket.join(channel)
        socket.emit('message', `Joined ${channel}`)
    })
})

io.listen(process.env.SOCKET_PORT, () =>
    console.log(`Socket Running on ${process.env.SOCKET_PORT}`)
)

// AWS ECS Client
const ecsClient = new ECSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

app.use(express.json())

// API Route to Queue Build
app.post('/project', async (req, res) => {
    const { gitURL, slug } = req.body
    const projectSlug = slug || generateSlug()

    const command = new RunTaskCommand({
        cluster: process.env.AWS_ECS_CLUSTER,
        taskDefinition: process.env.AWS_ECS_TASK_DEFINITION,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: 'ENABLED',
                subnets: process.env.AWS_SUBNETS.split(','),
                securityGroups: [process.env.AWS_SECURITY_GROUP]
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: 'builder-image', // must match name in taskDefinition
                    environment: [
                        { name: 'GIT_REPOSITORY__URL', value: gitURL },
                        { name: 'PROJECT_ID', value: projectSlug }
                    ]
                }
            ]
        }
    })

    await ecsClient.send(command)

    return res.json({
        status: 'queued',
        data: {
            projectSlug,
            url: `http://${projectSlug}.localhost:8000`
        }
    })
})

// Subscribe to Logs
async function initRedisSubscribe() {
    console.log('Subscribed to Redis logs...')
    subscriber.psubscribe('logs:*')
    subscriber.on('pmessage', (pattern, channel, message) => {
        io.to(channel).emit('message', message)
    })
}

initRedisSubscribe()

app.listen(PORT, () =>
    console.log(`API Server Running on ${PORT}`)
)

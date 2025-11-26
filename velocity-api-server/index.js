require('dotenv').config();

const express = require('express');
const { generateSlug } = require('random-word-slugs');
const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs');
const { Server } = require('socket.io');
const http = require('http');
const Redis = require('ioredis');

const app = express();
const PORT = process.env.PORT || 9000;

// HTTP server (REQUIRED for socket.io)
const server = http.createServer(app);

// Socket.io attached to HTTP server (correct)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Redis
const subscriber = new Redis(process.env.REDIS_URL);

// Socket events
io.on('connection', (socket) => {
  socket.on('subscribe', (channel) => {
    socket.join(channel);
    socket.emit('message', `Joined ${channel}`);
  });
});

// AWS ECS Client
const ecsClient = new ECSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

app.use(express.json());

// Simple test route
app.get('/test', (req, res) => {
  res.send('hello world');
});

// Queue Build API
app.post('/project', async (req, res) => {
  const { gitURL, slug } = req.body;
  const projectSlug = slug || generateSlug();

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
          name: 'builder-image',
          environment: [
            { name: 'GIT_REPOSITORY__URL', value: gitURL },
            { name: 'PROJECT_ID', value: projectSlug }
          ]
        }
      ]
    }
  });

  await ecsClient.send(command);

  res.json({
    status: 'queued',
    data: {
      projectSlug,
      url: `http://${projectSlug}.velocity-reverse-proxy.vercel.app`
    }
  });
});

// Redis log subscription
async function initRedisSubscribe() {
  console.log('Subscribed to Redis logs...');
  subscriber.psubscribe('logs:*');
  subscriber.on('pmessage', (pattern, channel, message) => {
    io.to(channel).emit('message', message);
  });
}

initRedisSubscribe();

// Start BOTH Express + Socket.IO on ONE PORT
server.listen(PORT, () =>
  console.log(`API + Socket Server running on port ${PORT}`)
);

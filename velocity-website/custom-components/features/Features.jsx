import {
    Code,
    Terminal,
    Paintbrush,
    Rocket,
    Book,
    PlusCircle,
  } from 'lucide-react';
  
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Instant Deployments',
      desc: 'Push your code and watch it go live in seconds with zero configuration or downtime.',
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      title: 'Seamless CLI Integration',
      desc: 'Manage, deploy, and monitor your projects directly from your terminal with intuitive commands.',
    },
    {
      icon: <Paintbrush className="h-6 w-6" />,
      title: 'Custom Domains & SSL',
      desc: 'Connect your domain instantly and get automatic HTTPS certificates for every project.',
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Edge-Optimized Performance',
      desc: 'Built on a global edge network for fast, scalable, and reliable app delivery worldwide.',
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: 'Detailed Build Logs',
      desc: 'Track every deployment step with real-time logs and gain visibility into build pipelines.',
    },
    {
      icon: <PlusCircle className="h-6 w-6" />,
      title: 'Collaborate with Teams',
      desc: 'Invite your team, manage environments, and deploy together effortlessly from one dashboard.',
    },
  ];
  
  export default function Feature1() {
    return (
      <section id="features" className="relative py-14 pt-80">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="relative mx-auto max-w-2xl sm:text-center">
            <div className="relative z-10">
              <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need to deploy

              </h3>
              <p className="font-geist text-foreground/60 mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                congue, nisl eget molestie varius, enim ex faucibus purus.
              </p>
            </div>
            <div
              className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
              style={{
                background:
                  'linear-gradient(152.92deg, rgba(192, 15, 102, 0.2) 4.54%, rgba(192, 11, 109, 0.26) 34.2%, rgba(192, 15, 102, 0.1) 77.55%)',
              }}
            ></div>
          </div>
          <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />
          <div className="relative mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li
                  key={idx}
                  className="transform-gpu space-y-3 rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_#ff7aa42f_inset]"
                >
                  <div className="text-primary w-fit transform-gpu rounded-full border p-4 [box-shadow:0_-20px_80px_-20px_#ff7aa43f_inset] dark:[box-shadow:0_-20px_80px_-20px_#ff7aa40f_inset]">
                    {item.icon}
                  </div>
                  <h4 className="font-geist text-lg font-bold tracking-tighter">
                    {item.title}
                  </h4>
                  <p className="text-gray-500">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
  
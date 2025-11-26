import React from 'react';
import { ArrowRight } from 'lucide-react';
import Feature1 from '../features/Features';
import { Button } from '@/components/ui/button';

export default function Hero1() {
  return (
    <div className="relative w-full bg-neutral-950 pt-30">
      <div className="absolute top-0 z-0 h-full w-full bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <section className="relative z-1 mx-auto max-w-full">
        <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 perspective-[200px]">
          <div className="absolute inset-0 transform-[rotateX(35deg)]">
            <div className="animate-grid inset-[0%_0px] ml-[-50%] h-[300vh] w-[600vw] origin-[100%_0_0] bg-[linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] bg-size-[120px_120px] 
            "></div>
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black to-transparent to-90%"></div>
        </div>

        <div className="z-10 mx-auto max-w-7xl gap-12 px-4 py-28 text-gray-600 md:px-8">
          <div className="mx-auto max-w-3xl space-y-5 text-center leading-0 lg:leading-5">
            <h1 className="font-geist group mx-auto w-fit rounded-3xl border-2 border-white/5 bg-linear-to-tr from-zinc-300/5 via-gray-400/5 to-transparent px-5 py-2 text-sm text-gray-400">
            Deploy in seconds, scale forever
              <ArrowRight className="ml-2 inline h-4 w-4 duration-300 group-hover:translate-x-1" />
            </h1>

            <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
            Deploy your web apps{' '}
              <span className="bg-linear-to-r from-purple-300 to-orange-200 bg-clip-text text-transparent">
              instantly

              </span>
            </h2>

            

            <p  className="text-xl sm:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            A modern PaaS platform for developers to build, deploy, and scale React, Next.js, and Vue applications with ease.
          </p>

            
            <Button className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800 px-10 py-8 tracking-tighter text-white mt-25">
                <span className="absolute h-0 w-0 rounded-full bg-blue-900 transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
                <span className="absolute bottom-0 left-0 -ml-2 h-full">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="object-stretch h-full w-auto opacity-100"
                    viewBox="0 0 487 487"
                    >
                    <path
                        fillOpacity=".1"
                        fillRule="nonzero"
                        fill="#FFF"
                        d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                    ></path>
                    </svg>
                </span>
                <span className="absolute top-0 right-0 -mr-3 h-full w-12">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full object-cover"
                    viewBox="0 0 487 487"
                    >
                    <path
                        fillOpacity=".1"
                        fillRule="nonzero"
                        fill="#FFF"
                        d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                    ></path>
                    </svg>
                </span>
                <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-linear-to-b from-transparent via-transparent to-gray-200 opacity-30"></span>
                <span className="relative text-base font-semibold">Get Started Free</span>
            </Button>

          </div>
          <div>
            her the loop scrolling horizonatally 
          </div>
          
          <div className="mx-10 mt-32">
           <Feature1/>
          </div>
        </div>
      </section>
    </div>
  );
}

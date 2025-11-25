"use client";

import Header from '@/webapp/header/Header';
import HeaderDesktop from '@/webapp/header/SecondHeader';
import Main from '@/webapp/main/Main';
import React, { useEffect } from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const Webapp = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth/login"); 
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return null; // Redirect is happening above

  return (
    <div>
      <Header/>
      <div className='mt-15 hidden lg:block'>
        <HeaderDesktop/>
      </div>
      <div className=''>
        <Main/>
      </div>
    </div>
  );
};

export default Webapp;

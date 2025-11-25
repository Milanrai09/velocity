"use client"

import React from 'react'
import { Video } from "lucide-react";
import Link from 'next/link';
const HeaderDesktop = () => {
  return (
    <div className='flex justify-between border border-white-200 p-6 fixed left-0 right-0 bg-white  '>


        <div>
            <Link 
                href="/dashboard/projects" // Use 'href'
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                Projects
            </Link>
            <Link 
                href="/dashboard/deployments" // Use 'href'
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                Deployments
            </Link>
            <Link 
                href="/dashboard/settings" // Use 'href'
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                Settings
            </Link>
        </div>

    

        </div>

  )
}

export default HeaderDesktop

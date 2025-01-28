import React from "react";
import Profile from '@/assets/profile.jpeg'
import { InstagramIcon , GithubIcon, LinkedinIcon , Music2Icon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
 

function ProfileLayout() {
    return(
        <div>
          <div className=" my-7 flex flex-row">
              <img src={Profile} className=' object-cover grayscale hover:grayscale-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full' alt='profile'/>
              <div className=' ms-5 flex flex-col gap-2'>
                  <h1 className=' text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-gray-200' > Ferry Fernando </h1>
                    <h3 className=' text-sm lg:text-xl font-semibold'>
                      <HoverCard >
                          <HoverCardTrigger className='hover:border-none focus:border-none ' asChild>
                            <Button className="dark:bg-zinc-700/50 bg-zinc-800 text-gray-100 rounded-xl border-none hover:border-none focus:border-none " variant="link">@ferynnd</Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80 bg-yellow-600/90 text-white">
                            <div className="flex justify-between space-x-4">
                              <Avatar>
                                <AvatarImage src="https://cdn-icons-png.freepik.com/256/2111/2111463.png?semt=ais_hybrid" />
                                <AvatarFallback>Ryyn</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold text-white">@ferynnd</h4>
                                <p className="text-sm ">
                                  Stay connected with me and be part of the journey! 🚀
                                </p>
                                <div className="flex items-center pt-2">
                                  <span className="text-xs text-white text-muted-foreground">
                                    © Ferynnd 2025. All Rights Reserved.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                    </h3>
              </div>
          </div>
          <div className='w-full'>
              <h1 className='text-sm lg:text-base text-wrap text-zinc-900 dark:text-gray-200'> Ubur -Ubur Ikan lele , Menyala Leee 🔥 </h1>
              <div className='flex flex-row gap-3 my-5'>
                <a href='https://instagram.com/ferynnd'>
                  <InstagramIcon className=' text-zinc-900 dark:text-gray-200 hover:text-yellow-500' />
                </a>
                <a href='https://github.com/ferynnd'>
                  <GithubIcon className=' text-zinc-900 lg:text-2xl dark:text-gray-200  hover:text-yellow-500' />
                </a>
                <a href='https://www.linkedin.com/in/ferryfernandoo/'>
                  <LinkedinIcon className=' text-zinc-900 lg:text-2xl dark:text-gray-200  hover:text-yellow-500' />
                </a>
                <a href='https://www.tiktok.com/@ferynndo?_t=ZS-8tR16Rs2Sm7&_r=1'>
                  <Music2Icon className=' text-zinc-900 lg:text-2xl dark:text-gray-200  hover:text-yellow-500' />
                </a>
              </div>
          </div>
        </div>
    )
}

export default ProfileLayout;
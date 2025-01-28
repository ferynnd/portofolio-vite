import React , { useState, useEffect } from "react";
import LayoutContainer from '../components/LayoutContainer';
import Navbar from '../components/Navbar';
import Profile from '@/assets/profile.jpeg';
import LogoWall from '@/components/ui/LogoWall';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTheme } from '@/components/theme-provider';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import supabase from '@/supabaseClient';

function About() {
  const { theme, setTheme } = useTheme();
  const pickColor = theme === "dark" ? '#111111' : '#e5e7eb';

  const [images, setImages] = useState([]);

  const logoImgs = [
    { imgUrl: "https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg", altText: "Tailwind CSS" },
    { imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", altText: "JavaScript" },
    { imgUrl: "https://icon.icepanel.io/Technology/svg/PHP.svg", altText: "PHP" },
    { imgUrl: "https://icon.icepanel.io/Technology/svg/Kotlin.svg", altText: "Kotlin" },
    { imgUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", altText: "Python" },
    { imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg", altText: "Laravel" },
    { imgUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", altText: "React" }
  ];

  useEffect(()=> {
    // Fetch projects from Supabase
    const fetchImage = async () => {
     const { data, error } = await supabase
       .from('ExperienceEducation')
       .select('*')
       .order('created_at', { ascending: true });
 
     if (error) console.error('Error fetching images:', error);
     else setImages(data);

    };

    fetchImage();
  }, [] );






  return (
    <>
      <LayoutContainer>
        <Navbar />
        <div className="my-7 flex flex-row flex-wrap">
          <img src={Profile} className='object-cover grayscale hover:grayscale-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full' alt='profile' />
          <div className='ms-5 flex flex-col gap-2'>
            <h1 className='text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-gray-200'>Ferry Fernando</h1>
            <h3 className='text-sm lg:text-xl font-semibold'>
              <HoverCard>
                <HoverCardTrigger className='hover:border-none focus:border-none' asChild>
                  <Button className="dark:bg-zinc-700/50 bg-zinc-800 text-gray-100 rounded-xl border-none hover:border-none focus:border-none" variant="link">@ferynnd</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-yellow-600/90 text-white">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="https://cdn-icons-png.freepik.com/256/2111/2111463.png?semt=ais_hybrid" />
                      <AvatarFallback>Ryyn</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-white">@ferynnd</h4>
                      <p className="text-sm">
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
        <div className="w-full max-h-80">
          <h1 className="text-xs lg:text-sm text-wrap text-start text-zinc-900 dark:text-gray-200">
            Saya adalah mahasiswa Teknologi Informasi Politeknik Negeri Madiun dengan minat di Web & Mobile Development, UI/UX Design, dan Network Engineering. Terampil menganalisis masalah dan merancang solusi dengan Visual Studio Code, Android Studio, Figma and another TechStack.
          </h1>
        </div>
        <div className="relative h-[130px] lg:h-[230px] w-full overflow-hidden">
          <LogoWall
            items={logoImgs}
            direction="horizontal"
            pauseOnHover={true}
            size='clamp(5rem, 1rem + 12vmin, 15rem)'
            duration="60s"
            bgColor=""
            bgAccentColor={pickColor}
            className="flex items-center justify-start gap-2"
          />
        </div>
        <h2 className="text-lg lg:-mt-5 lg:text-2xl font-bold text-zinc-800 dark:text-white mb-4">
          Experience & Education
        </h2>
          <div className=" h-40 lg:h-60 w-full flex justify-center">
            <Carousel className="w-full max-w-xs lg:max-w-2xl">
              <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id} className="basis-3/4 lg:basis-1/2">
                  <div className="h-40 lg:h-60">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden">
                        <img
                          src={image.image}
                          alt={image.slug}
                          className="w-full h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
            </Carousel>
          </div>
      </LayoutContainer>
    </>
  );
}

export default About;

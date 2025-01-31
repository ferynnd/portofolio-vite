import { useEffect, useState } from 'react';
import LayoutContainer from '../components/LayoutContainer';
import Navbar from '../components/Navbar';
import ProfileLayout from '../components/ProfileLayout';
import Profile from '@/assets/profile.jpeg';
import { Github, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import supabase from '@/supabaseClient';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useTheme } from '@/components/theme-provider';

function Home() {
  const [projects, setProjects] = useState([]);

  const { theme , setTheme } = useTheme();

  const spotlightColor =
  theme === "dark" ? 'rgba(255, 223, 70, 0.30)' : 'rgba(10, 10, 10, 0.70)';


  // Fetch projects from Supabase
  const fetchProject = async () => {
    const { data, error } = await supabase
      .from('project')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) console.error('Error fetching projects:', error);
    else setProjects(data);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <LayoutContainer>
        <Navbar />
        <ProfileLayout />
        {/* Scroll Area for Projects */}
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-zinc-800 dark:text-white mb-4">
            Recent Projects
          </h2>
          <ScrollArea className="h-[300px] lg:h-[600px] md:h-[600px]  w-full overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="grid lg:grid-cols-2 gap-2 lg:gap-3 lg:p-3">
              {projects.map((item) => (
               <SpotlightCard
                    key={item.id}
                    spotlightColor={spotlightColor}
                    className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-700"
                  >
                  <img
                    className="w-full h-28 object-cover"
                    src={item.image}
                    alt={`${item.title} thumbnail`}
                  />
                  <div className="p-4">
                    <h1 className="text-base lg:text-xl hover:underline font-semibold text-zinc-800 dark:text-white">
                      {item.title}{' '}
                      <span className="text-sm text-slate-800 dark:text-gray-200">
                        | {item.category}
                      </span>
                    </h1>
                    <div className="flex items-center bottom-0 gap-3 mt-3">
                      <a href={item.github} >
                        <Github className="text-zinc-700 dark:text-gray-200" />
                      </a>
                      {
                          item.preview !== null ? (
                            <a href={item.preview}>
                              <Link2 className="text-gray-700 dark:text-gray-200" />
                            </a>
                          ) : null
                      }bg-background 
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </ScrollArea>
        </div>
      </LayoutContainer>
    </>
  );
}

export default Home;

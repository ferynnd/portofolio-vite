import React from 'react';
import LayoutContainer from '../components/LayoutContainer';
import { Link } from 'react-router-dom'; // Jika menggunakan React Router
import { Button } from '../components/ui/button'; // Import Button dari shadcn/ui

function NotFound() {
  return (
    <>
      <LayoutContainer>
        <div className="flex flex-col items-center justify-center text-center min-h-screen text-foreground p-4">
          <h1 className="text-6xl font-bold text-destructive mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button  asChild>
            <Link to="/" className="text-sm dark:bg-zinc-200  text-gray-100 hover:text-white dark:hover:text-red-500  font-medium">
              Go back to the homepage
            </Link>
          </Button>
        </div>
      </LayoutContainer>
    </>
  );
}

export default NotFound;
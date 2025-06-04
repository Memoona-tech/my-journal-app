import React from 'react';
import Link from 'next/link';
import { SocialLinks } from './socialLinks';

export const Header = () => {
    return(
        <header className="h-20 w-full bg-pink-400 text-white px-4 flex items-center justify-between">

        <Link href="/">
          <span className="text-2xl font-bold hover:text-pink-800 transition-colors duration-300">
            MyJournal🌷.
          </span>
        </Link>
        <SocialLinks />
        
      </header>
    )
}
import React from "react";
import { Instagram, Youtube, Mail } from "lucide-react";
import Link from "next/link";
// import { ThemeToggle } from "./theme";
// import { ThemePicker } from "./themePicker";
export const SocialLinks = () => {
    return(
        <div className="flex flex-row items-center justify-between p-6 space-x-4">
            
                  <Link href="https://www.instagram.com/itz.memoona/" target="_blank" rel="noopener noreferrer">
                    <Instagram className='inline-block mr-2   hover:text-pink-800 transition-colors duration-300' />
                  </Link>
                  <Link href="https://www.youtube.com/@skycarly/" target="_blank" rel="noopener noreferrer">
                    <Youtube className='inline-block mr-2   hover:text-pink-800 transition-colors duration-300' />
                  </Link>
                  <Link href="mailto:skycarly.query@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className='inline-block mr-2   hover:text-pink-800 transition-colors duration-300' />
                  </Link>
                  
                  {/* <ThemeToggle /> */}
                  
                  {/* <ThemePicker /> */}
                  
        </div>
    )
}
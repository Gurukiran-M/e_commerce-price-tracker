"use client"
import Image from 'next/image'
import Link from 'next/link'
import UserProfile from './UserProfile'
import { useEffect, useState } from 'react'
import { usePathname } from "next/navigation";

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  // { src: '/assets/icons/user.svg', alt: 'user' },
]

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check login state from localStorage
    const user = localStorage.getItem("username"); 
    setIsLoggedIn(!!user); // Convert to boolean

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("username");
      setIsLoggedIn(!!updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />

          <p className="nav-logo">
            Buy<span className='text-primary'>Wiz</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            <Image 
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}
           {isLoggedIn && !pathname.startsWith("/products/") && <UserProfile />}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
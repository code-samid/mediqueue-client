'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  LogOut,
  BookOpen,
  PlusCircle,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Tutors', href: '/tutors' },
];

const privateLinks = [
  { label: 'Add Tutor', href: '/add-tutor', icon: PlusCircle },
  { label: 'My Tutors', href: '/my-tutors', icon: GraduationCap },
  { label: 'My Bookings', href: '/my-booked-sessions', icon: BookOpen },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
        >
          MediQueue
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {user &&
            privateLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none ring-2 ring-indigo-500/30 hover:ring-indigo-500/60 transition-all">
                <Avatar className="w-9 h-9 cursor-pointer">
                  <AvatarImage src={user.photoURL} />

                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold">
                    {user.displayName?.[0] ||
                      user.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl"
              >
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold truncate">
                    {user.displayName || 'User'}
                  </p>

                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>

                <DropdownMenuSeparator />

                {privateLinks.map((link) => (
                  <DropdownMenuItem key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 w-full"
                    >
                      <link.icon size={15} />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500 cursor-pointer flex items-center gap-2"
                >
                  <LogOut size={15} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link href="/login">Login</Link>
              </Button>

              <Button
                size="sm"
                asChild
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90"
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-full w-9 h-9 hover:bg-secondary transition-colors cursor-pointer">
              <Menu size={20} />
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-2 mt-8">

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                {user &&
                  privateLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium px-4 py-3 rounded-xl hover:bg-secondary transition-colors flex items-center gap-2"
                    >
                      <link.icon
                        size={16}
                        className="text-indigo-500"
                      />
                      {link.label}
                    </Link>
                  ))}

                {!user && (
                  <div className="flex flex-col gap-2 mt-4">

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-xl"
                    >
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                      >
                        Login
                      </Link>
                    </Button>

                    <Button
                      asChild
                      className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0"
                    >
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                      >
                        Sign up
                      </Link>
                    </Button>

                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
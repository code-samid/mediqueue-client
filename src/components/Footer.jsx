import Link from 'next/link';
import { GraduationCap, GitBranch, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-3">
              MediQueue
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting students with verified tutors for a better learning experience.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Browse tutors', href: '/tutors' },
                { label: 'Add tutor', href: '/add-tutor' },
                { label: 'My bookings', href: '/my-booked-sessions' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@mediqueue.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Mail size={14} />
                hello@mediqueue.com
              </a>
              <a href="https://github.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <GitBranch size={14} />
                GitHub
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2025 MediQueue. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <span className="text-red-500">♥</span> for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
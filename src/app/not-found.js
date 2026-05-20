'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-8xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => router.back()} variant="outline" className="rounded-xl gap-2">
            <ArrowLeft size={16} /> Go back
          </Button>
          <Button onClick={() => router.push('/')} className="rounded-xl gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90">
            <Home size={16} /> Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
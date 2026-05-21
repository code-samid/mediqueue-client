import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-100" />
        <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin absolute top-0 left-0" />
      </div>
      <p className="text-muted-foreground text-sm font-medium animate-pulse">{text}</p>
    </div>
  );
}
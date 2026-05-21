'use client';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TutorCard({ tutor, index = 0 }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-background border border-border rounded-2xl p-5 hover:border-indigo-300 hover:-translate-y-1 transition-all cursor-pointer glow-hover group"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
          {tutor.photo ? (
            <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
          ) : (
            tutor.name?.[0]?.toUpperCase()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{tutor.name}</p>
          <p className="text-sm text-muted-foreground">{tutor.subject}</p>
        </div>
        <Badge variant="secondary" className="shrink-0 text-xs">{tutor.teachingMode}</Badge>
      </div>

      {/* Details */}
      <div className="space-y-1.5 mb-4">
        {tutor.location && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={12} className="text-indigo-400 shrink-0" />
            {tutor.location}
          </div>
        )}
        {tutor.availableDays && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={12} className="text-indigo-400 shrink-0" />
            {tutor.availableDays}
          </div>
        )}
        {tutor.availableTime && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={12} className="text-indigo-400 shrink-0" />
            {tutor.availableTime}
          </div>
        )}
      </div>

      {/* Price and slots */}
      <div className="flex justify-between items-center mb-4 py-3 border-t border-border">
        <span className="font-extrabold text-indigo-500 text-xl">€{tutor.hourlyFee}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tutor.totalSlot > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {tutor.totalSlot > 0 ? `${tutor.totalSlot} slots left` : 'Full'}
        </span>
      </div>

      {/* Button */}
      <Button
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all"
        onClick={() => router.push(`/tutors/${tutor._id}`)}
      >
        View profile
      </Button>
    </motion.div>
  );
}
'use client';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const tutors = [
  { initials: 'SA', name: 'Sara A.', subject: 'Mathematics', rating: 4.9, price: 25, mode: 'Online', exp: '7 yrs', bg: '#EEF2FF', color: '#4338CA' },
  { initials: 'MK', name: 'Mike K.', subject: 'Physics', rating: 4.8, price: 30, mode: 'Both', exp: '5 yrs', bg: '#F0FDF4', color: '#166534' },
  { initials: 'LP', name: 'Lisa P.', subject: 'English', rating: 5.0, price: 20, mode: 'Online', exp: '3 yrs', bg: '#FDF4FF', color: '#7E22CE' },
];

const subjects = ['Mathematics', 'Physics', 'English', 'Chemistry', 'ICT', 'Biology'];

const stats = [
  { value: '500+', label: 'Verified tutors', icon: Users },
  { value: '10k+', label: 'Sessions booked', icon: BookOpen },
  { value: '4.9★', label: 'Average rating', icon: Star },
];

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Navbar */}
        <motion.nav
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="flex justify-between items-center mb-12"
        >
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            MediQueue
          </span>
          <div className="flex items-center gap-3">
            {['Home', 'Tutors', 'Login'].map((item) => (
              <span key={item} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors px-3 py-1.5 rounded-full hover:bg-secondary">
                {item}
              </span>
            ))}
            <ThemeToggle />
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white cursor-pointer">
              <Users size={16} />
            </div>
          </div>
        </motion.nav>

        {/* Hero */}
        <section className="text-center py-12">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-5">
            <Badge variant="secondary" className="gap-2 px-4 py-1.5 text-sm rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
              500+ tutors available now
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tight"
          >
            Find your perfect tutor
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
              book in seconds
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Connect with verified tutors for any subject, any level.
            Learn online or in person — on your schedule.
          </motion.p>

          {/* Search bar */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex items-center gap-3 max-w-lg mx-auto mb-6 bg-background border border-border rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all"
          >
            <Search size={18} className="text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by subject, tutor name..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-lg">
              Search
            </Button>
          </motion.div>

          {/* Subject tags */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {subjects.map((s) => (
              <span key={s} className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer hover:bg-indigo-100 transition-colors">
                {s}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={5}
            className="flex gap-3 justify-center flex-wrap"
          >
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-xl px-8 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all">
              Browse Tutors <ArrowRight size={16} className="ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 hover:-translate-y-0.5 transition-all">
              Become a Tutor
            </Button>
          </motion.div>
        </section>

        {/* Stats */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={6}
          className="grid grid-cols-3 gap-4 mb-14"
        >
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center py-5 px-4 bg-secondary/50 rounded-2xl">
              <Icon size={20} className="mx-auto mb-2 text-indigo-500" />
              <div className="text-3xl font-extrabold text-indigo-500 mb-1">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured tutors */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7}>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
            Featured tutors
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {tutors.map((t, i) => (
              <motion.div
                key={t.name}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                className="bg-background border border-border rounded-2xl p-4 hover:border-indigo-300 hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ background: t.bg, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.subject}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-green-600 font-semibold">★ {t.rating}</span>
                  <span className="text-sm font-bold text-indigo-500">€{t.price}/hr</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">{t.mode}</span>
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">{t.exp} exp</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={8}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl p-10 text-center text-white"
        >
          <Award size={36} className="mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-extrabold mb-3">Ready to start learning?</h2>
          <p className="text-white/80 mb-6 text-base">
            Join thousands of students already learning with MediQueue
          </p>
          <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
            Create free account <ArrowRight size={14} className="inline ml-1" />
          </button>
        </motion.div>

      </div>
    </main>
  );
}
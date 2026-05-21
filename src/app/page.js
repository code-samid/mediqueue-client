'use client';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, BookOpen, Users, Award, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroCarousel from '@/components/HeroCarousel';
import axios from 'axios';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const subjects = ['Mathematics', 'Physics', 'English', 'Chemistry', 'ICT', 'Biology'];

const stats = [
  { value: '500+', label: 'Verified tutors', icon: Users },
  { value: '10k+', label: 'Sessions booked', icon: BookOpen },
  { value: '4.9★', label: 'Average rating', icon: Star },
];

const features = [
  { icon: CheckCircle, title: 'Verified tutors', desc: 'Every tutor is verified and reviewed by students' },
  { icon: Calendar, title: 'Flexible scheduling', desc: 'Book sessions that fit your timetable' },
  { icon: Star, title: 'Affordable rates', desc: 'Find tutors for every budget starting from €15/hr' },
  { icon: BookOpen, title: 'Any subject', desc: 'Mathematics, Physics, English, Chemistry and more' },
];

const steps = [
  { step: '01', title: 'Create account', desc: 'Sign up free in under a minute' },
  { step: '02', title: 'Browse tutors', desc: 'Search by subject, price or availability' },
  { step: '03', title: 'Book session', desc: 'Pick a time and confirm your booking instantly' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [featuredTutors, setFeaturedTutors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tutors?limit=6`)
      .then((res) => {
        const data = res.data;
        const shuffled = data.sort(() => Math.random() - 0.5).slice(0, 3);
        setFeaturedTutors(shuffled);
      })
      .catch(() => console.error('Failed to fetch featured tutors'));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/tutors?search=${search}`);
    } else {
      router.push('/tutors');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Hero */}
      <section className="text-center py-16">
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
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
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
        <motion.form
          onSubmit={handleSearch}
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="flex items-center gap-3 max-w-lg mx-auto mb-6 bg-background border border-border rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all"
        >
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by subject or tutor name..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button type="submit" size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-lg">
            Search
          </Button>
        </motion.form>

        {/* Subject tags */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {subjects.map((s) => (
            <span
              key={s}
              onClick={() => router.push(`/tutors?search=${s}`)}
              className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer hover:bg-indigo-100 transition-colors"
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={5}
          className="flex gap-3 justify-center flex-wrap"
        >
          <Button
            size="lg"
            onClick={() => router.push('/tutors')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-xl px-8 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
          >
            Browse Tutors <ArrowRight size={16} className="ml-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push('/register')}
            className="rounded-xl px-8 hover:-translate-y-0.5 transition-all"
          >
            Get started free
          </Button>
        </motion.div>
      </section>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={6}
        className="grid grid-cols-3 gap-4 mb-20"
      >
        {stats.map(({ value, label, icon: Icon }) => (
          <div key={label} className="text-center py-6 px-4 bg-secondary/50 rounded-2xl">
            <Icon size={22} className="mx-auto mb-2 text-indigo-500" />
            <div className="text-3xl font-extrabold text-indigo-500 mb-1">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </motion.div>

      {/* Featured tutors */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={7} className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Featured</p>
            <h2 className="text-2xl font-extrabold">Top tutors this week</h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push('/tutors')} className="rounded-full">
            View all <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredTutors.length === 0 ? (
            // Skeleton loading cards
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-background border border-border rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-secondary rounded w-3/4" />
                    <div className="h-3 bg-secondary rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-secondary rounded" />
                  <div className="h-3 bg-secondary rounded w-5/6" />
                </div>
                <div className="h-3 bg-secondary rounded w-1/3 mb-4" />
                <div className="h-9 bg-secondary rounded-xl" />
              </div>
            ))
          ) : (
            featuredTutors.map((t, i) => (
              <motion.div
                key={t._id}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                className="bg-background border border-border rounded-2xl p-5 hover:border-indigo-300 hover:-translate-y-1 transition-all cursor-pointer group glow-hover"
                onClick={() => router.push(`/tutors/${t._id}`)}
              >
                {/* Avatar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      t.name?.[0]?.toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.subject}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-xs">{t.teachingMode}</Badge>
                </div>

                {/* Details */}
                <div className="space-y-1.5 mb-4">
                  {t.location && (
                    <p className="text-xs text-muted-foreground">📍 {t.location}</p>
                  )}
                  {t.availableDays && (
                    <p className="text-xs text-muted-foreground">📅 {t.availableDays}</p>
                  )}
                  {t.availableTime && (
                    <p className="text-xs text-muted-foreground">🕐 {t.availableTime}</p>
                  )}
                </div>

                {/* Price and slots */}
                <div className="flex justify-between items-center mb-4 py-3 border-t border-border">
                  <span className="font-extrabold text-indigo-500 text-xl">
                    €{t.hourlyFee}
                    <span className="text-xs font-normal text-muted-foreground">/hr</span>
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    t.totalSlot > 0
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {t.totalSlot > 0 ? `${t.totalSlot} slots left` : 'Full'}
                  </span>
                </div>

                {/* Button */}
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/tutors/${t._id}`);
                  }}
                >
                  Book session
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </motion.section>

      {/* Why MediQueue */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={8} className="mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Why us</p>
          <h2 className="text-2xl font-extrabold">Why choose MediQueue</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background border border-border rounded-2xl p-5 hover:border-indigo-300 transition-all glow-hover">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Icon size={20} className="text-indigo-500" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={9} className="mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Simple</p>
          <h2 className="text-2xl font-extrabold">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-extrabold text-lg">{step}</span>
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA Banner */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={10}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl p-12 text-center text-white mb-8"
      >
        <Award size={40} className="mx-auto mb-4 opacity-90" />
        <h2 className="text-3xl font-extrabold mb-3">Ready to start learning?</h2>
        <p className="text-white/80 mb-6 text-base max-w-md mx-auto">
          Join thousands of students already learning with MediQueue
        </p>
        <Button
          onClick={() => router.push('/register')}
          className="bg-white text-indigo-600 hover:bg-white/90 font-bold px-8 py-3 rounded-xl h-auto text-sm"
        >
          Create free account <ArrowRight size={14} className="inline ml-1" />
        </Button>
      </motion.div>

    </div>
  );
}
'use client';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, BookOpen, Users, Award, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroCarousel from '@/components/HeroCarousel';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
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

const features = [
  { icon: CheckCircle, title: 'Verified tutors', desc: 'Every tutor is reviewed and verified by real students' },
  { icon: Calendar, title: 'Flexible scheduling', desc: 'Book sessions that fit perfectly into your timetable' },
  { icon: Star, title: 'Affordable rates', desc: 'Find tutors for every budget starting from €15/hr' },
  { icon: BookOpen, title: 'Any subject', desc: 'Maths, Physics, English, Chemistry and many more' },
];

const steps = [
  { step: '01', title: 'Create account', desc: 'Sign up free in under a minute' },
  { step: '02', title: 'Browse tutors', desc: 'Search by subject, price or availability' },
  { step: '03', title: 'Book session', desc: 'Pick a time and confirm instantly' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(search.trim() ? `/tutors?search=${search}` : '/tutors');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Hero */}
      <section className="text-center py-20">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-6">
          <Badge variant="secondary" className="gap-2 px-4 py-1.5 text-sm rounded-full border border-indigo-100">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
            500+ tutors available now
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight"
        >
          Learn anything,
          <br />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            from anyone
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="text-xl text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Connect with verified tutors for any subject, any level — online or in person, on your schedule.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="flex items-center gap-2 max-w-xl mx-auto mb-8 bg-background border-2 border-border rounded-2xl px-5 py-3 shadow-sm focus-within:border-indigo-400 transition-all duration-200"
        >
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by subject or tutor name..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button type="submit" size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-xl px-5">
            Search
          </Button>
        </motion.form>

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {subjects.map((s) => (
            <span
              key={s}
              onClick={() => router.push(`/tutors?search=${s}`)}
              className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
            >
              {s}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={5}
          className="flex gap-3 justify-center flex-wrap"
        >
          <Button
            size="lg"
            onClick={() => router.push('/tutors')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-2xl px-8 h-12 text-base shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all"
          >
            Browse tutors <ArrowRight size={18} className="ml-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push('/register')}
            className="rounded-2xl px-8 h-12 text-base hover:-translate-y-0.5 transition-all border-2"
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
        className="grid grid-cols-3 gap-4 mb-24"
      >
        {stats.map(({ value, label, icon: Icon }) => (
          <div key={label} className="text-center py-8 px-4 bg-gradient-to-b from-secondary/80 to-secondary/30 rounded-3xl border border-border/50">
            <Icon size={24} className="mx-auto mb-3 text-indigo-500" />
            <div className="text-4xl font-extrabold text-indigo-500 mb-1">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </motion.div>

      {/* Featured tutors */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={7} className="mb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Sparkles size={12} /> Featured
            </p>
            <h2 className="text-3xl font-extrabold">Top tutors this week</h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push('/tutors')} className="rounded-full border-2 gap-1">
            View all <ArrowRight size={14} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tutors.map((t, i) => (
            <motion.div
              key={t.name}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
              className="bg-background border-2 border-border rounded-3xl p-6 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base shrink-0"
                  style={{ background: t.bg, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-base">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.subject}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-600 font-bold bg-green-50 dark:bg-green-950/40 px-2.5 py-1 rounded-full">★ {t.rating}</span>
                <span className="text-xl font-extrabold text-indigo-500">€{t.price}<span className="text-sm font-normal text-muted-foreground">/hr</span></span>
              </div>
              <div className="flex gap-2 flex-wrap mb-5">
                <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full">{t.mode}</span>
                <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full">{t.exp} exp</span>
              </div>
              <Button
                size="sm"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 h-9"
                onClick={() => router.push('/tutors')}
              >
                Book session
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why MediQueue */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={8} className="mb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Why us</p>
          <h2 className="text-3xl font-extrabold">Why choose MediQueue</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background border-2 border-border rounded-3xl p-6 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 transition-all group">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
                <Icon size={22} className="text-indigo-500" />
              </div>
              <h3 className="font-bold text-base mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={9} className="mb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Simple</p>
          <h2 className="text-3xl font-extrabold">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map(({ step, title, desc }, i) => (
            <div key={step} className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/20">
                <span className="text-white font-extrabold text-xl">{step}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA Banner */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={10}
        className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl p-14 text-center text-white overflow-hidden mb-8"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative">
          <Award size={44} className="mx-auto mb-5 opacity-90" />
          <h2 className="text-4xl font-extrabold mb-4">Ready to start learning?</h2>
          <p className="text-white/80 mb-8 text-lg max-w-md mx-auto">
            Join thousands of students already learning with MediQueue
          </p>
          <Button
            onClick={() => router.push('/register')}
            className="bg-white text-indigo-600 hover:bg-white/90 font-bold px-10 py-4 rounded-2xl h-auto text-base shadow-lg"
          >
            Create free account <ArrowRight size={16} className="inline ml-2" />
          </Button>
        </div>
      </motion.div>

    </div>
  );
}
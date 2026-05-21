'use client';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search, Loader2, BookOpen, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRouter, useSearchParams } from 'next/navigation';
import PageTransition from '@/components/PageTransition';

function TutorCard({ tutor, index }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background border-2 border-border rounded-3xl p-6 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden">
          {tutor.photo ? (
            <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
          ) : (
            tutor.name?.[0]?.toUpperCase()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base truncate">{tutor.name}</p>
          <p className="text-sm text-muted-foreground">{tutor.subject}</p>
        </div>
        <Badge variant="secondary" className="shrink-0 rounded-full font-semibold">{tutor.teachingMode}</Badge>
      </div>

      <div className="space-y-1.5 mb-5 text-sm text-muted-foreground">
        {tutor.location && <p className="flex items-center gap-1.5"><span>📍</span>{tutor.location}</p>}
        {tutor.availableDays && <p className="flex items-center gap-1.5"><span>📅</span>{tutor.availableDays}</p>}
        {tutor.availableTime && <p className="flex items-center gap-1.5"><span>🕐</span>{tutor.availableTime}</p>}
      </div>

      <div className="flex justify-between items-center mb-5 py-3 border-t border-border">
        <div>
          <span className="text-2xl font-extrabold text-indigo-500">€{tutor.hourlyFee}</span>
          <span className="text-sm text-muted-foreground">/hr</span>
        </div>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${tutor.totalSlot > 0 ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'}`}>
          {tutor.totalSlot > 0 ? `${tutor.totalSlot} slots left` : 'Fully booked'}
        </span>
      </div>

      <Button
        className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 h-10 group-hover:shadow-md group-hover:shadow-indigo-500/20 transition-all"
        onClick={() => router.push(`/tutors/${tutor._id}`)}
      >
        View profile
      </Button>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-background border-2 border-border rounded-3xl p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-secondary shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-secondary rounded-full w-3/4" />
          <div className="h-3 bg-secondary rounded-full w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-5">
        <div className="h-3 bg-secondary rounded-full" />
        <div className="h-3 bg-secondary rounded-full w-4/5" />
      </div>
      <div className="h-10 bg-secondary rounded-2xl" />
    </div>
  );
}

function TutorsContent() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearch(q);
    fetchTutors(q || '');
  }, []);

  const fetchTutors = async (searchVal = search, start = startDate, end = endDate) => {
    setLoading(true);
    try {
      const params = {};
      if (searchVal) params.search = searchVal;
      if (start) params.startDate = start;
      if (end) params.endDate = end;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, { params });
      setTutors(res.data);
    } catch {
      console.error('Failed to fetch tutors');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTutors();
  };

  const handleReset = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
    fetchTutors('', '', '');
  };

  const hasFilters = search || startDate || endDate;

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Discover</p>
          <h1 className="text-4xl font-extrabold mb-2">Browse tutors</h1>
          <p className="text-muted-foreground text-lg">Find the perfect tutor for your needs</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-3 mb-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by tutor name..."
                className="pl-10 rounded-2xl h-11 border-2 focus:border-indigo-400"
              />
            </div>
            <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-2xl px-6 h-11">
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`rounded-2xl h-11 gap-2 border-2 ${showFilters ? 'border-indigo-400 text-indigo-500' : ''}`}
            >
              <SlidersHorizontal size={15} /> Filters
            </Button>
          </form>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-secondary/30 rounded-2xl p-4 border-2 border-border flex gap-4 flex-wrap items-end"
            >
              <div className="flex-1 min-w-40">
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Session start from</label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="rounded-xl border-2" />
              </div>
              <div className="flex-1 min-w-40">
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Session start to</label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="rounded-xl border-2" />
              </div>
              <Button type="button" onClick={() => fetchTutors()} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-xl h-10">
                Apply
              </Button>
            </motion.div>
          )}

          {hasFilters && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              {search && (
                <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  {search}
                  <X size={10} className="cursor-pointer" onClick={() => { setSearch(''); fetchTutors(''); }} />
                </span>
              )}
              <button onClick={handleReset} className="text-xs text-muted-foreground hover:text-foreground underline">Clear all</button>
            </div>
          )}
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : tutors.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 border-2 border-dashed border-border rounded-3xl">
            <BookOpen size={52} className="mx-auto mb-5 text-muted-foreground/30" />
            <h3 className="text-xl font-bold mb-2">No tutors found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or clearing filters</p>
            <Button onClick={handleReset} variant="outline" className="rounded-2xl border-2 gap-2">
              <X size={14} /> Clear filters
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mb-5 font-medium">
              Showing <span className="text-foreground font-bold">{tutors.length}</span> tutor{tutors.length !== 1 ? 's' : ''}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tutors.map((tutor, i) => (
                <TutorCard key={tutor._id} tutor={tutor} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
}

export default function TutorsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    }>
      <TutorsContent />
    </Suspense>
  );
}
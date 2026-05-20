'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search, Filter, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function TutorCard({ tutor, index }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-background border border-border rounded-2xl p-5 hover:border-indigo-300 hover:-translate-y-1 transition-all cursor-pointer group"
    >
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
        <Badge variant="secondary" className="shrink-0">{tutor.teachingMode}</Badge>
      </div>

      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
        {tutor.location && <p>📍 {tutor.location}</p>}
        {tutor.availableDays && <p>📅 {tutor.availableDays}</p>}
        {tutor.availableTime && <p>🕐 {tutor.availableTime}</p>}
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="font-extrabold text-indigo-500 text-lg">€{tutor.hourlyFee}/hr</span>
        <span className="text-sm text-muted-foreground">{tutor.totalSlot} slots left</span>
      </div>

      <Button
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90"
        onClick={() => router.push(`/tutors/${tutor._id}`)}
      >
        View profile
      </Button>
    </motion.div>
  );
}

function TutorsContent() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold mb-2">Browse tutors</h1>
        <p className="text-muted-foreground">Find the perfect tutor for your needs</p>
      </div>

      {/* Search and filter */}
      <form onSubmit={handleSearch} className="bg-background border border-border rounded-2xl p-5 mb-8 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tutor name..."
              className="pl-9 rounded-xl"
            />
          </div>
          <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 rounded-xl px-6">
            Search
          </Button>
        </div>
        <div className="flex gap-3 flex-wrap items-end">
          <div className="flex-1 min-w-40">
            <label className="text-xs text-muted-foreground mb-1 block">Session start from</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="rounded-xl" />
          </div>
          <div className="flex-1 min-w-40">
            <label className="text-xs text-muted-foreground mb-1 block">Session start to</label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="rounded-xl" />
          </div>
          <Button type="button" variant="outline" onClick={handleReset} className="rounded-xl">
            Reset
          </Button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : tutors.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold mb-2">No tutors found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button onClick={handleReset} variant="outline" className="rounded-xl">Clear filters</Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">{tutors.length} tutor{tutors.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutors.map((tutor, i) => (
              <TutorCard key={tutor._id} tutor={tutor} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
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
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axiosSecure from '@/lib/axiosInstance';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, BookOpen, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import PrivateRoute from '@/components/PrivateRoute';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';

function MyBookingsContent() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      setBookings(res.data);
    } catch {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Cancel this session?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'Keep it',
    });
    if (!result.isConfirmed) return;
    try {
      await axiosSecure.patch(`/bookings/${id}`);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      toast.success('Booking cancelled');
    } catch {
      toast.error('Failed to cancel');
    }
  };

  const pending = bookings.filter(b => b.status === 'pending');
  const cancelled = bookings.filter(b => b.status === 'cancelled');

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
    </div>
  );

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-4xl font-extrabold mb-2">My booked sessions</h1>
          <p className="text-muted-foreground text-lg">Manage your upcoming and past sessions</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-b from-secondary/80 to-secondary/30 rounded-3xl p-5 border-2 border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Total bookings</p>
            <p className="text-3xl font-extrabold">{bookings.length}</p>
          </div>
          <div className="bg-gradient-to-b from-green-50/80 to-green-50/30 dark:from-green-950/30 dark:to-green-950/10 rounded-3xl p-5 border-2 border-green-100 dark:border-green-900">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Upcoming</p>
            <p className="text-3xl font-extrabold text-green-600">{pending.length}</p>
          </div>
          <div className="bg-gradient-to-b from-red-50/80 to-red-50/30 dark:from-red-950/30 dark:to-red-950/10 rounded-3xl p-5 border-2 border-red-100 dark:border-red-900">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Cancelled</p>
            <p className="text-3xl font-extrabold text-red-500">{cancelled.length}</p>
          </div>
        </motion.div>

        {bookings.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 border-2 border-dashed border-border rounded-3xl">
            <BookOpen size={52} className="mx-auto mb-5 text-muted-foreground/30" />
            <h3 className="text-xl font-bold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">Browse tutors and book your first session</p>
            <Button asChild className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 h-11 px-6">
              <Link href="/tutors">Browse tutors</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="overflow-hidden rounded-3xl border-2 border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 border-b-2 border-border">
                <tr>
                  {['Tutor', 'Student', 'Contact', 'Booked on', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <motion.tr
                    key={b._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border hover:bg-secondary/20 transition-colors"
                  >
                    <td className="px-5 py-4 font-bold">{b.tutorName}</td>
                    <td className="px-5 py-4">{b.studentName}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      <p>{b.studentEmail}</p>
                      {b.phone && <p className="text-xs mt-0.5">{b.phone}</p>}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground text-xs">
                      {b.bookedAt ? new Date(b.bookedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <Badge className={b.status === 'cancelled'
                        ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border-0 rounded-full'
                        : 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400 border-0 rounded-full'
                      }>
                        {b.status === 'pending' ? 'Upcoming' : 'Cancelled'}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      {b.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancel(b._id)}
                          className="rounded-xl gap-1.5 border-2 text-red-500 hover:text-red-500 border-red-200 hover:border-red-300 hover:bg-red-50"
                        >
                          <X size={13} /> Cancel
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}

export default function MyBookingsPage() {
  return <PrivateRoute><MyBookingsContent /></PrivateRoute>;
}
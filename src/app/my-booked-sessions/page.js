'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axiosSecure from '@/lib/axiosInstance';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import PrivateRoute from '@/components/PrivateRoute';

function MyBookingsContent() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

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
      title: 'Cancel booking?',
      text: 'Are you sure you want to cancel this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, cancel it',
    });
    if (!result.isConfirmed) return;
    try {
      await axiosSecure.patch(`/bookings/${id}`);
      setBookings((prev) =>
        prev.map((b) => b._id === id ? { ...b, status: 'cancelled' } : b)
      );
      toast.success('Booking cancelled');
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-2">My booked sessions</h1>
      <p className="text-muted-foreground mb-8">Manage your upcoming and past sessions</p>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl">
          <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-4">You haven't booked any sessions yet</p>
          <Button asChild className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
            <a href="/tutors">Browse tutors</a>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Tutor</th>
                <th className="text-left px-4 py-3 font-semibold">Student</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">Phone</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{booking.tutorName}</td>
                  <td className="px-4 py-3">{booking.studentName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{booking.studentEmail}</td>
                  <td className="px-4 py-3">{booking.phone}</td>
                  <td className="px-4 py-3">
                    <Badge variant={booking.status === 'cancelled' ? 'destructive' : 'secondary'}
                      className={booking.status === 'pending' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {booking.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancel(booking._id)}
                        className="rounded-lg text-red-500 hover:text-red-500 border-red-200 hover:border-red-300"
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
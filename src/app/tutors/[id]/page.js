'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, MapPin, Calendar, Clock, BookOpen, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import axiosSecure from '@/lib/axiosInstance';
import PrivateRoute from '@/components/PrivateRoute';

function BookingModal({ tutor, open, onClose }) {
  const { user } = useAuth();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!phone) return toast.error('Please enter your phone number');
    if (tutor.totalSlot <= 0) return toast.error('No available slots left');
    if (new Date() < new Date(tutor.sessionStartDate)) {
      return toast.error('Booking not available yet for this tutor');
    }
    setLoading(true);
    try {
      await axiosSecure.post('/bookings', {
        tutorId: tutor._id,
        tutorName: tutor.name,
        studentName: user.displayName,
        studentEmail: user.email,
        phone,
        status: 'pending',
        bookedAt: new Date(),
      });
      toast.success('Session booked successfully!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book a session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tutor</span>
              <span className="font-semibold">{tutor.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subject</span>
              <span className="font-semibold">{tutor.subject}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span className="font-semibold text-indigo-500">€{tutor.hourlyFee}/hr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Student</span>
              <span className="font-semibold">{user?.displayName}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Your phone number</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+358 40 123 4567"
              className="rounded-xl"
            />
          </div>
          <Button
            onClick={handleBook}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 h-11"
          >
            {loading ? 'Booking...' : 'Confirm booking'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TutorDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`)
      .then((res) => setTutor(res.data))
      .catch(() => toast.error('Tutor not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
    </div>
  );

  if (!tutor) return (
    <div className="text-center py-20">
      <p className="text-muted-foreground">Tutor not found</p>
      <Button onClick={() => router.push('/tutors')} className="mt-4 rounded-xl">Go back</Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 rounded-full gap-2">
        <ArrowLeft size={16} /> Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Left — profile */}
        <div className="md:col-span-1">
          <div className="bg-background border border-border rounded-2xl p-6 text-center sticky top-24">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 overflow-hidden">
              {tutor.photo ? (
                <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
              ) : (
                tutor.name?.[0]?.toUpperCase()
              )}
            </div>
            <h1 className="text-xl font-extrabold mb-1">{tutor.name}</h1>
            <p className="text-muted-foreground mb-3">{tutor.subject}</p>
            <Badge className="mb-4">{tutor.teachingMode}</Badge>
            <div className="text-3xl font-extrabold text-indigo-500 mb-1">€{tutor.hourlyFee}</div>
            <p className="text-sm text-muted-foreground mb-6">per hour</p>
            <Button
              onClick={() => setModalOpen(true)}
              disabled={tutor.totalSlot <= 0}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 h-11"
            >
              {tutor.totalSlot <= 0 ? 'No slots available' : 'Book session'}
            </Button>
            {tutor.totalSlot > 0 && (
              <p className="text-xs text-muted-foreground mt-2">{tutor.totalSlot} slots remaining</p>
            )}
          </div>
        </div>

        {/* Right — details */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-background border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Session details</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: 'Location', value: tutor.location },
                { icon: Calendar, label: 'Available days', value: tutor.availableDays },
                { icon: Clock, label: 'Time slot', value: tutor.availableTime },
                { icon: BookOpen, label: 'Start date', value: tutor.sessionStartDate ? new Date(tutor.sessionStartDate).toLocaleDateString() : 'N/A' },
              ].map(({ icon: Icon, label, value }) => value && (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">About the tutor</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: User, label: 'Institution', value: tutor.institution },
                { icon: BookOpen, label: 'Experience', value: tutor.experience },
              ].map(({ icon: Icon, label, value }) => value && (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {tutor && (
        <BookingModal
          tutor={tutor}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function TutorDetailsPage() {
  return (
    <PrivateRoute>
      <TutorDetailsContent />
    </PrivateRoute>
  );
}
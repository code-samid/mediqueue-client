'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import axiosSecure from '@/lib/axiosInstance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Bangla', 'ICT', 'Others'];
const modes = ['Online', 'Offline', 'Both'];

function AddTutorContent() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    photo: '',
    subject: '',
    availableDays: '',
    availableTime: '',
    hourlyFee: '',
    totalSlot: '',
    sessionStartDate: '',
    institution: '',
    experience: '',
    location: '',
    teachingMode: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosSecure.post('/tutors', {
        ...form,
        hourlyFee: Number(form.hourlyFee),
        totalSlot: Number(form.totalSlot),
        userEmail: user.email,
        userName: user.displayName,
      });
      toast.success('Tutor added successfully!');
      setForm({
        name: '', photo: '', subject: '', availableDays: '',
        availableTime: '', hourlyFee: '', totalSlot: '',
        sessionStartDate: '', institution: '', experience: '',
        location: '', teachingMode: '',
      });
    } catch (err) {
      toast.error('Failed to add tutor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold mb-2">Add a tutor</h1>
        <p className="text-muted-foreground mb-8">Fill in the details to list a new tutor</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full name</label>
              <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Smith" className="rounded-xl" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Photo URL</label>
              <Input value={form.photo} onChange={(e) => handleChange('photo', e.target.value)} placeholder="https://..." className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Subject</label>
              <Select onValueChange={(v) => handleChange('subject', v)} required>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Teaching mode</label>
              <Select onValueChange={(v) => handleChange('teachingMode', v)} required>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  {modes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Available days</label>
              <Input value={form.availableDays} onChange={(e) => handleChange('availableDays', e.target.value)} placeholder="Mon–Fri" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Available time</label>
              <Input value={form.availableTime} onChange={(e) => handleChange('availableTime', e.target.value)} placeholder="5:00 PM – 8:00 PM" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Hourly fee (€)</label>
              <Input type="number" value={form.hourlyFee} onChange={(e) => handleChange('hourlyFee', e.target.value)} placeholder="25" className="rounded-xl" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Total slots</label>
              <Input type="number" value={form.totalSlot} onChange={(e) => handleChange('totalSlot', e.target.value)} placeholder="10" className="rounded-xl" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Session start date</label>
              <Input type="date" value={form.sessionStartDate} onChange={(e) => handleChange('sessionStartDate', e.target.value)} className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Location</label>
              <Input value={form.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="Helsinki, Finland" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Institution</label>
              <Input value={form.institution} onChange={(e) => handleChange('institution', e.target.value)} placeholder="University of Helsinki" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Experience</label>
              <Input value={form.experience} onChange={(e) => handleChange('experience', e.target.value)} placeholder="5 years" className="rounded-xl" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 font-semibold text-base"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Upload size={18} className="mr-2" />}
            {loading ? 'Adding tutor...' : 'Add tutor'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AddTutorPage() {
  return (
    <PrivateRoute>
      <AddTutorContent />
    </PrivateRoute>
  );
}
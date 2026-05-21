'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import axiosSecure from '@/lib/axiosInstance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import PageTransition from '@/components/PageTransition';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Bangla', 'ICT', 'Others'];
const modes = ['Online', 'Offline', 'Both'];

const Field = ({ label, children, hint }) => (
  <div>
    <label className="text-sm font-semibold mb-1.5 block">{label}</label>
    {children}
    {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
  </div>
);

function AddTutorContent() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '', photo: '', subject: '', availableDays: '',
    availableTime: '', hourlyFee: '', totalSlot: '',
    sessionStartDate: '', institution: '', experience: '',
    location: '', teachingMode: '',
  });

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

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
      setSuccess(true);
      setForm({
        name: '', photo: '', subject: '', availableDays: '', availableTime: '',
        hourlyFee: '', totalSlot: '', sessionStartDate: '', institution: '',
        experience: '', location: '', teachingMode: '',
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      toast.error('Failed to add tutor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Create</p>
          <h1 className="text-4xl font-extrabold mb-2">Add a tutor</h1>
          <p className="text-muted-foreground mb-10">Fill in the details to list a new tutor profile</p>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic info */}
            <div className="bg-background border-2 border-border rounded-3xl p-6 space-y-5">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Basic information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full name">
                  <Input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="John Smith" className="rounded-xl border-2 h-11" required />
                </Field>
                <Field label="Photo URL" hint="Optional — paste an image link">
                  <Input value={form.photo} onChange={(e) => set('photo', e.target.value)} placeholder="https://..." className="rounded-xl border-2 h-11" />
                </Field>
                <Field label="Subject">
                  <Select onValueChange={(v) => set('subject', v)} required>
                    <SelectTrigger className="rounded-xl border-2 h-11"><SelectValue placeholder="Select subject" /></SelectTrigger>
                    <SelectContent>{subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
                <Field label="Teaching mode">
                  <Select onValueChange={(v) => set('teachingMode', v)} required>
                    <SelectTrigger className="rounded-xl border-2 h-11"><SelectValue placeholder="Select mode" /></SelectTrigger>
                    <SelectContent>{modes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-background border-2 border-border rounded-3xl p-6 space-y-5">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Schedule & availability</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Available days">
                  <Input value={form.availableDays} onChange={(e) => set('availableDays', e.target.value)} placeholder="Mon–Fri" className="rounded-xl border-2 h-11" />
                </Field>
                <Field label="Available time">
                  <Input value={form.availableTime} onChange={(e) => set('availableTime', e.target.value)} placeholder="5:00 PM – 8:00 PM" className="rounded-xl border-2 h-11" />
                </Field>
                <Field label="Session start date">
                  <Input type="date" value={form.sessionStartDate} onChange={(e) => set('sessionStartDate', e.target.value)} className="rounded-xl border-2 h-11" />
                </Field>
                <Field label="Total slots available">
                  <Input type="number" value={form.totalSlot} onChange={(e) => set('totalSlot', e.target.value)} placeholder="10" className="rounded-xl border-2 h-11" required />
                </Field>
              </div>
            </div>

            {/* Pricing & Background */}
            <div className="bg-background border-2 border-border rounded-3xl p-6 space-y-5">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Pricing & background</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Hourly fee (€)">
                  <Input type="number" value={form.hourlyFee} onChange={(e) => set('hourlyFee', e.target.value)} placeholder="25" className="rounded-xl border-2 h-11" required />
                </Field>
                <Field label="Location">
                  <Input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Helsinki, Finland" className="rounded-xl border-2 h-11" />
                </Field>
                <Field label="Institution">
                  <Input value={form.institution} onChange={(e) => set('institution', e.target.value)} placeholder="University of Helsinki" className="rounded-xl border-2 h-11" />
                </Field>
                <Field label="Years of experience">
                  <Input value={form.experience} onChange={(e) => set('experience', e.target.value)} placeholder="5 years" className="rounded-xl border-2 h-11" />
                </Field>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded-2xl text-white border-0 font-semibold text-base transition-all ${success ? 'bg-green-500 hover:bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90'}`}
            >
              {loading ? (
                <><Loader2 className="animate-spin mr-2" size={18} /> Adding tutor...</>
              ) : success ? (
                <><CheckCircle2 size={18} className="mr-2" /> Tutor added!</>
              ) : (
                <><Upload size={18} className="mr-2" /> Add tutor</>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default function AddTutorPage() {
  return <PrivateRoute><AddTutorContent /></PrivateRoute>;
}
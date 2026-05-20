'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axiosSecure from '@/lib/axiosInstance';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, Pencil, Trash2, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import PrivateRoute from '@/components/PrivateRoute';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Bangla', 'ICT', 'Others'];
const modes = ['Online', 'Offline', 'Both'];

function MyTutorsContent() {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTutor, setEditTutor] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchMyTutors();
  }, []);

  const fetchMyTutors = async () => {
    try {
      const res = await axiosSecure.get(`/tutors/my-tutors?email=${user.email}`);
      setTutors(res.data);
    } catch {
      toast.error('Failed to fetch tutors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete tutor?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete',
    });
    if (!result.isConfirmed) return;
    try {
      await axiosSecure.delete(`/tutors/${id}`);
      setTutors((prev) => prev.filter((t) => t._id !== id));
      toast.success('Tutor deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await axiosSecure.put(`/tutors/${editTutor._id}`, editTutor);
      setTutors((prev) => prev.map((t) => t._id === editTutor._id ? res.data : t));
      toast.success('Tutor updated');
      setEditTutor(null);
    } catch {
      toast.error('Update failed');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-2">My tutors</h1>
      <p className="text-muted-foreground mb-8">Manage your listed tutors</p>

      {tutors.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl">
          <GraduationCap size={48} className="mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold mb-2">No tutors yet</h3>
          <p className="text-muted-foreground mb-4">You haven't added any tutors yet</p>
          <Button asChild className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
            <a href="/add-tutor">Add your first tutor</a>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Tutor</th>
                <th className="text-left px-4 py-3 font-semibold">Subject</th>
                <th className="text-left px-4 py-3 font-semibold">Fee</th>
                <th className="text-left px-4 py-3 font-semibold">Slots</th>
                <th className="text-left px-4 py-3 font-semibold">Mode</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor, i) => (
                <motion.tr
                  key={tutor._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{tutor.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tutor.subject}</td>
                  <td className="px-4 py-3 font-semibold text-indigo-500">€{tutor.hourlyFee}</td>
                  <td className="px-4 py-3">{tutor.totalSlot}</td>
                  <td className="px-4 py-3"><Badge variant="secondary">{tutor.teachingMode}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditTutor(tutor)} className="rounded-lg gap-1">
                        <Pencil size={13} /> Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(tutor._id)} className="rounded-lg gap-1 text-red-500 hover:text-red-500 border-red-200 hover:border-red-300">
                        <Trash2 size={13} /> Delete
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit modal */}
      <Dialog open={!!editTutor} onOpenChange={() => setEditTutor(null)}>
        <DialogContent className="rounded-2xl max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit tutor</DialogTitle>
          </DialogHeader>
          {editTutor && (
            <form onSubmit={handleUpdate} className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">Name</label>
                  <Input value={editTutor.name} onChange={(e) => setEditTutor({ ...editTutor, name: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Photo URL</label>
                  <Input value={editTutor.photo || ''} onChange={(e) => setEditTutor({ ...editTutor, photo: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Subject</label>
                  <Select value={editTutor.subject} onValueChange={(v) => setEditTutor({ ...editTutor, subject: v })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>{subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Mode</label>
                  <Select value={editTutor.teachingMode} onValueChange={(v) => setEditTutor({ ...editTutor, teachingMode: v })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>{modes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Hourly fee (€)</label>
                  <Input type="number" value={editTutor.hourlyFee} onChange={(e) => setEditTutor({ ...editTutor, hourlyFee: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Total slots</label>
                  <Input type="number" value={editTutor.totalSlot} onChange={(e) => setEditTutor({ ...editTutor, totalSlot: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Available days</label>
                  <Input value={editTutor.availableDays || ''} onChange={(e) => setEditTutor({ ...editTutor, availableDays: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Available time</label>
                  <Input value={editTutor.availableTime || ''} onChange={(e) => setEditTutor({ ...editTutor, availableTime: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Location</label>
                  <Input value={editTutor.location || ''} onChange={(e) => setEditTutor({ ...editTutor, location: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Institution</label>
                  <Input value={editTutor.institution || ''} onChange={(e) => setEditTutor({ ...editTutor, institution: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <Button type="submit" disabled={updateLoading} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 h-11">
                {updateLoading ? 'Saving...' : 'Save changes'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function MyTutorsPage() {
  return (
    <PrivateRoute>
      <MyTutorsContent />
    </PrivateRoute>
  );
}
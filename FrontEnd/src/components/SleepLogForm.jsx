import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import api from '../utils/api';

const sleepLogSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  duration: z.number().min(0.1, 'Duration must be at least 0.1 hours').max(24, 'Duration cannot exceed 24 hours'),
  quality: z.enum(['Poor', 'Fair', 'Good', 'Excellent'], { required_error: 'Quality is required' }),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional()
});

const qualityOptions = [
  { value: 'Poor', label: '😴 Poor' },
  { value: 'Fair', label: '🌙 Fair' },
  { value: 'Good', label: '✨ Good' },
  { value: 'Excellent', label: '🌟 Excellent' }
];

const SleepLogForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: zodResolver(sleepLogSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      duration: 7,
      quality: '',
      notes: ''
    }
  });

  const durationValue = watch('duration', 7);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/sleep-logs', {
        ...data,
        date: new Date(data.date)
      });

      setSuccess('Sleep log added successfully!');
      reset({
        date: new Date().toISOString().split('T')[0],
        duration: 7,
        quality: '',
        notes: ''
      });

      if (onSuccess) onSuccess(response.data.sleepLog);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add sleep log';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-2xl bg-white/80 border border-white shadow-xl p-6"
    >
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-semibold text-slate-700">Date</label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <span className="text-slate-500">📅</span>
            <input
              type="date"
              id="date"
              {...register('date')}
              className="w-full bg-transparent focus:outline-none text-slate-800"
            />
          </div>
          {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Duration (hours)</label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>⏱️ Target 7-9 hours</span>
              <span className="font-semibold text-indigo-600">{durationValue}h</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="12"
              step="0.1"
              {...register('duration', { valueAsNumber: true })}
              className="w-full accent-indigo-600"
            />
          </div>
          {errors.duration && <p className="text-sm text-red-600">{errors.duration.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="quality" className="text-sm font-semibold text-slate-700">Sleep quality</label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <select
              id="quality"
              {...register('quality')}
              className="w-full bg-transparent focus:outline-none text-slate-800"
            >
              <option value="">Select quality...</option>
              {qualityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {errors.quality && <p className="text-sm text-red-600">{errors.quality.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-semibold text-slate-700">Notes (optional)</label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <textarea
              id="notes"
              rows="3"
              placeholder="How did you feel? Any disruptions?"
              {...register('notes')}
              className="w-full bg-transparent focus:outline-none text-slate-800"
            />
          </div>
          {errors.notes && <p className="text-sm text-red-600">{errors.notes.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Log Sleep'}
      </button>
    </motion.form>
  );
};

export default SleepLogForm;

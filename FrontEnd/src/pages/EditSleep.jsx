// FrontEnd/src/pages/EditSleep.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditSleep = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [quality, setQuality] = useState('');

  useEffect(() => {
    const fetchSleep = async () => {
      try {
        const response = await api.get(`/sleep/${id}`);
        const { date: fetchedDate, duration: fetchedDuration, quality: fetchedQuality } = response.data;
        setDate(new Date(fetchedDate).toISOString().split('T')[0]); // Format for date input
        setDuration(fetchedDuration);
        setQuality(fetchedQuality);
      } catch (error) {
        console.error('Error fetching sleep record:', error);
      }
    };
    fetchSleep();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/sleep/${id}`, { date, duration, quality });
      navigate('/');
    } catch (error) {
      console.error('Error updating sleep record:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Sleep Record</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Duration (hours):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Quality:</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Quality</option>
            <option value="Poor">Poor</option>
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Update Sleep Record
        </button>
      </form>
    </div>
  );
};

export default EditSleep;
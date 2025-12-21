import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const SleepForm = () => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState(0);
  const [quality, setQuality] = useState('Average');
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/sleep', { userId: user, date, hours, quality });
      // Update logs in Redux
      const logsRes = await axios.get(`http://localhost:5000/api/sleep/${user}`);
      dispatch({ type: 'SET_LOGS', payload: logsRes.data });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Hours" required />
      <select value={quality} onChange={(e) => setQuality(e.target.value)}>
        <option>Poor</option>
        <option>Average</option>
        <option>Good</option>
      </select>
      <button type="submit" className="bg-green-500 text-white p-2">Log Sleep</button>
    </form>
  );
};

export default SleepForm;
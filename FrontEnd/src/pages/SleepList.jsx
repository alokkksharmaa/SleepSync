// FrontEnd/src/pages/SleepList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const SleepList = () => {
  const [sleeps, setSleeps] = useState([]);

  const fetchSleeps = async () => {
    try {
      const response = await api.get('/sleep');
      setSleeps(response.data);
    } catch (error) {
      console.error('Error fetching sleep records:', error);
    }
  };

  useEffect(() => {
    // fetchSleeps();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(`/sleep/${id}`);
        fetchSleeps(); // Refetch after delete
      } catch (error) {
        console.error('Error deleting sleep record:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sleep Records</h1>
      <Link to="/add">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center">
          <FaPlus className="mr-2" /> Add New Sleep Record
        </button>
      </Link>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Duration (hours)</th>
            <th className="py-2 px-4 border-b">Quality</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sleeps.map((sleep) => (
            <tr key={sleep._id}>
              <td className="py-2 px-4 border-b">{new Date(sleep.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{sleep.duration}</td>
              <td className="py-2 px-4 border-b">{sleep.quality}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <Link to={`/edit/${sleep._id}`}>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(sleep._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SleepList;
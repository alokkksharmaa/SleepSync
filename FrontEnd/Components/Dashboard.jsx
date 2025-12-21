import { useEffect } from 'react'; // useEffect for lifecycle
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import SleepForm from './SleepForm';

const Dashboard = () => {
  const logs = useSelector(state => state.logs);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [insights, setInsights] = useState({ average: 0, suggestion: '' });

  useEffect(() => {
    const fetchData = async () => {
      const logsRes = await axios.get(`http://localhost:5000/api/sleep/${user}`);
      dispatch({ type: 'SET_LOGS', payload: logsRes.data });
      const insightsRes = await axios.get(`http://localhost:5000/api/sleep/insights/${user}`);
      setInsights(insightsRes.data);
    };
    fetchData();
  }, [user, dispatch]); // Dependencies for useEffect

  return (
    <div className="p-4">
      <h1>Sleep Dashboard</h1>
      <SleepForm />
      <h2>Your Logs:</h2>
      <ul>
        {logs.map(log => (
          <li key={log._id}>{log.date.toLocaleDateString()}: {log.hours} hours, {log.quality}</li>
        ))}
      </ul>
      <h2>Insights:</h2>
      <p>Average Hours: {insights.average}</p>
      <p>Suggestion: {insights.suggestion}</p>
    </div>
  );
};

export default Dashboard;
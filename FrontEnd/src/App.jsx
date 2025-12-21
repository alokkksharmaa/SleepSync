// FrontEnd/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SleepList from './pages/SleepList';
import AddSleep from './pages/AddSleep';
import EditSleep from './pages/EditSleep';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<SleepList />} />
          <Route path="/add" element={<AddSleep />} />
          <Route path="/edit/:id" element={<EditSleep />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Download from './pages/download';
import Invite from './pages/invite';
import Layout from './pages/layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Download />} />
          <Route path="invite" element={<Invite />} />
          <Route path="*" element={<Download />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

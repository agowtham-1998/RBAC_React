import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Loading from './components/common/Loading';

const Home = lazy(() => import('./components/Home'));
const Users = lazy(() => import('./components/User/Users'));
const Roles = lazy(() => import('./components/Role/Roles'));
const Permissions = lazy(() => import('./components/Permission/Permissions'));

const App = () => (
  <Router>
    <NavBar />
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/permissions/:roleId" element={<Permissions />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;

import React from 'react';
import Login from './component/Login/Login';
import SideNav from './component/SideNav/SideNav';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
const LicenseName = React.lazy(() => import('./component/Admin/License/LicenseName'))
const UserList = React.lazy(() => import('./component/Admin/AppUsers/UserList'))
const AppUsers = React.lazy(() => import('./component/Admin/AppUsers/AppUsers'))
const Dashboard = React.lazy(() => import('./component/Dashboard/Dashboard'))
const Depot = React.lazy(() => import('./component/Depot/Depot'))
const Station = React.lazy(()=> import('./component/Station/Station'))
const Chart = React.lazy(() => import('./component/Chart/chart')); 
const Office = React.lazy(()=> import('./component/AdDepot/Office'))
function App() {
  return (
    <div>
      <Router basename={'/grms2'}>
        <SideNav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee" element={
            <React.Suspense fallback={<>....</>}>
              <AppUsers />
            </React.Suspense>
          } />
          <Route path="/dashboard" element={
            <React.Suspense fallback={<>....</>}>
              <Dashboard />
            </React.Suspense>
          } />
          <Route path="/licensename" element={
            <React.Suspense fallback={<>....</>}>
              <LicenseName />
            </React.Suspense>
          } />
          <Route path="/depot" element={
            <React.Suspense fallback={<>....</>}>
              <Depot />
            </React.Suspense>
          } />
          <Route path="/station" element={
            <React.Suspense fallback={<>....</>}>
              <Station />
            </React.Suspense>
          } />
          <Route path="/chart" element={
            <React.Suspense fallback={<>....</>}>
              <Chart />
            </React.Suspense>
          } />
          <Route path="/office" element={
            <React.Suspense fallback={<>....</>}>
              <Office />
            </React.Suspense>
          } />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

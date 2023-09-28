import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Agencys from './pages/Agencys';
import Login from './pages/Login';
import List from './pages/List';
import Alert from './pages/Alert';
// import Demo from './pages/Demo';
import Home from './pages/Home';

import Map from './comp/Map';
import Dmap from './comp/Dmap'; // Update the import
import Land from './pages/Land';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/agencys' element={<Agencys />} />
        <Route path='/login' element={<Login />} />
        <Route path='/list' element={<List />} />
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path='/alert' element={<Alert />} />
        {/* <Route path='/dis' element={<Dis />} /> */}
        <Route path='/map/:distance' element={<Map />} />
        <Route path='/dmap/:coordinates' element={<Dmap />} />
        <Route path='/' element={<Land />} />
        {/* <Route path='/demo' element={<Demo />} /> */}
      </Routes>
    </div>
  );
}

export default App;

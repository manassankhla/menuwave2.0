import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from './Components/hero';
import TemplatesPage from './Components/template';
import MakedMenu from './Components/makedmenu';
import Menudisplay from './Components/MenuDisplay';
function App() {
  return (
    <>
      
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/makedmenu" element={<MakedMenu />} />
          <Route path="/menu" element={<Menudisplay />} />

 <Route path="*" element={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">404 - Page Not Found</div>} />

        </Routes>
      
    </>
  )
}

export default App

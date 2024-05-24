//import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import VisualizeData from './components/VisualizeData';
//import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Section2 from './components/Section2';
import Section1 from './components/Section1';

function App() {
  return (
    <>
      <Navbar />
      {/* section-------------1 */}
      <Section1 />
      {/* section----------2 */}
      <Section2 />
      {/* section----------3 */}
      <VisualizeData />

      <Footer />
    </>
  );
}

export default App;

import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import VisualizeData from './components/VisualizeData';
//import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Section3 from './components/Section3';
import Section1 from './components/Section1';

function App() {
  const [optimalPath, setOptimalPath] = useState([])
  return (
    <>
      <Navbar optimalPath={optimalPath}/>
      {/* section-------------1 */}
      <Section1 />
      {/* section----------2 */}
      <VisualizeData optimalPath={optimalPath} setOptimalPath={setOptimalPath} />
      {/* section----------3 */}
      <Section3 />

      <Footer />
    </>
  );
}

export default App;

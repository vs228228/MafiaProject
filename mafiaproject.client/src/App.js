import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePages/HomePage';

function App() {
  return (
    
    <Router>
    <Header path="/home"/>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
        <Route path="/home" element={<HomePage />} />

        {/* <Route path="/home" element={<HomePage />} />
        <Route path="/aboutGame" element={<AboutGame />} />
        <Route path="/aboutAuthor" element={<AboutAuthor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/SignIn" element={<SignIn  />} /> */}
      </Routes>
    
    
  </Router> 
   
  
  );
}

export default App;

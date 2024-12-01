import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePages/HomePage';
import AboutAuthor from './pages/AbouAuthor/AboutAuthor';
import AboutGame from './pages/AboutGame/AboutGame.jsx';
import SignIn from './pages/SignIn/SignIn.jsx'
import Profile from './pages/Profile/Profile.jsx';
import LobbyWindow from './pages/LobbyWindow/LobbyWindow.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebChat from './pages/WebChat/WebChat.jsx';

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer theme="dark"/> 
      {location.pathname !== '/WebChat' && <Header />}
      {/* <Header/> */}
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/aboutGame"
          element={<AboutGame />}
        />
        <Route
          path="/aboutAuthor"
          element={<AboutAuthor />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
         <Route
          path="/SignIn"
          element={<SignIn />}
        />
         <Route path="/LobbyWindow" element={<LobbyWindow />} />
         <Route path="/WebChat" element={<WebChat />} />
      </Routes>
    </>
  );
}

export default App;
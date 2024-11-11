import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePages/HomePage';
import AboutAuthor from './pages/AbouAuthor/AboutAuthor';
import AboutGame from './pages/AboutGame/AboutGame.jsx';
import SignIn from './pages/SignIn/SignIn.jsx'
import Profile from './pages/Profile/Profile.jsx';
import LobbyWin from './pages/LobbyWin/LobbyWin.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <ToastContainer theme="dark"/> 
      <Header />
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
         <Route path="/LobbyWin" element={<LobbyWin />} />
      </Routes>
    </Router>
  );
}

export default App;
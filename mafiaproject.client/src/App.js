import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePages/HomePage';
import AboutAuthor from './pages/AbouAuthor/AboutAuthor';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        {/* <Route
          path="/aboutGame"
          element={<AboutGame />}
        /> */}
        <Route
          path="/aboutAuthor"
          element={<AboutAuthor />}
        />
         {/*<Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/SignIn"
          element={<SignIn />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
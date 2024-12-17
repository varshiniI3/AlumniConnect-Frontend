import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/home/Home';
import Login from './components/login/Login';
import PageNotFound from './components/PageNotFound';
import Profile from './components/profile/Profile';
import Cookies from 'js-cookie'
// import Events from './components/events/Events';
import Skilldev from './components/skilldev/Skilldev';

function App() {
  const email = Cookies.get('email') || null

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/skilldev' element={<Skilldev/>} />
        <Route path='/profile' element={email === null ? <Login/> : <Profile/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;

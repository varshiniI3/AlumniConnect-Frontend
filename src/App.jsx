import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/home/Home';
import Login from './components/login/Login';
import PageNotFound from './components/PageNotFound';
import Profile from './components/profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;

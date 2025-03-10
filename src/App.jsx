import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/home/Home';
import Login from './components/login/Login';
import PageNotFound from './components/PageNotFound';
import Profile from './components/profile/Profile';
import Cookies from 'js-cookie'
import Skilldev from './components/skilldev/Skilldev';
import Signup from './components/signup/Signup';
import Events from './components/events/Events';
import Jobs from './components/job_opportunities/Jobs';
import Connect from './components/connect/Connect';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy';
import SkillDevAdd from './components/skilldev/SkillDevAdd';
import Eventadd from './components/events/Eventadd';
import Jobadd from './components/job_opportunities/Jobadd';
import Postadd from './components/connect/Postadd';

function App() {
  const email = Cookies.get('email') || null

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/skilldev' element={<Skilldev/>} />
        <Route path='/jobOpportunities' element={<Jobs/>} />
        <Route path='/add/events' element={<Eventadd/>} />
        <Route path='/add/skilldev' element={<SkillDevAdd/>} />
        <Route path='/add/jobOpportunities' element={<Jobadd/>} />
        <Route path='/connect' element={<Connect/>} />
        <Route path='/add/Post' element={<Postadd/>} />
        <Route path='/privacypolicy' element={<PrivacyPolicy/>} />
        <Route path='/profile' element={email === null ? <Login/> : <Profile/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;

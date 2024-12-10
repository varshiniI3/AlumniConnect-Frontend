import React from 'react'
import Cookies from 'js-cookie'
import './home.css'
import { FaSquareXTwitter, FaSquareInstagram, FaLinkedin } from "react-icons/fa6";


function Home() {

//   const [alumni, setAlumni] = useState([
//     {sno : "1", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'},
//     {sno : "2", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'},
//     {sno : "3", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
//     {sno : "4", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
//     {sno : "5", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
//     {sno : "6", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
//     {sno : "7", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
//     {sno : "8", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}
//   ])    
//   const [eventPics, setEventPics] = useState([
//     {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'},
//     {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'},
//     {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'},
//     {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'},
//     {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'}
//   ])
  const alumni = [
    {sno : "1", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'},
    {sno : "2", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'},
    {sno : "3", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
    {sno : "4", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
    {sno : "5", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
    {sno : "6", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
    {sno : "7", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}, 
    {sno : "8", name : "John", designation : "Software Developer", location : 'Los_Angles', imageURL : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'}
  ]
  const eventPics = [
    {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'},
    {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'},
    {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'},
    {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'},
    {imgUrl : 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', name : 'sample Event', type : 'event type'}
  ]
  const email = Cookies.get('email') || null

  return (
    <div className='home'>
      <div className="header">
        <div className="flex gap-20 justify-around  text-white text-2xl font-bold fixed top-0 z-10 overflow-hidden" style={{background : '#003049', width: '100%'}}>
            <img src="" alt="logo" />
            <a href="/" className='nav-link' data-content = 'Events' >Events</a>
            <a href="/" className='nav-link' data-content = 'Job Opportunities' >Job Opportunities</a>
            <a href="/" className='nav-link' data-content = 'Skill Development' >Skill Development</a>
            <a href="/" className='nav-link' data-content = 'Connect' >Connect</a>
            {email === null ? <a href="/" className='nav-link' data-content = 'Login' >Login</a> 
                            : <a href="/" className='nav-link' data-content = 'Profile'>Profile</a>}
        </div><br /><br />
        <div className="mt-5 text-white">
            <center><h1>Alumni Connect</h1></center>
            <center><pre>Reconnect   Inspire   Empower</pre></center>
        </div>
        <div className="userCardHolder">
            {
            alumni.map((user, key) => 
              <div key={key} className='userCard'>
                <center><img src={user.imageURL} alt="user" /></center>
                <b>{user.name}</b>
                <p>{user.designation}</p>
                <p>{user.location}</p>
                <center><button>Connect</button></center>
              </div>
            )
        }
        </div>
      </div>
      <h1 className='pt-1 pb-1 text-center' style={{background : '#fdf0d5', color: '#c1121f'}}>Events</h1>
      <div className="flex justify-between relative" style={{background: '#fdf0d5'}}>
        <div className="eventCardHolder">
          {
            eventPics.map((event, key) => 
              <div className="eventCard" key={key} event-name={event.name}>
                <img src={event.imgUrl} alt="event"/>
              </div>
            )
          }
        </div>
        <a href="/" className='text-2xl justify-center items-center font-bold absolute right-5 top-1/3 p-2 rounded-md' style={{background: '#c1121f', color : '#fdf0d5'}}>View More Events</a>
      </div>
      <div className="flex gap-9 p-10 text-white" style={{background : '#003049'}}>
        <img id='campusImg' src="https://images.collegedunia.com/public/college_data/images/campusimage/1479984572Untitled.jpg" alt="campus" />
        <span>
            <center><h1>About Instution</h1></center>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, magni. Unde reprehenderit quia adipisci laboriosam, fuga quidem magnam libero provident harum odit quibusdam obcaecati dolorum voluptatem, sit aliquid nisi. Deleniti!
            Doloribus tenetur impedit quo eveniet ipsam ipsum perferendis error iure quaerat perspiciatis quasi nesciunt, numquam odit? Non officia ab omnis natus deleniti vero, dolore obcaecati laboriosam distinctio nam, excepturi harum.
            Dicta error, illo enim ab vero laborum. Nobis fugit dolorem earum voluptas obcaecati perspiciatis maiores? Quasi, asperiores. Explicabo, quidem cum eum labore illum incidunt inventore magnam eaque qui ipsam aperiam!
            Aperiam quas, blanditiis facere animi explicabo doloremque cum vero? Et suscipit, in dolorem eaque cum, qui dolore fuga repellendus facere enim totam harum sit at unde ex. Eveniet, distinctio dignissimos.
            Distinctio nisi suscipit vero dolores excepturi quas esse sit nihil recusandae nesciunt necessitatibus beatae, hic autem. Officia a, ipsum saepe quaerat nemo deleniti facere debitis quae quam voluptas optio iure.</p>
        </span>
      </div>
      <div className="footer flex justify-around text-white" style={{background : '#003049'}}>
        <a href="/">Privacy policy</a>
        <a href="/">Terms & Conditions</a>
        <a href="/"><FaSquareXTwitter className='text-4xl'/></a>
        <a href="/"><FaSquareInstagram className='text-4xl'/></a>
        <a href="/"><FaLinkedin className='text-4xl'/></a>
        <a href="/">Feedback</a>
      </div>
    </div>
  )
}

export default Home

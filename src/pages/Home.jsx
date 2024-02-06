import React from 'react';
import './pages.css';
import joshPhoto from '../assets/josh.jpg'; // Import photos for each team member
import michellePhoto from '../assets/michelle.jpg';
import danielPhoto from '../assets/daniel.jpg';

export const Home = () => {

  const teamMembers = [
    {
      name: 'Josh Bartow',
      photo: joshPhoto,
      linkedin: 'https://www.linkedin.com/in/josh-bartow-b53384207/',
    },
    {
      name: 'Michelle Totherow',
      photo: michellePhoto,
      linkedin: 'https://www.linkedin.com/in/michelletotherow/',
    },
    {
      name: 'Daniel Bennett',
      photo: danielPhoto,
      linkedin: 'https://www.linkedin.com/in/daniel-p-bennett/',
    },
  ];

  // const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // const currentDate = new Date();
  // const currentDay = currentDate.getDate();
  // const currentMonth = currentDate.getMonth();
  // const currentYear = currentDate.getFullYear();
  // // Get the total number of days in the current month
  // const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  // // Get the index of the first day of the month (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  // const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  // const renderCalendar = () => {
  //   const calendar = [];
  //   let dayCounter = 1;
  //   // Render empty cells for days before the first day of the month
  //   for (let i = 0; i < firstDayIndex; i++) {
  //     calendar.push(<div key={`empty-${i}`} className="text-center"></div>);
  //   }
  //   // Render days of the month
  //   for (let i = 1; i <= totalDays; i++) {
  //     calendar.push(
  //       <div
  //         key={`day-${i}`}
  //         className={`text-center p-2 border border-black ${
  //           i === currentDay ? 'bg-blue-900 text-white' : 'text-black'
  //         }`}
  //       >
  //         {i}
  //       </div>
  //     );
  //     dayCounter++;
  //   }
  //   // Render empty cells for days after the last day of the month
  //   while (dayCounter <= 35) {
  //     calendar.push(<div key={`empty-${dayCounter}`} className="text-center"></div>);
  //     dayCounter++;
  //   }
  //   return calendar;
  // };

  return (

    <div className="container mx-auto p-8">
    <header className="bg-navy-blue text-white py-4 px-8 mb-8">
      <h1 className="text-3xl font-bold">Welcome to Our Website</h1>
    </header>

    <section className="bg-seafoam-green text-charcoal p-8 mb-8">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p>
        We are a collaborative team of NSS Graduates who are working on the Personal Planner API. Our team consists of Josh Bartow, Michelle Totherow, and Daniel Bennett.
      </p>

      <div className="flex justify-between mt-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <img src={member.photo} alt={member.name} className="mx-auto w-32 h-32 rounded-full mb-2" />
              <p className="text-lg font-semibold">{member.name}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            </div>
          ))}
        </div>
    </section>

    <section className="bg-seafoam-green text-charcoal p-8">
      <h2 className="text-2xl font-bold mb-4">Things to Come</h2>
      <p>
        Stay tuned for updates on our Personal Planner Project. Exciting features and improvements are on the way!
      </p>
    </section>
  </div>
    

    // <div className="container mx-auto w-80%">
    //   <div className="flex flex-col items-center mt-4">
    //     <div className="grid grid-cols-7 gap-1 mb-2 w-full">
    //       {days.map((day, index) => (
    //         <div
    //           key={`day-${index}`}
    //           className="text-center font-bold p-2 border border-black bg-blue-900 text-white rounded-md"
    //         >
    //           {day}
    //         </div>
    //       ))}
    //     </div>
    //     <div className="grid grid-cols-7 gap-1 w-full">
    //       {renderCalendar()}
    //     </div>
    //   </div>
    // </div>
  );
};

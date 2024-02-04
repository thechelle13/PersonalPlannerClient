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


  return (

    <div className="container mx-auto p-8">
    <header className="bg-navy-blue text-white py-4 px-8 mb-8">
      <h1 className="text-3xl font-bold">Welcome to Our Website</h1>
    </header>

    <section className="bg-seafoam-green text-charcoal p-8 mb-8">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p>
        We are a collaborative team of NSS Graduates who are working on the Personal Planner Project. Our team consists of Josh Bartow, Michelle Totherow, and Daniel Bennett.
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
  
  );
};

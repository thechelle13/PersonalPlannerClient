import React from 'react';
import './pages.css';
import joshPhoto from '../assets/josh.jpg';
import michellePhoto from '../assets/michelle.jpg';
import danielPhoto from '../assets/daniel.jpg';
import reactSVG from '../assets/vitejs.svg';
import Django from '../assets/djangoproject.svg';
import node from '../assets/nodejsDark.svg';
import HTML from '../assets/html-5.svg';
import Tailwind from '../assets/tailwind.svg';
import CSS from '../assets/css-3.svg';
import Postman from '../assets/postman.svg';
import SQL from '../assets/sql-azure.svg';
import Figma from '../assets/figma.svg';
import Python from '../assets/python.svg';

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

  const features = [
    '5 day 3 hour forecast',
    'Events calendar',
    'User authentication',
    'Event creation and edit',
    'Heroicon usage',
    'Built using React + Vite',
    'Tailwind CSS styling',
    'API with Python and Django',
    'Scrum & project tickets, Agile',
    'Collaboration with NSS alumni',
    'Utilize Zoom, Slack, MS Teams',
    'Setup using NSS templates',
    'Automated API testing',
    'Development Tool utilization',
    'Social Media Integration',
    'Search Functionality',
    'Responsive Design',
    'Error Handling and Logging'
  ];

  return (
    <div className="container mx-auto p-4 sm:p-8 mt-10">
      <header className="bg-navy-blue text-white py-4 px-4 sm:px-8 mb-8"> 
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Our Website</h1> 
      </header>

      <section className="bg-seafoam-green text-charcoal p-4 sm:p-8 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-Seafoam">About Us</h2> 
        <p className="text-Seafoam">
          We are a collaborative team of NSS Graduates working on the Personal Planner Project. Our team consists of Josh Bartow, Michelle Totherow, and Daniel Bennett.
        </p>

        <div className="flex flex-col sm:flex-row justify-between mt-4"> {/* Adjusted layout for smaller screens */}
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center mb-4 sm:mb-0"> 
              <img src={member.photo} alt={member.name} className="mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-2" />
              <p className="text-lg sm:text-xl font-semibold text-Seafoam">{member.name}</p> 
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack section */}
      <section className="bg-seafoam-green text-charcoal p-4 sm:p-8 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-14 text-Seafoam">Tech Stack</h2>
        <div className="flex justify-center flex-wrap items-center">
          <img src={reactSVG} alt="React" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
          <img src={Python} alt="Python" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
          <img src={Django} alt="Django" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
          <img src={node} alt="node" className="w-16 h-16 sm:w-20 sm:h-20 mx-2 bg-white rounded-lg" />
          <img src={HTML} alt="html" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
          <img src={CSS} alt="CSS" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
          <img src={Tailwind} alt="tailwind" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
          <img src={Postman} alt="Postman" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
          <img src={SQL} alt="SQL" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
          <img src={Figma} alt="Figma" className="w-16 h-16 sm:w-20 sm:h-20 mx-2" />
        </div>
      </section>

      <section className="bg-seafoam-green text-charcoal p-4 sm:p-8"> 
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-Seafoam">Features</h2>
        <div className="flex justify-center"> 
          <ul className="list-disc pl-4 sm:pl-8"> 
            {features.map((feature, index) => (
              <li key={index} className="text-Seafoam">
                <div className="flex items-center">
                  <div>{feature}</div> 
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

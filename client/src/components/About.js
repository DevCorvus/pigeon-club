import React, { useState } from 'react';

export default function About() {
  const [show, setShow] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [close, setClose] = useState(!!localStorage.getItem('closeAbout'));

  const handleOpen = () => {
    setButtonPressed(true);
    setTimeout(() => setShow(true), 10);
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setClose(true);
      localStorage.setItem('closeAbout', 'OK');
    }, 500);
  };

  return (
    <>
    {!buttonPressed && !close && (
      <div className="absolute bottom-4 left-4 z-50">
        <button title="About" className="text-indigo-200 hover:text-indigo-300 focus:text-indigo-300 transition duration-500 animate-bounce" onClick={handleOpen} type="button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    )}
    {buttonPressed && !close && (
      <div className={`transition duration-500 ${show ? 'opacity-100' : 'opacity-0'} z-50 absolute top-0 left-0 bg-black bg-opacity-50 w-screen h-screen`}>
        <div className="flex justify-center h-screen p-6">

          <div className="relative flex flex-col gap-4 max-w-xl w-full p-4 border-2 border-indigo-300 bg-white rounded-md shadow-md font-semibold">
            <header className="text-3xl text-center text-indigo-400">
              <h2>About</h2>
            </header>
            <section className="flex flex-col gap-4 border border-gray-300 rounded-md p-2 overflow-y-auto">
              <p>Hi! my name is Luis Portillo, Venezuelan Fullstack Web Developer (DevCorvus), the only developer involved in this project.</p>
              <p>Pigeon Club is a simple public chat project developed in order to test the functionalities and capabilities of Web Sockets.</p>
              <p>To make this process easier, especially around communication with client, the Socket.IO library was used in conjunction with Express (TypeScript).</p>
              <p>The connection to the database (Postgres) is made through TypeORM.</p>
              <p>Due to the scale of the project (Just to learn) there are clear limitations of functionality that in terms of learning would be redundant. Even so, there is a relatively solid structure in what is achieved, with all the essential sections such as authentication / authorization (JWT), validation, sanitization, among other basic measures.</p>
              <p>The implementation of "Rooms" is pending for me to add in the future, either in this project or other projects related to this technology, I decided to postpone said implementation for a mere matter of time.</p>
              <p>As for the client, React with Redux (Toolkit) and TailwindCSS was the base, as well as a small cocktail of libraries that I decided to implement in some redundant sections and thus experiment a little with them.</p>
              <p>Broadly speaking, it has been a very interesting project to carry out and from which I have learned a lot of things as well as reinforced previous knowledge and I am interested in continuing to explore the world of Web Sockets or other alternatives in the future.</p>
              <p>I hope this is a project to your liking, user, although it should be clarified that its purpose is not intended for the general public, only as a technical test carried out in order to learn and develop my skills.</p>
              <p>If you want to contact me in relation to this project or other reasons, I leave the following means of contact at your disposal: <a className="text-indigo-400 hover:text-indigo-500 focus:text-indigo-500 transition" href="https://devbanner.herokuapp.com/contact" target="_blank" rel="noopener noreferrer">DevBanner's Contact Page (My personal Blog)</a>.</p>
              <p>Thank you for reading! .) ♥</p>
            </section>
            <button onClick={handleClose} className="btn-primary w-full mt-auto" type="button">
              Close
            </button>
          </div>

        </div>
      </div>
    )}
    </>
  );
}

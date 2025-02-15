import React from "react";
const About: React.FC = () => {
  return (
    <section className="bg-[#F3F2EC] py-16 px-8 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-12">

        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 font-sans">About Us</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Welcome to our platform, where we celebrate the power of books to inspire and educate. We bring you a curated
            collection of engaging literature from renowned authors, designed to ignite your imagination and expand your
            knowledge. Explore our diverse range of books and embark on a journey of discovery.
          </p>
          <button className="mt-6 px-6 py-3 border border-[#74642F] text-[#74642F] font-semibold rounded-lg hover:bg-[#74642F] hover:text-white transition duration-300">
            Learn More →
          </button>
        </div>

        <div className="w-full md:w-1/2">
        </div>
      </div>
    </section>
  );
};

export default About;

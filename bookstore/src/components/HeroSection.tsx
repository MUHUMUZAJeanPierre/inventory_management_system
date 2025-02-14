import React from "react";
// import banner1 from "../assets/images/main-banner1.jpg";
// import banner2 from "../assets/images/main-banner2.jpg";

const HeroSection: React.FC = () => {
  return (
    <section id="billboard" className=" bg-green-600 h-screen">
      <div className="carousel w-full">
        {/* Slide 1 */}
        <div className="carousel-item  w-full">
          {/* <img src={banner1} className="w-full object-cover h-[400px] md:h-[600px]" alt="banner1" /> */}
          <div className=" inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold">Life of the Wild</h2>
            <p className="mt-3 text-lg">Discover amazing stories in nature and wildlife.</p>
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition">
              Read More
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item relative w-full">
          {/* <img src={banner2} className="w-full object-cover h-[400px] md:h-[600px]" alt="banner2" /> */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold">Birds Gonna Be Happy</h2>
            <p className="mt-3 text-lg">Explore the beauty of nature through books.</p>
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

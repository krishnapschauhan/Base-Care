const Hero = () => {
  return (
    <div
      className="relative w-full h-[610px] flex flex-col justify-end bg-no-repeat bg-top"
      style={{
        backgroundImage: "url('/heroimage.jpg')",
        backgroundSize: "cover"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        <div className="text-center pb-10 px-4 z-10">
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-md">
          Strengthening the Base Through Swift Action
        </h2>
        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm">
          Help us maintain operational readiness. Report facility issues directly to the command center.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="/report"
            className="group bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <span>Report Facility Issue</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="/status"
            className="group border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <span>View Response Status</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;

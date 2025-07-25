import Link from 'next/link'; // Import the Link component for navigation

const Hero = () => {
  return (
    // This main container centers everything vertically and horizontally
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 -mt-20">
      
      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gray-800">
        Ace Your Next Interview
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12">
        Your AI-powered toolkit for Software Engineering, including behavioral prep, technical challenges, and resume feedback.
      </p>

      {/* Container for the three feature cards/buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">

        {/* Card 1: Behavioral Prep */}
        <Link 
          href="/behavioral" 
          className="group block p-6 bg-yellow-100 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-yellow-200 cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Behavioral Prep</h2>
          <p className="text-gray-700">
            Practice common behavioral questions with an AI interviewer who gives real-time feedback.
          </p>
        </Link>

        {/* Card 2: Technical Challenge */}
        <Link 
          href="/technical" 
          className="group block p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-blue-200 cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Technical Challenge</h2>
          <p className="text-gray-700">
            Tackle technical prompts and data structure questions in a simulated environment.
          </p>
        </Link>

        {/* Card 3: Resume Review */}
        <Link 
          href="/resume" 
          className="group block p-6 bg-green-100 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-green-200 cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Resume Review</h2>
          <p className="text-gray-700">
            Get an instant score and actionable advice on how to improve your resume.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default Hero;
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Link } from 'react-router-dom';

const Home = () => {
  // Function to handle the external link navigation (opens in a new tab)
  const handleExternalLink = () => {
    window.open('https://brilliantbrains.digital', '_blank'); // Opens in a new tab
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">
          Brilliant Brains is Coming with a New Website!
        </h1>
        <h2 className="text-xl text-gray-700 mb-8">Stay tuned for exciting updates</h2>

        {/* Button for navigating to an external website */}
        <Button 
          onClick={handleExternalLink} 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Visit Our Website
        </Button>

        {/* For internal navigation, use React Router's Link component */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800">Or explore our other pages:</h3>
          <Link 
            to="/about" 
            className="text-blue-600 hover:text-blue-800 mt-2 block"
          >
            Go to About Page
          </Link>
        </div>

        {/* Mode Toggle (Dark/Light mode) */}
        <div className="mt-6">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();

  const handleAuth = async () => {
    try {
      const response = await fetch('/api/authUri');
      const data = await response.json();
      if (data.authUri) {
        window.location.href = data.authUri;
      } else {
        console.error('No authUri received');
      }
    } catch (error) {
      console.error('Error fetching authUri:', error);
    }
  };

  const handleCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('/api/callback?code=' + code)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('token', JSON.stringify(data));

          router.push('/dashboard');
        })
        .catch((error) => {
          console.error('Error during callback:', error);
        });
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div className="bg-gray-200 h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Hello World
      </h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-200"
        onClick={handleAuth}
      >
        Log in with QuickBooks
      </button>
    </div>
  );
};

export default Home;

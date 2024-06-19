import { useState } from 'react';

import { parse } from 'cookie';
import { GetServerSideProps } from 'next';

interface TokenData {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  x_refresh_token_expires_in: number;
  id_token?: string;
  createdAt?: number;
  realmId?: string;
}

const Dashboard = ({ token }: { token: TokenData }) => {
  console.log('Token in Dashboard:', token); // Added log
  const [responseData, setResponseData] = useState<any>(null);

  const getCompanyInfo = async () => {
    if (!token) {
      alert('Please connect to QuickBooks first');
      return;
    }

    if (!token.realmId) {
      alert('Realm ID is missing');
      return;
    }

    const response = await fetch('/api/getCompanyInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: token.access_token,
        realmId: token.realmId,
      }),
    });

    const data = await response.json();
    setResponseData(data);
  };

  const createInvoice = async () => {
    if (!token) {
      alert('Please connect to QuickBooks first');
      return;
    }

    if (!token.realmId) {
      alert('Realm ID is missing');
      return;
    }

    const response = await fetch('/api/createInvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: token.access_token,
        realmId: token.realmId,
      }),
    });

    const data = await response.json();
    setResponseData(data);
  };

  const [invoiceId, setInvoiceId] = useState<string>('');

  const getInvoiceById = async () => {
    if (!token) {
      alert('Please connect to QuickBooks first');
      return;
    }

    if (!token.realmId) {
      alert('Realm ID is missing');
      return;
    }

    if (!invoiceId) {
      alert('Invoice ID is missing');
      return;
    }

    const response = await fetch('/api/getInvoiceById', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        realmId: token.realmId,
        invoiceId,
      }),
    });

    const data = await response.json();
    setResponseData(data);
  };

  const signOut = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    window.location.href = '/';
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg mx-auto mt-10 text-center">
      <h1 className="text-2xl font-semibold text-white mb-4">Dashboard</h1>
      <pre className="text-sm text-gray-300 mb-6 bg-gray-800 p-4 rounded-lg">
        {JSON.stringify(token, null, 2)}
      </pre>
      <div className="flex flex-col gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={getCompanyInfo}
        >
          Get Company Info
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={createInvoice}
        >
          Create Invoice
        </button>
        <input
          type="text"
          className="bg-gray-400 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          placeholder="Enter Invoice ID"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
        />
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={getInvoiceById}
        >
          Get Invoice
        </button>
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
      {responseData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-2">
            Response Data
          </h2>
          <pre className="text-sm text-gray-300 bg-gray-800 p-4 rounded-lg">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  console.log('Cookies:', req.headers.cookie); // Added log
  const cookies = parse(req.headers.cookie || '');
  console.log('Parsed Cookies:', cookies); // Added log
  const token = cookies.token ? JSON.parse(cookies.token) : null;

  console.log('Token:', token); // Added log

  return {
    props: {
      token,
    },
  };
};

export default Dashboard;

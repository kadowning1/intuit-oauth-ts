# QuickBooks Integration Project

This project integrates QuickBooks with a custom application, allowing users to connect to QuickBooks, retrieve company information, create invoices, and get invoice details. The application uses the OAuth 2.0 protocol for authentication and authorization.

## Features

- Connect to QuickBooks using OAuth 2.0
- Retrieve company information from QuickBooks
- Create invoices in QuickBooks
- Retrieve invoice details by invoice ID
- Sign out from QuickBooks

## Prerequisites

- Node.js
- Next.js
- A QuickBooks developer account with app credentials

## Installation

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd quickbooks-integration
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your QuickBooks app credentials:
    ```bash
    NEXT_PUBLIC_QB_CLIENT_ID=your_client_id
    NEXT_PUBLIC_QB_CLIENT_SECRET=your_client_secret
    NEXT_PUBLIC_QB_REDIRECT_URI=http://localhost:3000/api/callback
    ```

## Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `pages/index.tsx`: Home page with a button to initiate the QuickBooks connection.
- `pages/dashboard.tsx`: Dashboard page to interact with QuickBooks (retrieve company info, create invoices, get invoice details, sign out).
- `pages/api/authUri.ts`: API route to generate the QuickBooks authorization URI.
- `pages/api/callback.ts`: API route to handle the QuickBooks callback and set the token.
- `pages/api/getCompanyInfo.ts`: API route to retrieve company information from QuickBooks.
- `pages/api/createInvoice.ts`: API route to create an invoice in QuickBooks.
- `pages/api/getInvoiceById.ts`: API route to retrieve invoice details by ID.
- `pages/api/logout.ts`: API route to log out and clear the token cookie.

## Usage

### Connecting to QuickBooks

1. Click the "Connect to QuickBooks" button on the home page.
2. You will be redirected to QuickBooks for authentication.
3. After authentication, you will be redirected back to the dashboard with the token set.

### Retrieving Company Information

1. Click the "Get Company Info" button on the dashboard.
2. The company information will be retrieved and displayed.

### Creating an Invoice

1. Click the "Create Invoice" button on the dashboard.
2. An invoice will be created and the details will be displayed.

### Getting Invoice Details

1. Enter the invoice ID in the input field on the dashboard.
2. Click the "Get Invoice" button.
3. The invoice details will be retrieved and displayed.

### Signing Out

1. Click the "Sign Out" button on the dashboard.
2. You will be logged out and redirected to the home page.

## Troubleshooting

- If the token is `null` on the initial redirect to the dashboard, ensure that the token cookie is correctly set in the callback API and that the cookie is accessible on the client-side.
- Check the console logs for detailed error messages and debugging information.

## License

This project is licensed under the MIT License.

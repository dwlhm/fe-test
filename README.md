## Getting Started

To start the project, please follow the steps below:

1. **Install dependencies**:

   ```bash
   npm install
   ```
2. **Run the development server**:

   ```bash
   npm run dev
   ```

## API Configuration

The API endpoint URL is defined in the `.env.local` as `NEXT_PUBLIC_API_URL`. By default, it is set to:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```
You can modify this URL according to your environment setup.

* The .env.local file is not ignored by Git to facilitate easier testing and ensure the API configuration is accessible during the test.
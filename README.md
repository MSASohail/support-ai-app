# AI Customer Support App

A full-stack application to help small businesses manage customer support with AI integration.

## Features
- **Dashboard**: View key metrics and analytics.
- **Ticket Management**: Create, view, and manage support tickets.
- **AI Integration**:
  - **Auto-responses**: AI drafts initial responses for new tickets.
  - **Categorization**: AI automatically categorizes tickets based on description.
  - **Suggested Replies**: AI suggests responses for agents to use.
- **Chat Interface**: Real-time-like chat view for support agents.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **AI**: OpenAI API

## Prerequisites
- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas URI)
- OpenAI API Key

## Setup

1.  **Clone/Download** the repository.
2.  **Install Dependencies**:
    ```bash
    npm install
    # This installs dependencies for both server and client
    npm run install-all
    ```
3.  **Environment Variables**:
    - Go to `server/` and rename `.env.example` to `.env`.
    - Add your **OpenAI API Key** and **MongoDB URI**.
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/support-ai-app
    OPENAI_API_KEY=sk-...
    ```

## Running the App

Run both frontend and backend with a single command from the root directory:

```bash
npm start
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## mock Mode
If no OpenAI Key is provided, the system will default to a **Mock Mode**, providing simulated AI responses for testing purposes.

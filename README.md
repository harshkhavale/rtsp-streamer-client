
# RTSP Stream Viewer – Frontend

This is the frontend portion of the **RTSP Stream Viewer** assignment for Skylark Labs' Full Stack Engineer position. It is a React-based web application that allows users to input RTSP stream URLs and view multiple live streams simultaneously.

> ✅ This frontend connects to a Django backend via WebSockets and is designed for responsiveness, performance, and ease of use.

---

## Features

* Add RTSP stream URLs dynamically
* Display live streams in a responsive grid layout
* View multiple streams simultaneously
* Fullscreen toggle for individual streams
* Basic stream loading feedback
* Modern UI built with Tailwind CSS

---

## Technologies Used

* **React.js** – Frontend library
* **Redux Toolkit** – State management
* **Tailwind CSS** – Styling and layout
* **WebSockets** – Live stream communication with the backend

---

## Folder Structure

```
src/
├── components/          # Reusable components (StreamGrid, StreamInput, Loader)
├── redux/               # Redux store and slice
├── pages/               # Page-level components
├── App.js               # Main app entry
├── index.js             # React DOM entry point
```

---

## Getting Started

### Prerequisites

* Node.js ≥ 14.x
* npm or yarn
* Backend server running on WebSockets (Django with Channels + FFmpeg)

---

### Installation

1. Clone the repository

```bash
git clone https://github.com/harshkhavale/rtsp-streamer-client.git
cd rtsp-streamer-client
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env` file

```env
VITE_API_URL=ws://your-backend-host/ws/stream/
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

---

## Deployment

This project is deployed via [Vercel](https://vercel.com/)
Live Demo: [Link](https://vercel.com/harshkhavales-projects/rtsp-streamer-client)



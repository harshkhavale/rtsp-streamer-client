# RTSP Stream Viewer – Frontend

This is the frontend portion of the **RTSP Stream Viewer** assignment for Skylark Labs' Full Stack Engineer position. It is a React-based web application that allows users to input RTSP stream URLs and view multiple live streams simultaneously.

> ✅ This frontend connects to a Django backend via WebSockets and is designed for responsiveness, performance, and ease of use.

---

## Features

* Add RTSP stream URLs dynamically
* Display live streams in a responsive grid layout
* View multiple streams simultaneously
* Real-time performance statistics display
  - Current FPS
  - Processing and detection times
  - Frame and detection counts
  - Stream uptime
* Face detection alerts with notifications
* Fullscreen toggle for individual streams
* Basic stream loading feedback
* Modern UI built with Tailwind CSS

---

## Technologies Used

* **React.js** – Frontend library
* **Redux Toolkit** – State management
* **Tailwind CSS** – Styling and layout
* **WebSockets** – Live stream communication with the backend
* **Headless UI** – Accessible UI components
* **Lucide Icons** – Modern icon set

---

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── StreamCard.jsx   # Individual stream display with performance stats
│   ├── StreamInput.jsx  # Stream creation form
│   ├── StreamList.jsx   # List of available streams
│   ├── StreamView.jsx   # Main streams view
│   ├── AlertCard.jsx    # Alert display component
│   ├── AlertView.jsx    # Alerts view
│   ├── SettingsView.jsx # Settings panel
│   ├── Sidebar.jsx      # Navigation sidebar
│   └── StreamControls.jsx # Stream control buttons
├── redux/              # State management
│   ├── store.jsx       # Redux store configuration
│   └── slices/         # Redux slices
│       ├── streamSlice.jsx
│       └── authSlice.jsx
├── pages/              # Page-level components
│   └── Dashboard.jsx   # Main dashboard
├── utils/              # Utility functions
│   └── index.js        # WebSocket and API utilities
├── App.jsx            # Main app component
└── main.jsx           # React entry point
```

---

## Getting Started

### Prerequisites

* Node.js ≥ 14.x
* npm or yarn
* Backend server running on WebSockets (Django with Channels + FFmpeg)

### Default Credentials

```
Username: admin
Password: admin123
```

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

5. Login with the default credentials:
   - Username: `admin`
   - Password: `admin123`

---

## Features in Detail

### Stream Management
- Create new RTSP streams with custom names and descriptions
- View multiple streams in a responsive grid layout
- Control individual streams (play/pause, fullscreen, remove)

### Performance Monitoring
- Real-time FPS display
- Processing and detection time metrics
- Frame and detection counters
- Stream uptime tracking

### Face Detection
- Real-time face detection alerts
- Browser notifications for detected faces
- Alert history view
- Confidence threshold settings

### Settings
- Adjustable confidence threshold
- Alert cooldown configuration
- Notification preferences

---

## Deployment

This project is deployed via [Vercel](https://vercel.com/)
Live Demo: [Link](https://vercel.com/harshkhavales-projects/rtsp-streamer-client)



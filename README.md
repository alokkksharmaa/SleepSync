# SleepSync - MERN Stack Sleep Tracker

A polished, full-stack sleep tracking application built with the MERN stack (MongoDB, Express, React, Node.js). Track your sleep patterns, visualize trends, and improve your rest quality with an intuitive dashboard.

## Features

### Core Functionality
- **CRUD Operations**: Create, Read, Update, and Delete sleep records
- **Sleep Tracking**: Log sleep duration, date, and quality
- **Dashboard Analytics**: View statistics including total records, average sleep, best/worst sleep days
- **Trend Visualization**: Interactive line chart showing sleep duration trends over time
- **Quality Indicators**: Color-coded badges based on sleep duration (Excellent, Good, Fair, Poor)

### UI/UX Features
- **Dark/Light Theme Toggle**: Switch between pure white and pure black themes with smooth transitions
- **Responsive Design**: Mobile-first approach, works seamlessly on desktop, tablet, and mobile
- **Loading States**: Skeleton loaders and spinners for better user feedback
- **Toast Notifications**: Success/error notifications for all actions
- **Confirmation Modals**: Safe delete operations with confirmation dialogs
- **Form Validation**: Client-side validation with error messages
- **Smooth Animations**: Page transitions, hover effects, and micro-interactions

### Technical Features
- **RESTful API**: Clean backend API with consistent response format
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Code Quality**: Well-commented, maintainable code structure
- **Performance**: Optimized with React hooks (useMemo) for calculations

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Recharts** - Chart library for data visualization
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd BackEnd
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `BackEnd` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

   For local MongoDB:
   ```env
   MONGO_URI=mongodb://localhost:27017/sleepsync
   ```

   For MongoDB Atlas:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sleepsync
   ```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd FrontEnd
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Project Structure

```
SleepSync/
├── BackEnd/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── sleepController.js    # API route handlers
│   │   ├── models/
│   │   │   └── Sleep.js               # MongoDB schema
│   │   ├── routes/
│   │   │   └── sleepRoutes.js         # API routes
│   │   ├── db.js                      # Database connection
│   │   └── server.js                  # Express server
│   ├── package.json
│   └── .env                           # Environment variables
│
└── FrontEnd/
    ├── src/
    │   ├── components/
    │   │   ├── Card.jsx               # Reusable card component
    │   │   ├── Navbar.jsx             # Navigation bar
    │   │   ├── StatsCard.jsx           # Statistics card component
    │   │   ├── SleepCard.jsx           # Sleep record card component
    │   │   ├── ThemeToggle.jsx         # Theme switcher
    │   │   ├── Modal.jsx               # Confirmation dialog
    │   │   ├── Toast.jsx               # Toast notification
    │   │   ├── ToastContainer.jsx      # Toast container
    │   │   └── LoadingSkeleton.jsx    # Loading states
    │   ├── contexts/
    │   │   └── ThemeContext.jsx       # Theme management
    │   ├── hooks/
    │   │   └── useToast.js            # Toast hook
    │   ├── pages/
    │   │   ├── SleepList.jsx          # Dashboard page
    │   │   ├── AddSleep.jsx           # Add sleep form
    │   │   └── EditSleep.jsx          # Edit sleep form
    │   ├── services/
    │   │   └── api.js                 # Axios configuration
    │   ├── App.jsx                    # Main app component
    │   ├── main.jsx                   # Entry point
    │   └── index.css                  # Global styles
    ├── package.json
    └── tailwind.config.js             # Tailwind configuration
```

##  Theme System

SleepSync features a complete dark/light theme system:

- **Light Mode**: Pure white background (#FFFFFF), black text (#000000)
- **Dark Mode**: Pure black background (#000000), white text (#FFFFFF)
- **Accent Colors**: Blue (#3b82f6 for light, #60a5fa for dark)
- **Quality Badges**: 
  - Excellent: Green (#10b981)
  - Good: Blue (#3b82f6)
  - Fair: Yellow (#f59e0b)
  - Poor: Red (#ef4444)

Theme preference is saved in localStorage and persists across sessions.

##  API Endpoints

### Base URL: `http://localhost:5000/api/sleep`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all sleep records with statistics |
| GET | `/:id` | Get single sleep record by ID |
| POST | `/` | Create new sleep record |
| PUT | `/:id` | Update sleep record |
| DELETE | `/:id` | Delete sleep record |

### Response Format

All API responses follow this structure:
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

##  Usage

1. **View Dashboard**: Navigate to the home page to see all sleep records, statistics, and trends
2. **Add Sleep Record**: Click "Add New Sleep Record" button, fill in the form, and submit
3. **Edit Record**: Click the edit icon on any sleep record card
4. **Delete Record**: Click the delete icon, confirm in the modal dialog
5. **Toggle Theme**: Click the sun/moon icon in the navigation bar

##  Quality Indicators

Sleep quality is automatically determined based on duration:
- **7-9 hours**: Excellent (Green)
- **6-7 hours**: Good (Blue)
- **5-6 hours**: Fair (Yellow)
- **<5 hours**: Poor (Red)

##  Notes

- This is an academic project designed for demonstration purposes
- No authentication system is implemented
- All data is stored locally in MongoDB
- The application is optimized for desktop and tablet viewing

##  Future Enhancements

- User authentication and multi-user support
- Advanced analytics and insights
- Sleep goal setting and tracking
- Export data functionality
- Mobile app version

##  License

This project is created for academic purposes.

##  Author

Built as part of a MERN stack learning project.

---

**Happy Sleep Tracking! 😴**

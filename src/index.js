import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EventPage from './Pages/EventPage/SubModules/EventPage'
import AdminPage from './Pages/AdminPage'
import Manage from './Pages/AdminPage/Manage/Manage'
import Home from './Pages/EventPage/Home/Home'
import HomePage from './Pages/EventPage/index'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import NewEvent from './Pages/CollegeAdmin/NewEvent/NewEvent'
import CollegeAdminHome from './Pages/CollegeAdmin/CollegeAdminHome'
import CollegeAdminIndex from './Pages/CollegeAdmin/MyEvents/CollegeAdminIndex'
import RSVPList from './Pages/CollegeAdmin/MyEvents/RSVPList/RSVPList'
import CadminTypewriter from './Pages/CollegeAdmin/CadminTypewriter'
import AdminTypewriter from './Pages/AdminPage/AdminTypewriter'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
  {
    path: '/login',
    element: <Login />,
    children: [],
  },
  {
    path: '/cAdmin',
    element: <CollegeAdminHome />,
    children: [
      {
        index: true,
        element: <CadminTypewriter />,
      },
      {
        path: 'newEvent',
        element: <NewEvent />,
      },
      {
        path: 'myEvent',
        element: <CollegeAdminIndex />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
    children: [],
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <AdminTypewriter />,
      },
      {
        path: 'manage',
        element: <Manage />,
      },
    ],
  },
  {
    path: '/eventpage',
    element: <HomePage />,
    children: [
      {
        path: ':event_type', //parent path
        element: <Home />,
      },
    ],
  },
  {
    path: '/eventdetails/:event_type/:eventID',
    element: <EventPage />,
  },
  {
    path: '/rsvp/:typeID/:eventID',
    element: <RSVPList />,
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

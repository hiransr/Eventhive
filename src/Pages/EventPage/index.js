import React, { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import ResponsiveAppBar from '../../Components/ResponsiveAppBar'

const HomePage = () => {
  const { eventname } = useParams()
  console.log(eventname)
  const navigate = useNavigate()
  useEffect(() => {
    if (!eventname) {
      navigate('/eventpage/workshop')
    }
  }, [])
  return (
    <div>
      <ResponsiveAppBar />

      <Outlet />
    </div>
  )
}

export default HomePage

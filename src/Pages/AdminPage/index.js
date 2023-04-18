import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminAppBar from '../../Components/AdminAppBar'
import { Alert } from '@mui/material'
import { axiosVerifyUser } from '../../apis/endpoints'

const AdminPage = () => {
  const navigate = useNavigate()
  //   useEffect(() => {
  //     if (true) {
  //       // to check for collegeAdmin
  //       navigate('/')
  //     }
  //   }, [])
  const [message, setMessage] = useState('')
  const checkAuth = async () => {
    const res = await axiosVerifyUser({ type: 100 })
    let navigatePath = ''
    console.log(res)
    if (res.status === 200) {
      return
    }
    if (res.status === 401) {
      navigatePath = '/login'
    } else if (res.data.type === 101) {
      // console.log('hi')
      navigatePath = '/cadmin'
    } else {
      navigatePath = '/eventpage/3'
    }

    console.log(res.data.msg)
    setMessage(res.data.msg)
    setTimeout(() => {
      navigate(navigatePath)
    }, 3000)
  }
  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <div>
      <AdminAppBar />
      {message && (
        <Alert severity="error" className="w-[40%] mx-auto my-auto mt-[100px]">
          {message}
        </Alert>
      )}

      <Outlet />
    </div>
  )
}

export default AdminPage

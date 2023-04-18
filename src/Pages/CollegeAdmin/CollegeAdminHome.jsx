import React, { useEffect, useState } from 'react'
import CAdminNav from '../../Components/CAdminNav'
import { Outlet, useNavigate } from 'react-router-dom'
import { axiosVerifyUser } from '../../apis/endpoints'
import { Alert } from '@mui/material'
import Typewriter from 'typewriter-effect'


const CollegeAdminHome = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const checkAuth = async () => {
        const res = await axiosVerifyUser({ type: 101 })
        let navigatePath = ""
        if (res.status === 200) {
            return
        }
        if (res.status === 401) {
            navigatePath = "/login"
        } else if (res.data.type === 100) {
            navigatePath = "/admin"
        }
        else {
            navigatePath = "/eventpage/3"
        }

        console.log(res.data.msg)
        setMessage(res.data.msg)
        setTimeout(() => {
            navigate(navigatePath);
        }, 3000)
    }
    useEffect(() => {
        checkAuth()
    }, [])
    return (
        <>
            <div><CAdminNav /></div>
            {message && <Alert severity="error" className='w-[50%] mx-auto my-auto mt-[100px]'>{message}</Alert>}
            <Outlet />
        </>
    )
}

export default CollegeAdminHome
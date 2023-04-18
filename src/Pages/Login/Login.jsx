import React, { useState, } from 'react'
import LoginNav from '../../Components/LoginNav'
import loginImg from '../../Assets/login.jpg'
import { TextField, Button, Backdrop } from '@mui/material'
import { axiosLogin, axiosVerifytotp } from '../../apis/endpoints'
import { Alert } from '@mui/material'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [inputValue, setInputValue] = useState({})
  const [openTotp, setOpenTotp] = useState(false)
  console.log(inputValue)
  const handleChange = (e) => {
    setInputValue(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    });
    setErrorMessage("")
    setSuccessMessage("")
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault() // prevent refresh
    const res = await axiosVerifytotp({ ...inputValue, isLogin: true })
    if (res.status == 200) {
      setSuccessMessage(res.data.msg)
      setErrorMessage("")
      navigate('/cadmin')
    } else if (res.status > 400) {
      setErrorMessage(res.data.msg)
      setSuccessMessage("")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault() // prevent refresh
    setErrorMessage("")
    setSuccessMessage("")
    console.log(inputValue)
    const res = await axiosLogin(inputValue)
    if (res.status == 200) {
      setErrorMessage("")
      setSuccessMessage(res.data.msg)
      if (res.data.accountType == 100)
        navigate('/admin')
      else if (res.data.accountType == 102)
        navigate('/eventpage')
      else {
        setErrorMessage("")
        setSuccessMessage("")
        setInputValue(prev => ({ ...prev, auth_id: res.data.auth }))
        setOpenTotp(true)
      }
    } else if (res.status > 400) {
      setSuccessMessage("")
      setErrorMessage(res.data.msg)
    }

  }
  return (
    <>
      <div>
        <LoginNav />
      </div>
      <div className='flex  items-center justify-center'>
        <div className=' flex flex-row mt-[150px] h-[450px] w-[600px] shadow'>
          <div className='flex-1'>
            <img src={loginImg} alt="Logo" className=' w-[100%] h-[100%] object-cover'></img>
          </div>
          <div className=' flex flex-col gap-5 justify-center items-center flex-1 px-3 pt-3'>
            {openTotp ? <> <VerifiedUserIcon className='!text-success !h-10 !w-10' /> <h2>Authentication Code</h2></> : <h2>LOGIN</h2>}
            <hr className=' bg-black w-full' />
            {!openTotp ?
              <form onSubmit={handleSubmit} className=' flex flex-col gap-5 justify-center items-center px-3 pt-3'>
                <TextField id="outlined-basic" label="username" sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} type="text" required name="email" variant="outlined" value={inputValue.email} onChange={handleChange} />
                <TextField id="outlined-basic" label="password" sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} type="password" required name="pass" variant="outlined" value={inputValue.pass} onChange={handleChange} />
                <Button variant="contained" className='!bg-black' type='submit'>Login</Button>
              </form> : <form onSubmit={handleOtpSubmit} className='flex flex-col gap-3'>
                <TextField key="totp" id="outlined-basic" label="TOTP" sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} variant="outlined" value={inputValue.totp} name="totp" onChange={handleChange} />
                <Button variant="contained" className='!bg-black w-20 self-center' type='submit'>Verify</Button>
              </form>
            }
            {successMessage && <Alert severity="success" className='w-[100%] mx-auto mt-3'>{successMessage}</Alert>}
            {errorMessage && <Alert severity="error" className='w-[100%] mx-auto mt-3'>{errorMessage}</Alert>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
import React, { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TextField, Button, Alert, Backdrop, CircularProgress, Chip } from '@mui/material';
import SignupNav from '../../Components/SignupNav';
import wallpaper from "../../Assets/wallpaper.png"
import { axiosSingup, axiosVerifytotp } from '../../apis/endpoints';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QRCode from 'qrcode'
import { useNavigate } from 'react-router-dom';
const userFields = {
    cAdmin: [{ label: "College Name", type: "text", name: "collegeName" }, { label: "Email", type: "email", name: "email" }, { label: "Password", type: "password", name: "pass" }, { label: "Confirm Password", type: "password", name: "" }, { label: "Phone", type: "number", name: "ph_no" }, { label: "City", type: "text", name: "city" }, { label: "State", type: "text", name: "state" }, { label: "Country", type: "text", name: "country" }, { label: "Pin Code", type: "number", name: "pin_code" }],
    user: [{ label: "Name", type: "text", name: "name" }, { label: "Email", type: "email", name: "email" }, { label: "Password", type: "password", name: "pass" }, { label: "Confirm Password", type: "password", name: "" }, { label: "Phone", type: "number", name: "ph_no" }, { label: "DOB", type: "date", name: "dob" }, { label: "Profile", type: "Text", name: "profile" }, { label: "Organization Name", type: "text", name: "org" }, { label: "City", type: "text", name: "city" }, { label: "State", type: "text", name: "state" }, { label: "Country", type: "text", name: "country" }, { label: "Pin Code", type: "number", name: "pin_code" }]
}
const Signup = () => {
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState("")
    const [successVerifyMessage, setSuccessVerifyMessage] = useState("")
    const [totp, setTotp] = useState("")
    const [errorVerifyMessage, setErrorVerifyMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [fields, setFields] = useState(userFields.user)
    const [inputValue, setInputValue] = useState({ accountType: "user" })
    const [value, setValue] = useState('user')
    const [qrCode, setQrCode] = useState("")

    const totpURL = `otpauth://totp/Eventhive?secret=${totp}`

    const generateQR = async () => {
        try {
            setQrCode(await QRCode.toDataURL(totpURL))
        } catch (err) {
            console.error(err)
        }
    }
    const handleTabChange = (event, TabValue) => {
        setValue(TabValue);
        setFields(userFields[TabValue])
        setInputValue({ accountType: TabValue })
        setErrorMessage("")
        setSuccessMessage("")
    };
    const onFieldChange = (e) => {
        setInputValue(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault() // prevent refresh
        setErrorMessage("")
        setSuccessMessage("")
        const res = await axiosSingup(inputValue)
        if (res.status == 200 && inputValue.accountType == 'user') {
            setErrorMessage("")
            setSuccessMessage(res.data.msg)
            navigate('/login')
        } else if (res.status > 400) {
            setSuccessMessage("")
            setErrorMessage(res.data.msg)
        }
        res.data.totp && setTotp(res.data.totp)

    }
    const handleVerify = async (e) => {
        e.preventDefault()
        const res = await axiosVerifytotp({ ...inputValue, isLogin: false })
        if (res.status == 200) {
            setErrorVerifyMessage("")
            setSuccessVerifyMessage(res.data.msg)
            navigate('/login')
        } else if (res.status > 400) {
            setSuccessVerifyMessage("")
            setErrorVerifyMessage(res.data.msg)
        }
    }
    useEffect(() => {
        totpURL && generateQR()
    }, [totpURL])

    return (
        <>
            <div className=' bg-cover relative'>
                <img src={wallpaper} alt="Wallpaper" className='w-[100%] h-[100%] fixed '></img>
            </div>
            <div className=''>
                <SignupNav />
            </div>
            <div>
                <div className='flex items-center justify-center absolute -top-5 left-[80px]'>
                    <div className='mt-[120px] min-h-[450px]  w-[800px] shadow pb-4 bg-body'>
                        <div>

                            <Tabs
                                value={value}
                                onChange={handleTabChange}
                                textColor="Black"
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: "#D97D54"
                                    }
                                }}

                                aria-label="secondary tabs example"
                            >
                                <Tab className="flex-1 !max-w-[500px]" value="user" label="User" />
                                <Tab value="cAdmin" className="flex-1 !max-w-[500px]" label="College Admin" />
                            </Tabs>
                            <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-2 gap-4 p-4 '>
                                    {fields.map(field => (field.type == "date" ? <TextField InputLabelProps={{ shrink: true }} key={field.label} sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} name={field.name} required value={inputValue[field.name]} id={field.label} label={field.label} type={field.type} variant="outlined" onChange={onFieldChange} /> : <TextField key={field.label + value} required value={inputValue[field.name]} id={field.label} sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} label={field.label} type={field.type} variant="outlined" name={field.name} onChange={onFieldChange} />)
                                    )}

                                </div>
                                <div className='flex justify-center items-center'>
                                    <Button variant="contained" className='!bg-black' type='submit'>Signup</Button>
                                </div>
                            </form>


                            {successMessage && <Alert severity="success" className='w-[50%] mx-auto mt-3'>{successMessage}</Alert>}
                            {errorMessage && <Alert severity="error" className='w-[50%] mx-auto mt-3'>{errorMessage}</Alert>}
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={totp ? true : false}
                            >
                                <div className='flex flex-col justify-center p-3 min-h-[400px] w-[700px] gap-3 items-center bg-body'>
                                    <h2 className=' text-black'>Two Factor Authentication (2FA)</h2>
                                    <img src={qrCode} />
                                    <Chip className='!p-5' icon={<ContentCopyIcon className='!text-black !w-[1rem]' role='button' onClick={() => {
                                        navigator.clipboard.writeText(totp)
                                    }} />} label={totp} />
                                    <form onSubmit={handleVerify} className='flex flex-col gap-3'>
                                        <TextField id="outlined-basic" label="TOTP" variant="outlined" sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} name="totp" onChange={onFieldChange} />
                                        <Button variant="contained" className='!bg-black w-20 self-center' type='submit'>Verify</Button>
                                    </form>
                                    {successVerifyMessage && <Alert severity="success" className='w-[50%] mx-auto mt-3'>{successVerifyMessage}</Alert>}
                                    {errorVerifyMessage && <Alert severity="error" className='w-[50%] mx-auto mt-3'>{errorVerifyMessage}</Alert>}
                                </div>
                            </Backdrop>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Signup
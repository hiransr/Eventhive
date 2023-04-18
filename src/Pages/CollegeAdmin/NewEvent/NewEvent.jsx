import React, { useState, } from 'react'
import NewEventNav from '../../../Components/NewEventNav'
import { Tab, Tabs, TextField, Radio, FormControl, InputLabel, FormLabel, RadioGroup, Button, FormControlLabel, Select, MenuItem, Alert } from '@mui/material'
import { axiosCreateNewEvent } from '../../../apis/endpoints'
import { useNavigate } from 'react-router-dom'
import { DeliveryDining } from '@mui/icons-material'
const constUserFields = {
    fcommon: [{ label: "Name", type: "text", name: "name" }, { label: "Date", type: "date", name: "date" }, { label: "Mode", type: "radio", name: "mode", option: ["Online", "Offline"] }, { label: "Paid", type: "radio", name: "paid", option: ["Yes", "No"] }],
    lcommon: [{ label: "Description", type: "textarea", name: "des" }, { label: "Sponsors", type: "text", name: "sponsors" }, { label: "Last Date To Apply", type: "date", name: "ldate" }, { label: "Link", type: "url", name: "link" }, { label: "Image", type: "file", name: "img_name" }],
    workshop_table: [{ label: "Duration", type: "text", name: "duration" }, { label: "Important Node", type: "text", name: "impnote" }],
    hackathon_table: [{ label: "Duration", type: "text", name: "duration" }, { label: "Domain", type: "text", name: "domain" }, { label: "Price Pool", type: "number", name: "price" }, { label: "Team Size", type: "number", name: "teamsize" }],
    seminar_table: [{ label: "Duration", type: "text", name: "duration" }, { label: "Number of Speakers", type: "text", name: "noOfSpeaker" }],
    conference_table: [{ label: "Duration", type: "text", name: "duration" }, { label: "Type", type: "select", name: "type", option: ["National Level", "International Level", "nil"] }]
}
const NewEvent = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState('hackathon_table')
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [userFields, setUserFields] = useState([...constUserFields.fcommon, ...constUserFields.hackathon_table, ...constUserFields.lcommon])
    const [inputValue, setInputValue] = useState({ eventType: "hackathon_table" })
    const handleTabChange = (event, TabValue) => {
        setValue(TabValue);
        setInputValue({ eventType: TabValue })
        setErrorMessage("")
        setSuccessMessage("")
        setUserFields([...constUserFields.fcommon, ...constUserFields[TabValue], ...constUserFields.lcommon])
    }
    const onFieldChange = (e) => {
        console.log(e.target.name, e.target.value)
        setInputValue(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });

    }
    const handleImage = async (e) => {
        // console.log(e.target.name, e.target.value)
        setInputValue(prev => {
            return { ...prev, [e.target.name]: e.target.files[0] }
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault() // prevent refresh
        const formData = new FormData()
        for (const input in inputValue) {
            formData.append(input, inputValue[input])
        }
        for (let key of formData.entries()) {
            console.log(key[0], key[1])
        }
        const res = await axiosCreateNewEvent(formData)
        console.log(res)
        setErrorMessage("")
        setSuccessMessage("")
        if (res.status == 200) {
            setErrorMessage("")
            setSuccessMessage(res.data.msg)
        } else if (res.status === 401) {

            navigate('/login')
        } else if (res.status > 400) {
            setSuccessMessage("")
            setErrorMessage(res.data.msg)
        }
    }
    const [test, setTest] = useState("")

    return (
        <>
            <div><NewEventNav /></div>
            <div className=''>
                <div className='mt-[120px] min-h-[600px] w-[1100px] shadow pb-4 bg-body mx-auto'>
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
                            <Tab className="flex-1 !max-w-[500px]" value="hackathon_table" label="Hackathon" />
                            <Tab value="seminar_table" className="flex-1 !max-w-[500px]" label="Seminar" />
                            <Tab value="workshop_table" className="flex-1 !max-w-[500px]" label="Workshop" />
                            <Tab value="conference_table" className="flex-1 !max-w-[500px]" label="Conference" />
                        </Tabs>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* <div className='grid grid-cols-2 gap-4 p-4 '> */}
                        <div className='grid grid-cols-2 gap-4 p-4 '>
                            {userFields.map(field => {
                                if (field.type == "text" || field.type == 'url' || field.type == 'number') {
                                    return <TextField key={field.label + value} sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} required value={inputValue[field.name]} id={field.label} label={field.label} type={field.type} variant="outlined" name={field.name} onChange={onFieldChange} />
                                }
                                if (field.type == "date") {
                                    return <TextField InputLabelProps={{ shrink: true }} key={field.label + value} sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} name={field.name} required value={inputValue[field.name]} id={field.label} label={field.label} type={field.type} variant="outlined" onChange={onFieldChange} />
                                }
                                if (field.type == "radio") {
                                    return (<FormControl key={field.label + value} sx={{ '& .MuiButtonBase-root.MuiRadio-root.Mui-checked': { color: 'black' } }}>
                                        <FormLabel id={field.label}>{field.label}</FormLabel>
                                        <RadioGroup

                                            required
                                            value={inputValue[field.name]}
                                            name={field.name}
                                            onChange={onFieldChange}

                                        >

                                            {field.option.map(op => {
                                                return <FormControlLabel value={op} key={field.value + op} control={<Radio />} label={op} sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red !important' } }} />
                                            })}
                                        </RadioGroup>
                                    </FormControl>)
                                }
                                if (field.type == "file") {
                                    return <TextField InputLabelProps={{ shrink: true }} key={field.label + value} sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} name={field.name} required id={field.label} label={field.label} type={field.type} variant="outlined" onChange={handleImage} />
                                }
                                if (field.type == "select") {
                                    return (
                                        // <FormControl fullWidth key={field.label + value}>
                                        //     <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                                        //     <Select

                                        //         labelId="demo-simple-select-label"
                                        //         id={field.label}
                                        //         value={test}
                                        //         label={field.label}
                                        //         onChange={(e) => {console.log(e.target); setTest(e.target.value)}}
                                        //     >
                                        //         {field.option.map(type => {
                                        //             console.log(type)
                                        //             return <MenuItem key={field.value + type} value={field.value}>{type}</MenuItem>
                                        //         })}
                                        //     </Select>
                                        // </FormControl>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={inputValue[field.name]}
                                                name={field.name}
                                                label={field.label}
                                                onChange={onFieldChange}
                                            >
                                                {field.option.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                                            </Select>
                                        </FormControl>
                                    )
                                }
                                if (field.type == "textarea") {
                                    return <TextField key={field.label + value} required value={inputValue[field.name]} id={field.label} sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} label={field.label} type={field.type} multiline rows={4} variant="outlined" name={field.name} onChange={onFieldChange} />
                                }
                            }
                            )}

                        </div>
                        <div className='flex justify-center items-center mt-5'>
                            <Button variant="contained" className='!bg-black' type='submit'>Submit</Button>
                        </div>
                        <div>
                            {successMessage && <Alert severity="success" className='w-[50%] mx-auto mt-3'>{successMessage}</Alert>}
                            {errorMessage && <Alert severity="error" className='w-[50%] mx-auto mt-3'>{errorMessage}</Alert>}
                        </div>
                    </form>
                </div >
            </div >
        </>

    )
}

export default NewEvent
import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const ExistingAdmins = ({ org, email, contact, onDelete }) => {
    return (
        <div className='flex flex-row shadow rounded p-3 min-h-[150px] w-full mt-[10px] font-serif'>
            < div className='flex flex-1 flex-col gap-4 justify-evenly  '>
                <div className='flex flex-row gap-2'>
                    <ApartmentIcon className='!text-grey' />
                    <p>{org}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    <EmailIcon className='!text-grey' />
                    <p>{email}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    <LocalPhoneIcon className='!text-grey' />
                    <p>{contact}</p>
                </div>
            </div>
            <div >
                <IconButton onClick={onDelete}>
                    <DeleteIcon className="!text-decline" />
                </IconButton>
            </div>
        </div>
    )
}

export default ExistingAdmins
import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const RSVPdata = ({ name, email, contact, org }) => {
    return (
        <div className='flex flex-row shadow rounded p-3 min-h-[70px] w-full mt-[10px] font-serif'>
            < div className='flex flex-row gap-4 justify-evenly flex-wrap w-full items-center '>
                <div className='flex flex-1 flex-row gap-2 items-center'>
                    <PersonIcon className='!text-grey ' />
                    <p>{name}</p>
                </div>
                <div className='flex  flex-1 flex-row gap-2'>
                    <EmailIcon className='!text-grey' />
                    <p>{email}</p>
                </div>
                <div className='flex  flex-1 flex-row gap-2'>
                    <LocalPhoneIcon className='!text-grey' />
                    <p>{contact}</p>
                </div>
                <div className='flex  flex-1 flex-row gap-2'>
                    <ApartmentIcon className='!text-grey' />
                    <p>{org}</p>
                </div>
            </div>
        </div>
    )
}

export default RSVPdata
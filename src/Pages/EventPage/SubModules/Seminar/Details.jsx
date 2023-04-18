import React from 'react'
import { Box } from '@mui/material';
import poster from '../../../../Assets/logo.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { fontSize } from '@mui/system';
const fields = {
    Workshop: ['value1', 'value2'],
    Hackathon: ['value1', 'value2']
}

const Details = ({ S_ID, Name, Date, No, Sponsors, Mode, lDate, Des, paid, link, rsvp_eventid, liked_eventid, handleRSVP, handleLike, imgName }) => {
    return (

        <Box className="flex flex-row justify-center">
            <Box className="relative flex pt-[10px] h-[600px] w-[600px] mt-[100px] rounded overflow-auto" sx={{ boxShadow: 3 }}>
                <div className='flex flex-row '>
                    <div className="flex flex-col " >
                        <div className='pt-[20px] pl-[30px] space-y-4 font-serif font-light flex-col'>
                            <p><span className='font-bold'>Seminar ID: </span><span className='font-bold'>{S_ID}</span></p>
                            <p><span className='font-bold'>Name: </span><span>{Name}</span></p>
                            <p><span className='font-bold'>Date: </span>{Date}</p>
                            <p><span className='font-bold'>Number of Speakers: </span>{No}</p>
                            <p><span className='font-bold'>Description: </span>{Des}</p>
                            <p><span className='font-bold'>Sponsors: </span>{Sponsors}</p>
                            <p><span className='font-bold'>Mode </span>: {Mode}</p>
                            <p><span className='font-bold'>Last Date to Apply: </span>{lDate} </p>
                            <p><span className='font-bold'>Link: </span>{link}</p>
                        </div>
                        <div className='flex flex-row pl-[30px] pt-[20px]'>
                            <div>
                                <button className={`button-rsvp ${rsvp_eventid ? '' : 'unselect'}`} role="button" onClick={handleRSVP}>RSVP</button>
                            </div>
                            <div className='pl-[10px] '>
                                {liked_eventid ? <IconButton sx={{ color: '#D1495B', }} aria-label="like">
                                    <FavoriteIcon sx={{ fontSize: '40px' }} onClick={handleLike} />
                                </IconButton> : <IconButton sx={{ color: '#D1495B', }} aria-label="like" onClick={handleLike}><FavoriteBorderIcon sx={{ fontSize: '40px' }} /></IconButton>}
                            </div>

                        </div>

                    </div>
                    <div className=' pt-[10px] pr-4 top-2 right-2 absolute'>
                        <button className="button-paid " role="button">{paid == "Yes" ? 'Paid' : 'Unpaid'}</button>
                    </div>
                </div>

            </Box>
            <div className='right-0 pt-[100px] max-h-[630px] w-[630px] pl-[30px] flex items-center justify-center' >
                <img src={imgName} className="shadow rounded " alt="poster"></img>
            </div>
        </Box >
    )
}
export default Details;
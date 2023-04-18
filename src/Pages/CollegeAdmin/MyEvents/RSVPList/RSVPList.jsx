import React, { useEffect, useState } from 'react'
import RSVPNav from '../../../../Components/RSVPNav'
import RSVPdata from './RSVPdata'
import { axiosGetRSVPData } from '../../../../apis/endpoints'
import { useParams } from 'react-router-dom'
// const EA = [{ id: 'Admin ID', orgname: 'Organization_Nam', phno: "Contact Number", name: 'gdvjvnfk jg f vjjg bb f fh hcjhdbchjcchjcb' }, { id: 'Admin ID', orgname: 'Organization_Nam', phno: "Contact Number", name: 'gdvcjhdbchjcchjcb' }, { id: 'Admin ID', orgname: 'Organization_Nam', contact: "Contact Number", name: 'gdvcjhdbchjcchjcb' }]

const RSVPList = () => {
    const [rsvpData, setRsvpData] = useState([])
    const { eventID } = useParams()
    const getRSVPData = async () => {
        const res = await axiosGetRSVPData(eventID)
        if (res.status == 200) {
            setRsvpData(res.data.userData)
        }
    }
    useEffect(() => {getRSVPData()}, [])
    return (
        <div>
            <RSVPNav />
            <div className=' mt-[100px] h-[650px] w-[80%] gap-6 mx-auto shadow overflow-auto' >
                <p className='pt-[10px] text-center font-serif font-bold text-xl hover:text-2xl'>RSVP Details</p>
                <div className=' flex flex-col gap-1 align-middle mx-[25px]'>
                    {rsvpData.map((each) => {
                        return <RSVPdata key={each.username} email={each.username} org={each.org_name} contact={each.phone} name={each.name} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default RSVPList
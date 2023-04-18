import React, { useState, useEffect, } from 'react'
import MyEventsNav from '../../../Components/MyEventsNav'
import cardImg from '../../../Assets/logo.png'
import MyEventCards from './MyEventCards'
import { axiosDeleteMyEvent, axiosGetMyEvents } from '../../../apis/endpoints'
import { useNavigate } from 'react-router-dom'
// const cardData = [{ heading: "Event 1 jdgfvgrjh dfjvhbfhvf fjvb", image: cardImg, desp: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae impedit consequuntur" }, { heading: "Event 2", image: cardImg, desp: " tenetur qui? At accusamus incidunt et temporibus illo sit corporis beatae consectetur, tempore veritatis est animi accusantium, quod excepturi!" }, { heading: "Event 3", image: cardImg, desp: " tenetur qui? At accusamus incidunt et temporibus illo sit corporis beatae consectetur, tempore veritatis est animi accusantium, quod excepturi!" }, { heading: "Event 4", image: cardImg, desp: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae impedit consequuntur" }, { heading: "Event 5", image: cardImg, desp: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae impedit consequuntur" }, { heading: "Event 6", image: cardImg, desp: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae impedit consequuntur" }]

const CollegeAdminIndex = () => {
    const [cardData, setCardData] = useState([])
    const navigate = useNavigate()
    async function getMyEvents() {
        const res = await axiosGetMyEvents()
        console.log(res)
        setCardData(res.data.events)
    }
    const handleUpdate = async (event_type, event_id) => {
        const res = await axiosDeleteMyEvent(event_type, event_id)
        if (res.status == 200) {
            setCardData(prev => {
                return prev.filter(card => card.Event_ID != event_id)
            })
        }
    }

    useEffect(() => {
        getMyEvents()
    }, [])
    
    return (
        <div>
            <MyEventsNav />
            <div className=" w-[85%] mx-auto grid mt-[100px] grid-cols-4 gap-y-8 gap-6">{cardData.map((eachCard) => {
                return <MyEventCards key={eachCard.Event_ID} eventHeading={eachCard.name} eventImage={cardImg} navigateURL={`/rsvp/${eachCard.event_type}/${eachCard.Event_ID}`} onDelete={() => handleUpdate(eachCard.event_type, eachCard.Event_ID)}
                />
            })}</div>
        </div>
    )
}

export default CollegeAdminIndex
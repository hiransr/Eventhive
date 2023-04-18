import React, { useEffect, useState } from 'react'
import EventAppBar from '../../../Components/EventAppBar'
import WorkshopDetails from './Workshop/Details';
import poster from '../../../Assets/logo.png'
import SeminarDetails from './Seminar/Details';
import HackathonDetails from './Hackathons/Details';
import ConferenceDetails from './Conferences/Details';
import { useParams } from 'react-router-dom';
import { axiosGetEventDetails, axiosRsvpData, axiosLikeData } from '../../../apis/endpoints';

const EventPage = () => {
  const [cardData, setCardData] = useState({})
  const { event_type, eventID } = useParams()
  async function getAllEvents() {
    const res = await axiosGetEventDetails(event_type, eventID)
    console.log(res)
    setCardData(res.data.eventData)
  }
  const handleRSVP = async () => {
    // console.log("hi")
    const res = await axiosRsvpData({ event_id: eventID, event_type })
    if (res.status === 200) {
      setCardData(prev => ({ ...prev, rsvp_eventid: prev.rsvp_eventid ? false : true }))
    }
  }
  const handleLike = async () => {
    // console.log("hi")
    const res = await axiosLikeData({ event_id: eventID, event_type })
    if (res.status === 200) {
      setCardData(prev => ({ ...prev, like_eventid: prev.like_eventid ? false : true }))
    }
  }

  useEffect(() => {
    getAllEvents()

  }, [event_type, eventID])
  // const cardData = { Workshop_ID: "WID01234", Name: "Workshop on Ethereum", Date: "03/05/2023", Duration: "6 Hrs", Sponsors: "Ethereum & Binance", Mode: "Offline", lDate: "25/04/2023", link: "http://localhost:3000/", impNote: "Laptop is Compulsory" };
  // console.log("card name" + cardData.Name)
  return (
    <>
      <div><EventAppBar /></div>
      {event_type === '3' && <WorkshopDetails W_ID={cardData.ID} Name={cardData.Name} Date={cardData.Date} Duration={cardData.Duration} Sponsors={cardData.Sponsors} Mode={cardData.Mode} lDate={cardData.Last_Date} link={cardData.Link} impNote={cardData.Important_Note} paid={cardData.Paid}
        rsvp_eventid={cardData.rsvp_eventid} handleRSVP={handleRSVP} liked_eventid={cardData.like_eventid} handleLike={handleLike} imgName={`${cardData.img_name ? "http://localhost:8080/eventImage/" + cardData.img_name : poster}`} />}
      {event_type === '2' && <SeminarDetails S_ID={cardData.ID} Name={cardData.Name} Date={cardData.Date} No={cardData.No_of_Speakers} Sponsors={cardData.Sponsors} Mode={cardData.Mode} lDate={cardData.Last_Date} Des={cardData.Des} paid={cardData.Paid} link={cardData.Link} rsvp_eventid={cardData.rsvp_eventid} liked_eventid={cardData.like_eventid} handleRSVP={handleRSVP} handleLike={handleLike} imgName={`${cardData.img_name ? "http://localhost:8080/eventImage/" + cardData.img_name : poster}`}/>}
      {event_type === '1' && <HackathonDetails H_ID={cardData.ID} Name={cardData.Name} Date={cardData.Date} Domain={cardData.Domain} Sponsors={cardData.Sponsors} Team={cardData.Team_Size} Price={cardData.Prize} Mode={cardData.Mode} lDate={cardData.Last_Date} Des={cardData.Des} paid={cardData.Paid} link={cardData.Link} rsvp_eventid={cardData.rsvp_eventid} handleRSVP={handleRSVP} liked_eventid={cardData.like_eventid} handleLike={handleLike} imgName={`${cardData.img_name ? "http://localhost:8080/eventImage/" + cardData.img_name : poster}`}/>}
      {event_type === '4' && <ConferenceDetails C_ID={cardData.ID} name={cardData.Name} date={cardData.Date} sponsors={cardData.Sponsors} mode={cardData.Mode} ldate={cardData.Last_Date} link={cardData.Link} type={cardData.Type} rsvp_eventid={cardData.rsvp_eventid} liked_eventid={cardData.like_eventid} handleRSVP={handleRSVP} handleLike={handleLike} imgName={`${cardData.img_name ? "http://localhost:8080/eventImage/" + cardData.img_name : poster}`} />}
      {/* // short circuit */}
    </>
  )
}
export default EventPage;

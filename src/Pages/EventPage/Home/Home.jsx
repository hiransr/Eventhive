import React, { useEffect, useState } from 'react'
import EventCards from '../../../Components/EventCards'
import poster from '../../../Assets/logo.png'
import PermanentDrawerLeft from '../../../Components/HomeDrawer'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { getEventData } from '../../../../Backend/Controller/event'
import { axiosGetAllEvent, axiosGetTrendingData, axiosGetPreviousData, axiosGetFilterData } from '../../../apis/endpoints'
const possiblePage = ["1", "2", "3", "4"]
const Home = () => {

  const [cardData, setCardData] = useState([])
  // const cardData = [{ heading: "Event 1", image: cardImg, desp: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae impedit consequuntur" }, { heading: "Event 2", image: cardImg, desp: " tenetur qui? At accusamus incidunt et temporibus illo sit corporis beatae consectetur, tempore veritatis est animi accusantium, quod excepturi!" }, { heading: "Event 3", image: cardImg, desp: " tenetur qui? At accusamus incidunt et temporibus illo sit corporis beatae consectetur, tempore veritatis est animi accusantium, quod excepturi!" }, { heading: "Event 4", image: cardImg, desp: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae impedit consequuntur" }, { heading: "Event 5", image: cardImg, desp: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae impedit consequuntur" }, { heading: "Event 6", image: cardImg, desp: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae impedit consequuntur" }]
  const { event_type } = useParams() //get routing name

  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState({})
  const onFieldChange = (e) => {
    setInputValue(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }
  const onFilterChange = async () => {
    const res = await axiosGetFilterData(event_type, inputValue.date)
    console.log(res)
    if (res.status == 200) {
      setCardData(res.data.events)
    }
  }
  async function getAllEvents() {
    console.log(event_type)
    const res = await axiosGetAllEvent(event_type)
    console.log(res)
    setCardData(res.data.events)
  }
  const getTrendingData = async () => {
    // console.log("hiiiiiiiii")
    const res = await axiosGetTrendingData(event_type)
    if (res.status === 200) {
      setCardData(res.data.events)
    }
  }
  const getPreviousData = async () => {
    // console.log("hiiiiiiiii")
    const res = await axiosGetPreviousData(event_type)
    if (res.status === 200) {
      setCardData(res.data.events)
    }
  }
  useEffect(() => {
    console.log(possiblePage.includes(event_type), event_type)
    if (!possiblePage.includes(event_type)) {
      navigate('/eventpage/3')
      return;
    }
    getAllEvents()
  }, [event_type])
  // console.log(event_type)
  return (
    <>
      <PermanentDrawerLeft handleTrending={getTrendingData} handlePrevious={getPreviousData} handleReset={getAllEvents} inputValue={inputValue} onFieldChange={onFieldChange} onFilterChange={onFilterChange} />
      {/* <h1>{event_type}</h1> */}
      <div className="flex mt-[80px] flex-row ... gap-6 flex-wrap pl-[270px]">{cardData.map((eachCard) => {
        return <EventCards eventHeading={eachCard.Name} eventDesp={eachCard.Des} navigateURL={`/eventdetails/${event_type}/${eachCard.Event_ID}`} imgName={`${eachCard.img_name ? "http://localhost:8080/eventImage/" + eachCard.img_name : poster}`}
        />
      })}</div>
    </>
  )
}

export default Home
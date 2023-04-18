const db = require('../Config/DB')
const { EVENTTYPE, EVENTNAME } = require('../Constants/role')
exports.getEventData = async (req, res) => {
  const connection = db.getConnection()
  try {
    const { event_type } = req.query
    console.log(req.query)
    const [events] = await connection.execute(
      `SELECT Name,Des,Event_ID,img_name from ${EVENTNAME[event_type]}_table where Date > CURDATE()`,
    )
    return res.send({ events })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}
exports.getEventDetails = async (req, res) => {
  const connection = db.getConnection()
  try {
    const { event_type, eventID } = req.query
    // if(event_type=='') return res.status(404).send("Invalid Page") //for valid page (4 page)
    let query = ''
    console.log(req.query, EVENTNAME[3], req.user.id)
    if (EVENTNAME[event_type] === 'WORKSHOP') {
      query = `SELECT ID,Name,Date,Duration,Sponsors,Mode,Last_Date,Link,Important_Note,Paid,rt.Event_ID as rsvp_eventid, lt.event_id as like_eventid,img_name from workshop_table as wt left join rsvp_table as rt on wt.event_id = rt.event_id and rt.auth_id = ? 
      left join like_table as lt on wt.event_id = lt.event_id and lt.auth_id=? 
      where wt.Event_ID = ? `
    } else if (EVENTNAME[event_type] === 'SEMINAR') {
      query = `SELECT ID,Name,Date,Sponsors,Mode,Last_Date,Link,Paid,No_of_Speakers,rt.Event_ID as rsvp_eventid, lt.event_id as like_eventid ,img_name from seminar_table as st left join rsvp_table as rt on st.event_id = rt.event_id and rt.auth_id = ?  left join like_table as lt on st.event_id = lt.event_id and lt.auth_id=? where st.Event_ID = ?`
    } else if (EVENTNAME[event_type] === 'HACKATHON') {
      query = `SELECT ID,Name,Date,Duration,Sponsors,Mode,Last_Date,Link,Paid,Prize,Team_Size,rt.Event_ID as rsvp_eventid, lt.event_id as like_eventid ,img_name from hackathon_table as ht left join rsvp_table as rt on ht.event_id = rt.event_id and rt.auth_id = ?  left join like_table as lt on ht.event_id = lt.event_id and lt.auth_id=? where ht.Event_ID = ?`
    } else if (EVENTNAME[event_type] === 'CONFERENCE') {
      query = `SELECT ID,Name,Date,Duration,Sponsors,Mode,Last_Date,Link,Paid,Type,rt.Event_ID as rsvp_eventid, lt.event_id as like_eventid,img_name from conference_table as ct left join rsvp_table as rt on ct.event_id = rt.event_id and rt.auth_id = ?  left join like_table as lt on ct.event_id = lt.event_id and lt.auth_id=? where ct.Event_ID = ?`
    }
    const [eventData] = await connection.execute(query, [
      req.user.id,
      req.user.id,
      eventID,
    ])
    console.log(eventData)
    return res.status(200).send({ eventData: eventData[0] })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}
exports.rsvpData = async (req, res) => {
  const connection = db.getConnection()
  const bodydata = req.body
  console.log(bodydata)
  try {
    const [
      data,
    ] = await connection.execute(
      'delete from rsvp_table where auth_id=? and event_id=?',
      [req.user.id, bodydata.event_id],
    )
    if (data.affectedRows === 1) {
      return res.send({ msg: 'Success' })
    }
    await connection.execute('insert into rsvp_table values (?,?,?)', [
      req.user.id,
      bodydata.event_id,
      bodydata.event_type,
    ])
    return res.send({ msg: 'Success' })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}
exports.likeData = async (req, res) => {
  const connection = db.getConnection()
  const bodydata = req.body
  console.log(bodydata)
  try {
    const [
      data,
    ] = await connection.execute(
      'delete from like_table where auth_id=? and event_id=?',
      [req.user.id, bodydata.event_id],
    )
    if (data.affectedRows === 1) {
      return res.send({ msg: 'Success' })
    }
    await connection.execute('insert into like_table values (?,?,?)', [
      req.user.id,
      bodydata.event_id,
      bodydata.event_type,
    ])
    return res.send({ msg: 'Success' })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}

exports.getTrendingData = async (req, res) => {
  const connection = db.getConnection()
  try {
    const { event_type } = req.query
    console.log(req.query)
    const [events] = await connection.execute(
      `SELECT Name,Des,et.Event_ID,et.img_name from ${EVENTNAME[event_type]}_table as et inner join like_table as lt on et.Event_id=lt.event_id group by lt.event_id having count(*)>0 order by count(*) desc`,
    )
    return res.send({ events })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}

exports.getPreviousData = async (req, res) => {
  const connection = db.getConnection()
  try {
    const { event_type } = req.query
    console.log(req.query)
    const [events] = await connection.execute(
      `SELECT Name,Des,et.Event_ID,et.img_name from ${EVENTNAME[event_type]}_table as et WHERE date < CURDATE()`,
    )
    return res.send({ events })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}
exports.getFilterData = async (req, res) => {
  const connection = db.getConnection()
  try {
    const { event_type } = req.query
    console.log(req.query)
    const [
      events,
    ] = await connection.execute(
      `SELECT Name,Des,Event_ID, img_name from ${EVENTNAME[event_type]}_table  WHERE date = ?`,
      [req.query.filterdate],
    )
    return res.send({ events })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}

const db = require('../Config/DB')
const { v4: UUID4 } = require('uuid')
const { EVENTTYPE } = require('../Constants/role')
exports.createEvent = async (req, res) => {
  const connection = db.getConnection()
  const data = req.body
  console.log(data)
  try {
    const eventID = UUID4()
    if (data.eventType == 'hackathon_table') {
      await connection.execute(
        `INSERT into hackathon_table (Event_ID,Name,Date,Domain,Duration,Team_Size,Paid,Sponsors,Mode,Prize,Link,Last_Date,Des,auth_id,event_type,img_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          eventID,
          data.name,
          data.date,
          data.domain,
          data.duration,
          data.teamsize,
          data.paid,
          data.sponsors,
          data.mode,
          data.price,
          data.link,
          data.ldate,
          data.des,
          req.user.id,
          EVENTTYPE['HACKATHON'],
          req.file.filename
        ],
      )
    } else if (data.eventType == 'workshop_table') {
      await connection.execute(
        `INSERT into workshop_table (Event_ID,Name,Date,Duration,Important_Note,Paid,Sponsors,Mode,Des,Link,Last_Date,event_type,auth_id,img_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          eventID,
          data.name,
          data.date,
          data.duration,
          data.impnote,
          data.paid,
          data.sponsors,
          data.mode,
          data.des,
          data.link,
          data.ldate,
          EVENTTYPE['WORKSHOP'],
          req.user.id,
          req.file.filename
        ],
      )
    } else if (data.eventType == 'seminar_table') {
      await connection.execute(
        `INSERT into seminar_table (Event_ID,Name,Date,Duration,Paid,Sponsors,Mode,Des,Link,Last_Date,No_of_Speakers,event_type,auth_id,img_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          eventID,
          data.name,
          data.date,
          data.duration,
          data.paid,
          data.sponsors,
          data.mode,
          data.des,
          data.link,
          data.ldate,
          data.noOfSpeaker,
          EVENTTYPE['SEMINAR'],
          req.user.id,
          req.file.filename
        ],
      )
    } else if (data.eventType == 'conference_table') {
      await connection.execute(
        `INSERT into conference_table (Event_ID,Name,Date,Duration,Paid,Sponsors,Mode,Des,Link,Last_Date,Type,event_type,auth_id,img_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          eventID,
          data.name,
          data.date,
          data.duration,
          data.paid,
          data.sponsors,
          data.mode,
          data.des,
          data.link,
          data.ldate,
          data.type,
          EVENTTYPE['CONFERENCE'],
          req.user.id,
          req.file.filename
        ],
      )
    }
    return res.send({
      msg: 'Event Successfully Created',
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}

exports.getMyEvents = async (req, res) => {
  const connection = db.getConnection()
  try {
    const [myEvents, _] = await connection.execute(
      `SELECT auth_id,event_type,name,Event_ID from hackathon_table where auth_id=? 
      union all
      SELECT auth_id,event_type,name,Event_ID from seminar_table where auth_id=? 
      union all
      SELECT auth_id,event_type,name,Event_ID from workshop_table where auth_id=? 
      union all
      SELECT auth_id,event_type,name,Event_ID from conference_table where auth_id=? `,
      [req.user.id, req.user.id, req.user.id, req.user.id],
    )
    return res.send({ events: myEvents })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}

exports.deleteEvent = async (req, res) => {
  const connection = db.getConnection()
  const data = req.query
  console.log(data)
  try {
    let query = ''
    if (+data.event_type === EVENTTYPE['HACKATHON']) {
      query = `delete from hackathon_table where Event_ID=?`
    } else if (+data.event_type === EVENTTYPE['WORKSHOP']) {
      query = `delete from workshop_table where Event_ID=?`
    } else if (+data.event_type === EVENTTYPE['SEMINAR']) {
      query = `delete from seminar_table where Event_ID=?`
    } else if (+data.event_type === EVENTTYPE['CONFERENCE']) {
      query = `delete from conference_table where Event_ID=?`
    }
    const [row, field] = await connection.execute(query, [data.event_id])
    // const [row, field] = await connection.execute(query, ['200'])
    console.log(row.affectedRows)
    return res.send({ msg: 'Success' })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}
exports.getRSVPData = async (req, res) => {
  const connection = db.getConnection()
  const data = req.query
  try {
    const [
      userData,
    ] = await connection.execute(
      `select name,username,org_name,phone from rsvp_table as rt inner join signup_table st on st.auth_id=rt.auth_id inner join user on user.auth_id=rt.auth_id where Event_ID=?`,
      [data.eventID],
    )
    return res.send({ userData })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}

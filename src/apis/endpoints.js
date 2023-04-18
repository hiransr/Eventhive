import { axiosClient } from '../config.axios'

const endpoint = {
  status: 'api/status',
  signup: `api/signup`,
  verifytotp: 'api/verifytotp',
  login: 'api/login',
  getCadmin: `api/admin/get-college-admin`,
  createEvent: `api/cadmin/create-new-event`,
  modifyCadmin: `api/admin/modify-college-admin`,
  myEvents: `api/cadmin/get-my-events`,
  verifyUser: `api/verifyuser`,
  rsvpData: `api/events/rsvp-data`,
  likeData: `api/events/like-data`,
  trendingData: (event_type) =>
    `api/events/get-trending-data?event_type=${event_type}`,
  previousData: (event_type) =>
    `api/events/get-previous-data?event_type=${event_type}`,
  filterData: (event_type, date) =>
    `api/events/get-filter-data?event_type=${event_type}&filterdate=${date}`,
  logout: `api/logout`,
  getRSVPData: (event_id) => `api/cadmin/get-rsvp-data?eventID=${event_id}`,
  deleteMyEvent: (event_type, event_ID) =>
    `api/cadmin/delete-my-event?event_type=${event_type}&event_id=${event_ID}`, //event_id to get in controller in res.query
  getAllEvents: (event_type) =>
    `api/events/get-event-all?event_type=${event_type}`,
  getDetails: (event_type, eventID) =>
    `api/events/get-event-detail?event_type=${event_type}&eventID=${eventID}`,
}

function returnResp(res) {
  return { status: res.status, data: res.data }
}

export async function axiosCheckStatus() {
  try {
    const res = await axiosClient.get(endpoint.status, {
      withCredentials: true,
    })
    console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}
export async function axiosGetAllEvent(event_type) {
  try {
    const res = await axiosClient.get(endpoint.getAllEvents(event_type), {
      withCredentials: true,
    })
    console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosGetEventDetails(event_type, eventID) {
  try {
    const res = await axiosClient.get(
      endpoint.getDetails(event_type, eventID),
      {
        withCredentials: true,
      },
    )
    console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosSingup(bodyData) {
  try {
    const res = await axiosClient.post(endpoint.signup, bodyData)
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosVerifytotp(bodyData) {
  try {
    const res = await axiosClient.post(endpoint.verifytotp, bodyData)
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosLogin(bodyData) {
  try {
    const res = await axiosClient.post(endpoint.login, bodyData, {
      withCredentials: true,
    })
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosgetCadmin(bodyData) {
  try {
    const res = await axiosClient.get(endpoint.getCadmin, bodyData, {
      withCredentials: true,
    })
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}
export async function axiosModifyCadmin(bodyData) {
  try {
    const res = await axiosClient.post(endpoint.modifyCadmin, bodyData)
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}
export async function axiosCreateNewEvent(bodyData) {
  try {
    const res = await axiosClient.post(endpoint.createEvent, bodyData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosVerifyUser(bodyData) {
  try {
    const res = await axiosClient.post(endpoint.verifyUser, bodyData, {
      withCredentials: true,
    })
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosGetMyEvents() {
  try {
    const res = await axiosClient.get(endpoint.myEvents, {
      withCredentials: true,
    })
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosDeleteMyEvent(event_type, event_id) {
  try {
    const res = await axiosClient.delete(
      endpoint.deleteMyEvent(event_type, event_id),
      {
        withCredentials: true,
      },
    )
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosRsvpData(bodyData) {
  try {
    const res = await axiosClient.post(endpoint.rsvpData, bodyData, {
      withCredentials: true,
    })
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}
export async function axiosLikeData(bodyData) {
  try {
    const res = await axiosClient.post(endpoint.likeData, bodyData, {
      withCredentials: true,
    })
    // console.log(res)
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosGetRSVPData(eventID) {
  try {
    const res = await axiosClient.get(endpoint.getRSVPData(eventID), {
      withCredentials: true,
    })
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}
export async function axiosGetTrendingData(event_type) {
  try {
    const res = await axiosClient.get(endpoint.trendingData(event_type), {
      withCredentials: true,
    })
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}
export async function axiosGetPreviousData(event_type) {
  try {
    const res = await axiosClient.get(endpoint.previousData(event_type), {
      withCredentials: true,
    })
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}
export async function axiosGetFilterData(event_type, date) {
  try {
    const res = await axiosClient.get(endpoint.filterData(event_type, date), {
      withCredentials: true,
    })
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

export async function axiosLogout() {
  try {
    const res = await axiosClient.get(endpoint.logout, {
      withCredentials: true,
    })
    return returnResp(res)
  } catch (errRes) {
    console.log(errRes)
    return returnResp(errRes.response)
  }
}

import React, { useState, useEffect } from 'react'
import ManageAdminNavbar from "../../../Components/ManageAdminNavbar"
import ExistingAdmins from './ExistingAdmins'
import RequestAdmin from './RequestAdmin'
import { axiosModifyCadmin, axiosgetCadmin } from '../../../apis/endpoints'
const Manage = () => {
  const [adminlist, setadminlist] = useState([])
  const existingAdmin = adminlist.filter(admin => admin.isVerified == 1)
  const requestedAdmin = adminlist.filter(admin => admin.isVerified == 0)
  const getCadmin = async () => {
    const res = await axiosgetCadmin()
    if (res.status == 200) {
      setadminlist(res.data.cadmin)
    }
  }
  const handleUpdate = async (auth_id, value) => {
    const res = await axiosModifyCadmin({ auth_id, value })
    if (res.status == 200) {
      setadminlist(prev => {
        return prev.map(admin => {
          if (admin.auth_id == auth_id) return { ...admin, isVerified: value }
          return admin
        })
      })
    }
  }
  useEffect(() => getCadmin, [])
  // const EA = [{ id: 'Admin ID', orgname: 'Organization_Nam', phno: "Contact Number" }, { id: 'Admin ID', orgname: 'Organization_Nam', phno: "Contact Number" }, { id: 'Admin ID', orgname: 'Organization_Nam', contact: "Contact Number" }]
  return (
    <div>
      <ManageAdminNavbar />
      <div className="flex flex-row gap-6">
        <div className=' mt-[100px] h-[600px] w-[600px] flex flex-col gap-6 shadow ml-[30px] overflow-auto' >
          <p className='pt-[10px] text-center font-serif font-bold text-xl hover:text-2xl'>EXISTING ADMINS</p>
          <div className=' flex flex-col gap-1 align-middle mx-[25px]'>
            {existingAdmin.map((eachAdmin) => {
              return <ExistingAdmins email={eachAdmin.username} org={eachAdmin.college_name} contact={eachAdmin.phone} onDelete={() => {
                handleUpdate(eachAdmin.auth_id, -1)
              }
              } />
            })}
          </div>
        </div>
        <div className=' mt-[100px] h-[600px] w-[800px] flex flex-col gap-6 shadow overflow-auto' >
          <p className='pt-[10px] text-center font-serif font-bold text-xl hover:text-2xl'>REQUESTS</p>
          <div className=' flex flex-col gap-1 align-middle mx-[25px]'>
            {requestedAdmin.map((eachAdmin) => {
              return <RequestAdmin email={eachAdmin.username} org={eachAdmin.college_name} contact={eachAdmin.phone} onApprove={() => {
                handleUpdate(eachAdmin.auth_id, 1)
              }} onReject={() => {
                handleUpdate(eachAdmin.auth_id, -1)
              }} />
            })}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Manage
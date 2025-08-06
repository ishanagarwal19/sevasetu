import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedSpeciality, setSelectedSpeciality] = useState('all')

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const locations = ['all', 'Noida', 'Ghaziabad', 'Greater Noida', 'Delhi', 'New Delhi']
  const specialities = ['all', 'Doctors', 'Veterinarian']

  const filteredDoctors = doctors
    .filter(doctor => selectedLocation === 'all' || doctor.location === selectedLocation)
    .filter(doctor => selectedSpeciality === 'all' || doctor.speciality === selectedSpeciality)

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-lg font-medium'>All Doctors</h1>
        <div className='flex gap-4'>
          <select 
            value={selectedSpeciality}
            onChange={(e) => setSelectedSpeciality(e.target.value)}
            className='border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary'
          >
            {specialities.map(speciality => (
              <option key={speciality} value={speciality}>
                {speciality === 'all' ? 'All Specialities' : speciality}
              </option>
            ))}
          </select>
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className='border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary'
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {filteredDoctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm capitalize'>{item.speciality}</p>
              <p className='text-[#5C5C5C] text-sm mt-1 capitalize'>{item.location}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const HospitalsList = () => {

  const { aToken, getAllHospitals, hospitals, changeHospitalAvailability } = useContext(AdminContext)
  const [selectedLocation, setSelectedLocation] = useState('all')

  useEffect(() => {
    if (aToken) {
      getAllHospitals()
    }
  }, [aToken])

  const locations = ['all', 'Noida', 'Ghaziabad', 'Greater Noida', 'Delhi', 'New Delhi']
  const filteredHospitals = selectedLocation === 'all' 
    ? hospitals 
    : hospitals.filter(hospital => hospital.location === selectedLocation)

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-lg font-medium'>All Hospitals</h1>
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
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {filteredHospitals.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm capitalize'>{item.speciality}</p>
              <p className='text-[#5C5C5C] text-sm mt-1 capitalize'>{item.location}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={() => changeHospitalAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HospitalsList 
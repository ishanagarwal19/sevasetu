import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [filterHospitals, setFilterHospitals] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors, hospitals } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
      setFilterHospitals(hospitals.filter(hosp => hosp.speciality === speciality))
    } else {
      setFilterDoc(doctors)
      setFilterHospitals(hospitals)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, hospitals, speciality])

  // Get unique specialities from both doctors and hospitals
  const allSpecialities = [...new Set([
    ...doctors.map(doc => doc.speciality),
    ...hospitals.map(hosp => hosp.speciality)
  ])].sort((a, b) => a.localeCompare(b))

  return (
    <div>
      <p className='text-gray-600'>Browse through doctors and hospitals by speciality.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'all' ? navigate('/doctors') : navigate('/doctors/all')} 
             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'all' ? 'bg-[#E2E5FF] text-black' : ''}`}>
            All
          </p>
          {allSpecialities.filter(spec => spec).map((spec) => (
            <p key={spec}
               onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)} 
               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-[#E2E5FF] text-black' : ''}`}>
              {spec}
            </p>
          ))}
        </div>
        <div className='w-full'>
          {/* Doctors Section */}
          {filterDoc.length > 0 && (
            <div className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>Doctors</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {filterDoc.map((item, index) => (
                  <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                       className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
                       key={index}>
                    <img className='bg-[#EAEFFF] w-full h-48 object-cover' src={item.image} alt="" />
                    <div className='p-4'>
                      <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                        <p>{item.available ? 'Available' : "Not Available"}</p>
                      </div>
                      <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                      <p className='text-[#5C5C5C] text-sm capitalize'>{item.speciality}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hospitals Section */}
          {filterHospitals.length > 0 && (
            <div>
              <h2 className='text-xl font-semibold mb-4'>Hospitals</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {filterHospitals.map((item, index) => (
                  <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                       className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
                       key={index}>
                    <img className='bg-[#EAEFFF] w-full h-48 object-cover' src={item.image} alt="" />
                    <div className='p-4'>
                      <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                        <p>{item.available ? 'Available' : "Not Available"}</p>
                      </div>
                      <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                      <p className='text-[#5C5C5C] text-sm capitalize'>{item.speciality}</p>
                      <p className='text-[#5C5C5C] text-sm capitalize mt-1'>{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
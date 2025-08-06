import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const AddHospital = () => {

    const [hospitalImg, setHospitalImg] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Home Nursing')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [location, setLocation] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)
    const navigate = useNavigate()

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!hospitalImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', hospitalImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
            formData.append('location', location)

            const { data } = await axios.post(backendUrl + '/api/admin/add-hospital', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setHospitalImg(null)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
                setLocation('')
                navigate('/hospital-list')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Hospital</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="hospital-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={hospitalImg ? URL.createObjectURL(hospitalImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setHospitalImg(e.target.files[0])} type="file" name="" id="hospital-img" hidden />
                    <p>Upload hospital <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Hospital Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Hospital Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Set Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Since</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-2 py-2' >
                                <option value="2024">2024</option>
                                <option value="2025">2023</option>
                                <option value="2026">2022</option>
                                <option value="2027">2021</option>
                                <option value="2028">2020</option>
                                <option value="2029">2019</option>
                                <option value="2030">2018</option>
                                <option value="2031">2017</option>
                                <option value="2032">2016</option>
                                <option value="2033">2015</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Hospital fees' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Location</p>
                            <select onChange={(e) => setLocation(e.target.value)} value={location} className='border rounded px-2 py-2' >
                                <option value="">Select Location</option>
                                <option value="Noida">Noida</option>
                                <option value="Ghaziabad">Ghaziabad</option>
                                <option value="Greater Noida">Greater Noida</option>
                                <option value="Delhi">Delhi</option>
                                <option value="New Delhi">New Delhi</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-2 py-2'>
                                <option value="Home Nursing">Home Nursing</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>License Number</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='License Number' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
                        </div>
                    </div>
                </div>

                <div>
                    <p className='mt-4 mb-2'>About Hospital</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' rows={5} placeholder='write about hospital'></textarea>
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add hospital</button>
            </div>
        </form>
    )
}

export default AddHospital 
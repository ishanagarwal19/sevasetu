import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import hospitalModel from "../models/hospitalModel.js";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";

// API for hospital Login 
const loginHospital = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hospital = await hospitalModel.findOne({ email });

        if (!hospital) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, hospital.password);

        if (isMatch) {
            const token = jwt.sign({ id: hospital._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all hospitals list for Frontend
const hospitalList = async (req, res) => {
    try {
        const hospitals = await hospitalModel.find({}).select([
            'name',
            'image',
            'speciality',
            'location',
            'available',
            'address',
            'contact',
            'facilities',
            'about',
            'established',
            'license'
        ]);
        res.json({ success: true, hospitals });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to change hospital availability for Admin and Hospital Panel
const changeAvailability = async (req, res) => {
    try {
        const { hospitalId } = req.body;
        const hospitalData = await hospitalModel.findById(hospitalId);
        await hospitalModel.findByIdAndUpdate(hospitalId, { available: !hospitalData.available });
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get hospital profile for Hospital Panel
const hospitalProfile = async (req, res) => {
    try {
        const { hospitalId } = req.body;
        const profileData = await hospitalModel.findById(hospitalId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update hospital profile data from Hospital Panel
const updateHospitalProfile = async (req, res) => {
    try {
        const { hospitalId, address, available, contact, facilities, speciality } = req.body;
        await hospitalModel.findByIdAndUpdate(hospitalId, { 
            address, 
            available, 
            contact,
            facilities,
            speciality
        });
        res.json({ success: true, message: 'Profile Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to add new hospital (Admin only)
const addHospital = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality, // Default value
            license = "",
            established = "",
            about,
            address,
            contact = "",
            facilities = [],
            location
        } = req.body;
        const imageFile = req.file;

        // Check only required fields
        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!about) missingFields.push('about');
        if (!address) missingFields.push('address');
        if (!imageFile) missingFields.push('image');
        if (!speciality) missingFields.push('speciality');
        if (!location) missingFields.push('location');
        if (missingFields.length > 0) {
            return res.json({ 
                success: false, 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const existingHospital = await hospitalModel.findOne({ email });
        if (existingHospital) {
            return res.json({ success: false, message: "Hospital with this email already exists" });
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Parse JSON strings if they are strings
        let parsedAddress = address;
        let parsedFacilities = facilities;
        
        try {
            if (typeof address === 'string') {
                parsedAddress = JSON.parse(address);
            }
            if (typeof facilities === 'string') {
                parsedFacilities = JSON.parse(facilities);
            }
        } catch (parseError) {
            return res.json({ 
                success: false, 
                message: "Invalid JSON format for address or facilities" 
            });
        }

        const hospitalData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            license,
            established,
            about,
            address: parsedAddress,
            contact,
            facilities: parsedFacilities,
            location,
            date: Date.now()
        };

        console.log('Hospital Data being sent to database:', JSON.stringify(hospitalData, null, 2));

        const newHospital = new hospitalModel(hospitalData);
        const savedHospital = await newHospital.save();
        console.log('Hospital saved to database:', JSON.stringify(savedHospital.toObject(), null, 2));
        res.json({ success: true, message: "Hospital added successfully" });
    } catch (error) {
        res.json({ 
            success: false, 
            message: error.message || "An error occurred while adding the hospital" 
        });
    }
};

export {
    loginHospital,
    hospitalList,
    changeAvailability,
    hospitalProfile,
    updateHospitalProfile,
    addHospital
}; 
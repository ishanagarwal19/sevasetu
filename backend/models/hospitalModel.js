import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true }, // Made optional with default value
    license: { type: String, default: "" }, // Made optional
    established: { type: String, default: "" }, // Made optional
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    address: { type: Object, required: true },
    contact: { type: String, default: "" }, // Made optional
    facilities: { type: [String], default: [] }, // Made optional with default empty array
    date: { type: Number, required: true },
    location: {
        type: String,
        required: true,
        enum: ['Noida', 'Ghaziabad', 'Greater Noida', 'Delhi', 'New Delhi']
    }
}, { minimize: false })

const hospitalModel = mongoose.models.hospital || mongoose.model("hospital", hospitalSchema);
export default hospitalModel; 
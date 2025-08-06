import express from "express";
import {
    loginHospital,
    hospitalList,
    changeAvailability,
    hospitalProfile,
    updateHospitalProfile,
    addHospital
} from "../controllers/hospitalController.js";

const router = express.Router();

router.post("/login", loginHospital);
router.get("/list", hospitalList);
router.post("/change-availability", changeAvailability);
router.post("/profile", hospitalProfile);
router.post("/update-profile", updateHospitalProfile);
router.post("/add", addHospital);

export default router; 
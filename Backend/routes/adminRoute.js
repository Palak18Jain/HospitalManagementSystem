import express from 'express'
import { addDoctors, changeAvailability } from '../controllers/doctorController.js'

import upload from '../middlewares/multer.js'
import { loginAdmin, allDoctors, appoinmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'




const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctors)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appoinments', authAdmin, appoinmentsAdmin)
adminRouter.post('/cancel-appoinment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)


export default adminRouter
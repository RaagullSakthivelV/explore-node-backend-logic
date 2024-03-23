import express from 'express'
import {getSuggestedChargeStations} from './controller.js'
export const router = express.Router()
router.use(express.json())

//routes
router.post('/getSuggestedChargeStations',getSuggestedChargeStations)
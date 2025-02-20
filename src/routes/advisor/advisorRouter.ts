import { Router } from 'express';
import {uploadProfile} from '../../middleware/multer';
import { container } from 'tsyringe';
import { IAdvisorController } from '../../controllers/Interface/advisor/IAdvisorController';

const advisorController = container.resolve<IAdvisorController>('IAdvisorController');
const router = Router()


router.post('/upload', uploadProfile.single('profilePic'), (req, res) =>{advisorController.uploadProfileImage(req, res)})
router.patch('/editProfile', (req, res) =>advisorController.updateUser(req, res))
router.post('/createSlot',(req,res)=>advisorController.createSlot(req,res))
router.get('/fetchSlots',(req,res)=>advisorController.fetchSlots(req,res))
router.patch('/updateSlot/:slotId',(req,res)=>advisorController.updateSlot(req,res))
router.delete('/deleteSlot/:slotId',(req,res)=>advisorController.deleteSlot(req,res))
router.get('/fetchSlotsAdvisor/:advisorId',(req,res)=>advisorController.getBookedSlotsForAdvisor(req,res))


export default router
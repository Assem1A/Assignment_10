import { Router } from 'express'
import {  login, signup, verifyEmail } from './auth.service.js';
import { auth } from '../../middleware/auth.middleware.js';
const router = Router(); 
router.post("/signup", async (req, res, next) => {
    const result = await signup(req.body)
    return res.status(201).json({ message: "Done signup", result })
})

router.post("/login", async (req, res, next) => {
    const result = await login(req.body)
    return res.status(200).json({ message: "Done login", result })
})
router.post('/verify-email', async (req, res, next) => {
 
    const result=verifyEmail(req.body)
    return res.status(201).json({msg:"email verified",result})
}

)


export default router
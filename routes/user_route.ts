import express from 'express'
import { register, login, current } from '../controllers/user_controller'
import { validateToken } from '../middleware/validate_token'

const router = express.Router()

// add product
router.post('/register', register)

router.post('/login', login)

// validate token to this request
router.get('/current', validateToken, current)

export default router
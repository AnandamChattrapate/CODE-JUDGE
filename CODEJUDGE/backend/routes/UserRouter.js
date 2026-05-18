import exp from 'express'
import {register,login} from '../controllers/UserController.js'

export const UserRouter = exp.Router();
UserRouter.post('/register',register)
UserRouter.post('/login',login)
// UserRouter.use('/me',profile)




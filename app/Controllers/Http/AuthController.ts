import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
    public async register({request,response, auth}:HttpContextContract){
        try {
            const validateData = await request.validate(RegisterValidator)
            const user = await User.create({
                ...validateData,
                role: 'user'
            })
            const token = await auth.login(user)
            return response.status(201).json({
                token
            })
        } catch (error) {
            return response.status(500).json({
                message : error
            })
        }
    }

    public async login({request,response,auth}:HttpContextContract){
        const { email, password } = request.all()
        try {
            const token = await auth.attempt(email,password)
            return response.status(200).json({
                token
            })
        } catch (error) {
            return response.status(500).json({
                message : error
            })
        }
    }
}

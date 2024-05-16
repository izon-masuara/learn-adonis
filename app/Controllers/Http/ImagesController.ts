import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ImagesController {
    public async show({ params,response }:HttpContextContract){
        try {
            const content = await Drive.exists(params.name)
            if(!content){
                throw {
                    "Name": "NOT_FOUND",
                    "Message": "Image Not Found."
                }
            }
            const steramImage = await Drive.getStream(params.name)
            return response.status(200).stream(steramImage)
        } catch (error) {
            return error
        }
    }
}

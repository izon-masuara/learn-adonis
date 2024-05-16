import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Donation from 'App/Models/Donation'
import CreateOrUpdateDonationValidator from 'App/Validators/CreateOrUpdateDonationValidator'
import Drive from '@ioc:Adonis/Core/Drive'

export default class DonationsController {
  public async index({ response }: HttpContextContract) {
    try {
      const donations = await Donation.all()
      return response.status(200).json({
        donations,
      })
    } catch (error) {
      return response.status(500).json({
        message: error,
      })
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const validateData = await request.validate(CreateOrUpdateDonationValidator)

      const currentTime = Date.now().toString()
      const fileName = `${currentTime}_${validateData.image.clientName}`
      await validateData.image.move('tmp/uploads/', {
        name: fileName,
      })

      await Donation.create({
        ...validateData,
        status: 'pending',
        image: fileName,
        user_id: auth.user?.id,
      })

      return response.status(201).json({
        message: 'Donation created successfully.',
      })
    } catch (error) {
      return response.status(500).json({
        message: error,
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const donation = await Donation.findByOrFail('id', params.id)
      return response.status(200).json({
        donation,
      })
    } catch (error) {
      return response.status(500).json({
        message: error,
      })
    }
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    try {
      const donation = await Donation.findByOrFail('id', params.id)
      const image_url = donation.image
      if (auth.user?.id !== donation.user_id) {
        return response.status(401).json({
          message: 'UNATHORIZED',
        })
      }
      const validateData = await request.validate(CreateOrUpdateDonationValidator)

      const currentTime = Date.now().toString()
      const fileName = `${currentTime}_${validateData.image.clientName}`
      await validateData.image.move('tmp/uploads/', {
        name: fileName,
      })

      const isMerge = donation.merge({
        ...validateData,
        image: fileName,
      })

      if (isMerge) {
        await Drive.delete(image_url)
      }

      await donation.save()

      return response.status(201).json({
        message: 'Donation updated successfully.',
      })
    } catch (error) {
      return response.status(500).json({
        message: error,
      })
    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    try {
      const donation = await Donation.findByOrFail('id', params.id)
      if (auth.user?.id !== donation.user_id) {
        return response.status(401).json({
          message: 'UNATHORIZED',
        })
      }
      donation.delete()
      Drive.delete(donation.image)
      return response.status(204)
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      })
    }
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import DonationFactory from 'Database/factories/DonationFactory'

export default class extends BaseSeeder {
  public async run () {
    await DonationFactory.createMany(20)
  }
}

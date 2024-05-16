import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        email: 'user1@example.com',
        username: 'user1',
        address: '123 Main St, Anytown',
        phone: '123-456-7890',
        role: 'user',
        password: 'password'
      },
      {
        email: 'user2@example.com',
        username: 'user2',
        address: '456 Elm St, Anytown',
        phone: '456-789-0123',
        role: 'user',
        password: 'password'
      }
    ])
  }
}

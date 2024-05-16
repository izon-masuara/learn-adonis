import DonationFactory from 'App/Models/Donation'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

export default Factory.define(DonationFactory, ({ faker }) => {
  const treeRequired = Math.floor(Math.random() * 1000)
  const collectedTrees = Math.floor(Math.random() * treeRequired)
  const dateLine = DateTime.now().plus({ months: 4 + Math.floor(Math.random() * 9) })
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    blog: faker.lorem.paragraph({ min:6, max:20 }),
    status: 'pending',
    location: faker.location.country(),
    date_line: dateLine,
    collected_trees: collectedTrees,
    tree_required: treeRequired + 30,
    image: '1715241523538_image1.png',
    user_id: 1
  }
}).build()

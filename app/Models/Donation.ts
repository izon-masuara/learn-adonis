import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Donation extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public blog: string

  @column()
  public status: string

  @column()
  public location: string

  @column.dateTime()
  public date_line: DateTime

  @column()
  public collected_trees: number

  @column()
  public tree_required: number

  @column()
  public image: string

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

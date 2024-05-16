import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title',100).notNullable()
      table.text('description').notNullable()
      table.text('blog').notNullable()
      table.string('location').notNullable()
      table.enum('status',['finished','pending']).notNullable()
      table.date('date_line').notNullable()
      table.string('collected_trees').notNullable()
      table.string('tree_required').notNullable()
      table.string('image',255).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

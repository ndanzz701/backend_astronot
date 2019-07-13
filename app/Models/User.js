'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get hidden () {
    return ['password']
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  // crosswords () {
  //   return this.belongsToMany('App/Models/Crossword')
  //              .pivotTable('user_crossword')
  //              .withTimestamps()
  //              .withPivot(['is_finished'])
  // }

  // answers () {
  //   return this.belongsToMany('App/Models/Answer')
  //              .pivotTable('user_answer')
  //              .withTimestamps()
  //              .with(['answer'])
  // }
}

module.exports = User

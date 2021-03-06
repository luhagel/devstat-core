import mongoose, { Schema } from 'mongoose'

import Member from '../member/model' // eslint-disable-line no-unused-vars

const teamSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  members: {
    type: Schema.ObjectId,
    ref: 'Member'
  }
}, {
  timestamps: true
})

teamSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Team', teamSchema)

export const schema = model.schema
export default model

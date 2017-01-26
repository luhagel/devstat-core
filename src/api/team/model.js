import mongoose, { Schema } from 'mongoose'

const teamSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
  members: {
    type: String
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
      updatedAt: this.updatedAt,
      members: this.members
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

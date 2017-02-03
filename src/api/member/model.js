import mongoose, { Schema } from 'mongoose'

const memberSchema = new Schema({
  name: {
    type: String
  }
}, {
  timestamps: true
})

memberSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
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

const model = mongoose.model('Member', memberSchema)

export const schema = model.schema
export default model

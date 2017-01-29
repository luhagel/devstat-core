import mongoose, { Schema } from 'mongoose'

const dataSourceSchema = new Schema({
  type: {
    type: String,
    lowercase: true,
    trim: true
  },
  data: {
    type: Object
  }
}, {
  timestamps: true
})

dataSourceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      type: this.type,
      data: this.data,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('DataSource', dataSourceSchema)

export const schema = model.schema
export default model

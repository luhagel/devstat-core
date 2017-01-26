import mongoose, { Schema } from 'mongoose'

const githubAccountSchema = new Schema({
  login: {
    type: String
  },
  commits: {
    type: String
  }
}, {
  timestamps: true
})

githubAccountSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      login: this.login,
      commits: this.commits,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('GithubAccount', githubAccountSchema)

export const schema = model.schema
export default model

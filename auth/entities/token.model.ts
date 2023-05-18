import { Schema, model } from 'mongoose'

const tokenSchema = new Schema({
    isActivated: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true}
})

export default model('Token', tokenSchema)
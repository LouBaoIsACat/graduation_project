import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    star: {
        type:Array
    },
    recommend: {
        type: Array
    }
})

export default mongoose.model('User', UserSchema)
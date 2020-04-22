import mongoose from 'mongoose'
const Schema = mongoose.Schema
const WangyouSchema = new Schema({
    bookId: {
        type: String,
        unique: true,
        require: true
    },
    insertTime: {
        type: Date,
        require: true
    }
})

export default mongoose.model('Wangyou', WangyouSchema)
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const QuanbuSchema = new Schema({
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

export default mongoose.model('Quanbu', QuanbuSchema)
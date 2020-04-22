import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ChapterSchema = new Schema({
    bookId: {
        type: String,
        unique: true,
        require: true
    },
    chapterId: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    insertTime: {
        type: Date,
        require: true
    }
})

export default mongoose.model('Chapter', ChapterSchema)
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const BookSchema = new Schema({
    bookId: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        require: true
    },
    intro: {
        type: String,
        require: true
    },
    type_: {
        type: String,
        require: true
    },
    finish: {
        type: Number,
        require: true
    },
    click: {
        type: Number,
        require: true
    },
    star: {
        type: Number,
        require: true
    },
    recommend: {
        type: Number,
        require: true
    },
    insertTime: {
        type: Date,
        require:true
    }
})

export default mongoose.model('Book', BookSchema)
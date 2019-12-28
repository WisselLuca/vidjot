const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const IdeaSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    detail:{
        type: String,
        required: true
    },
    data:{
        type:Date,
        default: Date.now
    }
});
mongoose.model('ideas', IdeaSchema);



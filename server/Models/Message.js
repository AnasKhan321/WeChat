const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const MessageSchema = mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true, 
      },
  message   : {
    type : String,
    required : true
  },
  groupid : {
    type : String , 
    default : null 
  },
  user : {
    type : String , 
    default : null
  },
  
  created_at: {
    type: Date,
    default: Date.now,
  }
  
  
});
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message; 
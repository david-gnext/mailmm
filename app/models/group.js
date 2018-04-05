var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
   name : String,
   customers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}],
   users: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Group', groupSchema);

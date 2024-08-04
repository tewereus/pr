const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var addressSchema = new mongoose.Schema({
        country: { 
        type: String,
        required: true,
      },
      region: { // like Addis ababa
        type: String,
        required: true
      },
      location: { // like Yeka, Bole
        type: String,
        required: true
      },
});

//Export the model
module.exports = mongoose.model('Address', addressSchema);
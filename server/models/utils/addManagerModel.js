const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var addManagerSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: [true, "mobile is required"],
        unique: [true, "mobile number already registered"],
        validate: {
          validator: function (v) {
            return /^\d{9}$/.test(v); // Validate that mobile contains exactly 9 digits
          },
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
      },
      email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already registered"],
        validate: {
          validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // Validate that the email follows a specific format
          },
          message: (props) => `please input a valid email address`,
        },
      },
      managerMessageToken: String,
      managerMessageExpires: Date,
});

addManagerSchema.methods.createManagerMessageToken = async function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.managerMessageToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    this.managerMessageExpires = new Date();
    this.managerMessageExpires.setMinutes(
      this.managerMessageExpires.getMinutes() + 60
    );
    return token;
  };
  

//Export the model
module.exports = mongoose.model('AddManager', addManagerSchema);
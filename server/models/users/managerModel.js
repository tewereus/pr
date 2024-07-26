const { Schema, model } = require('mongoose')

const managerSchema = new Schema({
    unique_id: String,
    fullname: {
        type: String,
        // required: [true, "full name is required"],
        set: (v) => v.trim().replace(/\s+/g, " "),
      },
    email: {
        type: String,
        required: true
    },
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
    password: {
        type: String,
        // required: true,
        select: false
    },
    role: {
        type: String,
        default: 'seller'
    },
    status: { // this is for the managers to make it inactive incase of an emergency
        type: String,
        required: true,
        enum: ["active", "inactive"],
        default: 'inactive'
    },
    main_status: { // this is for the admin to make them active after verifying the manager info 
        type: String,
        require: true,
        enum: ["active", "inactive", "unavailable"], // unavailable if the manager is not working anymore(change/ fired/ retired)
        default: "inactive"
    },
    payment: {
        type: String,
        default: 'inactive'
    },
    method: {
        type: String,
        // required: true,
    },
    image: {
        type: String,
        default: ''
    },
    shopInfo: {
        type: Object,
        default: {}
    },
}, { timestamps: true })

managerSchema.methods.createManagerToken = async function () {
    const token = crypto.randomBytes(5).toString("hex");
    this.unique_id = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    return token;
  };

module.exports = model('Manager', managerSchema)
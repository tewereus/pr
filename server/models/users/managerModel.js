const { Schema, model } = require('mongoose')

const managerSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "full name is required"],
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
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'seller'
    },
    status: {
        type: String,
        default: 'pending'
    },
    payment: {
        type: String,
        default: 'inactive'
    },
    method: {
        type: String,
        required: true,
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

module.exports = model('Manager', managerSchema)
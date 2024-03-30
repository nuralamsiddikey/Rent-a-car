import mongoose, { mongo } from "mongoose";



const reserveSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pickupDateTime: {
    type: Date,
    required: true,
  },
  dropDateTime: {
    type: Date,
    required: true,
  },
  discount: Number,
  additionalCharge: Number,
  vehicleId: {
    type: String,
    required: true,
  },
  collisionDamageWaiver: {
    type: Boolean,
    default: false,
  },
  liabilityInsurance: {
    type: Boolean,
    default: false,
  },
  rentTax: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});


const Reserve = mongoose.model('Reserve',reserveSchema)

export default Reserve
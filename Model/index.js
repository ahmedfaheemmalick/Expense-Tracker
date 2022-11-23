import mongoose from "mongoose"

const ExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided."],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount must be provided."],
  },
  createdDate: {
    type: String,
    default: new Date().getDate(),
  },
  createdMonth: {
    type: String,
    default: new Date().getMonth(),
  },
  createdYear: {
    type: String,
    default: new Date().getFullYear(),
  },
})

export default mongoose.model("Expense", ExpenseSchema)

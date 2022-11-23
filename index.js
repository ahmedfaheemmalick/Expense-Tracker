import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import Expense from "./Model/index.js"

dotenv.config()
const app = express()

app.use(express.static("./client/build"), cors(), express.json())

app.get("/api/expenses", async (req, res) => {
  try {
    const { month, year } = req.query

    const expenses = await Expense.find({
      createdMonth: month,
      createdYear: year,
    })

    return res.status(200).json(expenses)
  } catch (error) {
    return res.status(400).json(new Error(error))
  }
})

app.get("/api/expense/:id", async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id })
    if (expense) {
      return res.status(200).json(expense)
    } else {
      let error = new Error("Expense not found with given Id.")
      error.statusCode = 400
      throw error
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

app.post("/api/expense", async (req, res) => {
  try {
    if (req.headers.authorization === process.env.PASSWORD) {
      const expense = await Expense.create({ ...req.body })

      return res
        .status(200)
        .json({ msg: "Expense added successfully.", data: expense })
    } else {
      let error = new Error("Please enter correct passowrd.")
      error.statusCode = 400
      throw error
    }
  } catch (error) {
    return res.status(400).json(new Error(error))
  }
})

app.patch("/api/expense/:id", async (req, res) => {
  try {
    if (req.headers.authorization === process.env.PASSWORD) {
      const expense = await Expense.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })

      res
        .status(200)
        .json({ msg: "Expense updated successfully.", data: expense })
    } else {
      let error = new Error("Please enter correct passowrd.")
      error.statusCode = 400
      throw error
    }
  } catch (error) {
    return res.status(400).json(new Error(error))
  }
})

app.delete("/api/expense/:id", async (req, res) => {
  try {
    if (req.headers.authorization === process.env.PASSWORD) {
      await Expense.findOneAndDelete(req.params.id)
      return res.status(200).json({ msg: "Expense deleted successfully." })
    } else {
      let error = new Error("Please enter correct passowrd.")
      error.statusCode = 400
      throw error
    }
  } catch (error) {
    return res.status(400).json(new Error(error))
  }
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT || 4000))

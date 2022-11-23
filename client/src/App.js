import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Expenses from "./Pages/Expenses/Expenses"
import AddExpense from "./Pages/AddExpense/AddExpense"
import UpdateExpense from "./Pages/UpdateExpense/UpdateExpense"

const App = () => {
  return (
    <div className="bg-slate-300 w-screen min-h-screen h-full flex flex-col items-center">
      <BrowserRouter>
        <Link className="text-4xl font-normal text-center pt-10" to="/">
          Expense Tracker
        </Link>
        <Routes>
          <Route path="/" element={<Expenses />} />
          <Route path="/expense" element={<AddExpense />} />
          <Route path="/expense/:id" element={<UpdateExpense />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Expense from "../../Components/Expense/Expense"
import next from "../../Images/next.png"
import previous from "../../Images/previous.png"
import months from "../../constant"

const Expenses = () => {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [isLoading, setIsLoading] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [msg, setMsg] = useState({
    success: "",
    error: "",
  })

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    fetch(`/api/expenses?month=${month}&year=${year}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setIsLoading(false)
          setExpenses(data)
        }
      })
  }, [month, year])

  const handlePrevious = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNext = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className="flex flex-col items-center my-4 sm:w-11/12 md:w-4/12 lg:w-5/12">
      {isLoading ? (
        <div className="flex items-center justify-center my-10">
          <span className="animate-ping absolute inline-flex h-11 w-11 rounded-full bg-black"></span>
          <span className="relative inline-flex rounded-full h-10 w-10 bg-black"></span>
        </div>
      ) : (
        <div className="max-h-[var(--expenses-container-height)] overflow-scroll mb-6">
          <div
            className="text-3xl md:text-4xl font-normal text-center pt-10"
            to="/"
          >
            Expenses for: {months[month]} - {year}
          </div>
          {expenses.map((expense) => (
            <Expense
              key={expense._id}
              expense={expense}
              setMsg={setMsg}
              setExpenses={setExpenses}
            />
          ))}
        </div>
      )}
      <Link
        className="border-2 border-black rounded-lg rounded-lg py-1 px-20 text-xl font-semibold"
        to="/expense"
      >
        Add Expense
      </Link>
      {msg.error && (
        <p className="text-red-900 text-xl text-center">{msg.error}</p>
      )}
      {msg.success && (
        <p className="text-green-900 text-xl text-center">{msg.success}</p>
      )}
      <div className="flex justify-between w-full mt-6">
        <button
          disabled={month === 11 && year === 2022}
          className="flex items-center justify-center border-2 border-black rounded-lg rounded-lg py-1 px-2 text-md font-semibold disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={handlePrevious}
        >
          <img className="w-5 mr-3" src={previous} alt="previous" />
          previous Month
        </button>
        <button
          disabled={
            month === new Date().getMonth() && year === new Date().getFullYear()
          }
          className="flex items-center justify-center border-2 border-black rounded-lg rounded-lg py-1 px-2 text-md font-semibold disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={handleNext}
        >
          Next Month
          <img className="w-5 ml-3" src={next} alt="next" />
        </button>
      </div>
    </div>
  )
}

export default Expenses

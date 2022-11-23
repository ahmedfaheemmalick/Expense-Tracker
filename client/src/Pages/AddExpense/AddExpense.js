import { useState } from "react"

const AddExpenses = () => {
  const [msg, setMsg] = useState({
    success: "",
    error: "",
  })
  const [expense, setExpense] = useState({
    name: "",
    password: "",
    amount: 0,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, amount } = expense

    fetch("http://localhost:4000/api/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: expense.password,
      },
      body: JSON.stringify({
        name,
        amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMsg({ success: data.msg })
        setExpense({
          name: "",
          password: "",
          amount: 0,
        })
      })
      .catch((err) => setMsg({ error: err.msg }))
  }

  return (
    <form className="w-11/12 md:w-2/6	lg:w-1/4 my-4" onSubmit={handleSubmit}>
      <div className="my-3">
        <label className="w-full text-xl">Expense Name: </label>
        <br />
        <input
          className="w-full h-10 border-2 border-black rounded-lg px-2 outline-none"
          type="text"
          placeholder="Expense Name"
          value={expense.name}
          onChange={(e) =>
            setExpense((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
      </div>
      <div className="my-3">
        <label className="w-full text-xl">Expense Amount: </label>
        <br />
        <input
          className="w-full h-10 border-2 border-black rounded-lg px-2 outline-none"
          type="number"
          placeholder="Expense Amount"
          value={expense.amount}
          onChange={(e) =>
            setExpense((prevState) => ({
              ...prevState,
              amount: e.target.value,
            }))
          }
        />
      </div>
      <div className="my-3">
        <label className="w-full text-xl">Expense Password: </label>
        <br />
        <input
          className="w-full h-10 border-2 border-black rounded-lg px-2 outline-none"
          type="password"
          placeholder="Expense Password"
          value={expense.password}
          onChange={(e) =>
            setExpense((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex justify-center w-full mt-6">
        <button className="w-full border-2 border-black rounded-lg py-1 px-20 text-xl font-semibold text-center">
          Add Expense
        </button>
      </div>
      {msg.error && (
        <p className="text-red-900 text-xl text-center">{msg.error}</p>
      )}
      {msg.success && (
        <p className="text-green-900 text-xl text-center">{msg.success}</p>
      )}
    </form>
  )
}

export default AddExpenses

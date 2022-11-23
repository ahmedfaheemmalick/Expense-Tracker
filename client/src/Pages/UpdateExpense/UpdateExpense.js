import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateExpense = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState({
    success: "",
    error: "",
  })
  const [expense, setExpense] = useState({
    name: "",
    passowrd: "",
    amount: 0,
  })

  useEffect(() => {
    let isMounted = true

    if (id) {
      setIsLoading(true)

      fetch(`/api/expense/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: expense.password,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            setIsLoading(false)
            setExpense(data)
          }
        })
        .catch((err) => {
          setIsLoading(false)
          setMsg({ error: err.msg })
        })
    }

    return () => {
      isMounted = false
    }

    // eslint-disable-next-line
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    fetch(`/api/expense/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: expense.password,
      },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)
        navigate.push("/")
        setMsg({ success: data.msg })
      })
      .catch((err) => {
        setIsLoading(false)
        setMsg({ error: err.msg })
      })
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center my-10">
          <span className="animate-ping absolute inline-flex h-11 w-11 rounded-full bg-black"></span>
          <span className="relative inline-flex rounded-full h-10 w-10 bg-black"></span>
        </div>
      ) : (
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
          <div className="flex justify-center">
            <button className="border-2 border-black rounded-lg rounded-lg py-1 px-20 text-xl font-semibold text-center">
              {id ? "Edit Expense" : "Add Expense"}
            </button>
          </div>
          {msg.error && (
            <p className="text-red-900 text-xl text-center">{msg.error}</p>
          )}
          {msg.success && (
            <p className="text-green-900 text-xl text-center">{msg.success}</p>
          )}
        </form>
      )}
    </>
  )
}

export default UpdateExpense

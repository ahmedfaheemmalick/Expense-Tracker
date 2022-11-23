import { useState } from "react"
import { Link } from "react-router-dom"
import edit from "../../Images/edit.svg"
import trash from "../../Images/trash.svg"
import ConfirmModal from "../confirmModal/ConfirmModal"

const Expense = ({ expense, setExpenses, setMsg }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div
      key={expense._id}
      className="flex justify-between w-full my-2 px-2 border-2 border-black rounded-lg"
    >
      <ConfirmModal
        id={expense._id}
        showModal={showModal}
        setShowModal={setShowModal}
        setMsg={setMsg}
        setExpenses={setExpenses}
      />
      <div>
        <p className="text-xl font-normal tracking-wide">{expense.name}</p>
        <p className="text-xl font-normal tracking-wide">
          Rs. {expense.amount}
        </p>
        <p className="text-xl font-normal tracking-wide">
          {expense.createdDate}/{expense.createdMonth}/{expense.createdYear}
        </p>
      </div>
      <div className="flex flex-col justify-around">
        <Link
          to={`/expense/${expense._id}`}
          className="w-6 mx-2 cursor-pointer"
        >
          <img src={edit} alt="Edit Expense" />
        </Link>
        <button
          className="w-6 mx-2 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img src={trash} alt="Delete Expense" />
        </button>
      </div>
    </div>
  )
}

export default Expense

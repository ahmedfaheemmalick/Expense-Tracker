import { useState } from "react"

const ConfirmModal = ({ id, showModal, setShowModal, setExpenses, setMsg }) => {
  const [password, setPassword] = useState("")

  const handleClick = () => {
    fetch(`http://localhost:4000/api/expense/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: password,
      },
    })
      .then((res) => {
        setShowModal(false)
        setExpenses((prevState) =>
          prevState.filter((expense) => expense._id !== id)
        )
        setPassword("")
        setMsg({ success: res.data.msg })
      })
      .catch((err) => setMsg({ error: err.msg }))
  }

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`${
        showModal
          ? "overflow-y-auto overflow-x-hidden absolute right-0 left-0 mr-auto ml-auto sm:w-11/12 md:w-1/3 z-50 p-4 h-modal md:h-ful"
          : "hidden"
      }`}
    >
      <div className="relative w-full max-w-md h-full md:h-auto">
        <div className="relative rounded-lg shadow bg-slate-300 border-2 border-black rounded-lg">
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 w-14 h-14 bg-slate-300 dark:text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="my-3">
              <label className="w-full text-xl">Password: </label>
              <br />
              <input
                className="w-full h-10 border-2 border-black rounded-lg px-2 outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="text-black font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 border-2 border-black"
              onClick={() => {
                setPassword("")
                setShowModal(false)
              }}
            >
              Cancel
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="text-black font-medium text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 border-2 border-black rounded-lg"
              onClick={handleClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

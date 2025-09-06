import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const togglefinished = () => {
    setshowfinished(!showfinished)
  }

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(todostring)
      settodos(todos)
    }
  }, [])

  const handleFaRegEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => item.id !== id)
    settodos(newtodos)
    savetols()
  }

  const handledelete = (e, id) => {
    let newtodos = todos.filter(item => item.id !== id)
    settodos(newtodos)
    savetols()
  }

  const handleadd = () => {
    if (todo.length !== 0) {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      settodo("")
      savetols()
    }
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.id
    let index = todos.findIndex(item => item.id === id)
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    savetols()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-3xl">iTask - Manage Your To-Dos At One Place</h1>

        {/* Add Todo */}
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a To-Do</h2>
          <div className="flex">
            <input
              onChange={handlechange}
              value={todo}
              type="text"
              className="bg-white w-full border-black rounded-lg px-5 py-1"
            />
            <button
              onClick={handleadd}
              disabled={todo.length <= 2}
              className="bg-violet-700 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-2 text-sm font-bold mx-2 rounded-md text-white"
            >
              Save
            </button>
          </div>
        </div>

        {/* Toggle Finished */}
        <div className="flex items-center gap-2 my-3">
          <input id="show" onChange={togglefinished} type="checkbox" checked={showfinished} />
          <label className="mx-2" htmlFor="show">Show Finished Tasks</label>
        </div>
        <hr className="border-black opacity-95 w-[90%] mx-auto my-2" />

        {/* Todos List */}
        <h2 className="text-2xl font-bold">Your To-Dos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No To-Dos to Display</div>}
          {todos.map(item => (
            (showfinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex my-3 justify-between items-center"
              >
                <div className="flex gap-5 items-center">
                  <input
                    onChange={handlecheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    id={item.id}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-2">
                  <button
                    onClick={(e) => handleFaRegEdit(e, item.id)}
                    className="bg-violet-700 hover:bg-violet-950 p-2 text-white rounded-md flex items-center justify-center"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={(e) => handledelete(e, item.id)}
                    className="bg-violet-700 hover:bg-violet-950 p-2 text-white rounded-md flex items-center justify-center"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}

export default App

import { useState, useEffect} from "react"
import Header from "./Compoents/Header";
import Tasks from "./Compoents/Tasks";
import AddTask from "./Compoents/AddTask";


function App() {
    const [showAddTask, setshowAddTask] = useState(false)
  
    const [tasks, setTasks] = useState([])

    useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }
     
      getTasks()
    }, [])

    // Fetch tasks

    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data
    }

     // Fetch tasks

     const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
    }

    // Delete Task
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'DELETE'
      })
      setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle reminder

    const reminderTask = async (id) => {
      const taskToToggler = await fetchTask(id)
      const updTask = {...taskToToggler, reminder: !taskToToggler.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json'

      },
      body: JSON.stringify(updTask)
    })

      const data = await res.json()

      
      setTasks(
        tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task
        )
        )
      }
    // Add new task form
    const addTask = async (task) => {
      const res = await fetch(`http://localhost:5000/tasks`,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const data = await res.json()
      setTasks([...tasks, data])
      
    }

    // Toggle Add task form

    const toggleAddTask = (click) => {
      setshowAddTask(!showAddTask);
    }
    
  return (
    <div className="container">
    
    <Header title="Task Tracker" 
     onToggleForm={toggleAddTask}
     showAdd={showAddTask}/>
    {showAddTask && <AddTask onAdd={addTask}/>}
    {tasks.length > 0 ? 
    <Tasks tasks={tasks} 
    onDelete={deleteTask} 
    onToggle={reminderTask}
    /> 
    : 'No tasks'}
    
    </div> 
  )
    }

export default App;

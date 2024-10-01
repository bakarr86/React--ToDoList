import { useState,useReducer} from 'react'
//import reactLogo from './assets/react.svg'    //premade logo for react and vite
//import viteLogo from '/vite.svg'
import './App.css'
//reducer function
const todoReducer=(state,action) => {
  switch (action.type){
    case 'ADD_TODO':
      return[action.payload,...state];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
      case 'TOGGLE_TODO':
        return state.map(todo => todo.id === action.payload ? { ...todo, completed:!todo.completed } : todo)
        case 'EDIT_TODO':
          return state.map(todo => todo.id === action.payload.id ? { ...todo, title: action.payload.title} : todo)
  default:
    return state

  }
}
function App() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [newTodo, setNewTodo] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const [editText, setEditText] = useState('')

  const addTodo = () => {
    if(newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        title: newTodo,
        completed: false,
      };
      dispatch({ type: 'ADD_TODO', payload: newTodoItem})
      setNewTodo('')
    }
  }


  //delete a todo
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id})
  }

  //toggle complete status
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id})
  }

  //EDITING TO DO
  const editTodo = (todo) => {
 setEditingTodo(todo)
 setEditText(todo.title)
  }

  //save edited todo
  const saveTodo = (id) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, title: editText}})
    setEditingTodo(null)
    setEditText('')
  }
  return (
    <>
      <div>
     <input type="text" 
     value={newTodo}
     onChange={(e)=> setNewTodo(e.target.value)}
     placeholder='add a new todo'
     />
     <button onClick={addTodo}>add</button>
      </div>
   

   <ul>
    {
      todos.map(todo =>(
        <li key={todo.id}>
          {editingTodo && editingTodo.id=== todo.id ? (
            <>
           <input type="text" 
          value={editText}
          onChange={(e)=> setEditText(e.target.value)}
          placeholder='add a new todo'
          />
        <button onClick={()=>saveTodo(todo.id)}>save</button>
            </>
          ) :(
            <>
            <input type="checkBox" 
           checked={todo.completed}
           onChange={()=> toggleTodo(todo.id)}
           />
           <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            {todo.title}
           </span>
         <button onClick={()=>editTodo(todo)}>edit</button>
         <button onClick={()=>deleteTodo(todo.id)} disabled={!todo.completed}>delete</button>
             </>

          )}
          </li>
      ))
    }
   </ul>
    </>
  )
}

export default App

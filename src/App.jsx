import { useState } from 'react'
import "./App.css";
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade X no sistema",
      category: "trabalhar",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar react",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Asc")

  const addTodo = ({ text, category }) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      }, // <-- Fix: Use a comma to separate array elements
    ];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const fileteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(fileteredTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos);
  }


  return (
    <div className='app'>
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
      <div className='todo-list'>
        {todos
          .filter(todo => 
            filter === "All" 
              ? true 
              : filter === "Completed" 
                ? todo.isCompleted 
                : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLocaleLowerCase())
          )
          .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text):  b.text.localeCompare(a.text))
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
  

}

export default App

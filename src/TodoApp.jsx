import { useState } from "react";

const TodoApp = () => {
  const [todo, setTodo] = useState({ text: "", isCompleted: false });
  const [todos, setTodos] = useState([]);

  const newTodo = (e) => {
    e.preventDefault();
    setTodo({ text: e.target.value, isCompleted: false });
  };
  const handleNewTodo = (e) => {
    e.preventDefault();
    if (todo.text.trim() === "") {
      return false;
    }
    setTodos([...todos, todo]);
    setTodo({ text: "", isCompleted: false });
  };
  const changeComplete = (index) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.text === todos[index].text) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };
  const markAll = () => {
    const allCompleted = todos.every((todo) => todo.isCompleted);
    const update = todos.map((todo) => ({
      ...todo,
      isCompleted: !allCompleted,
    }));

    setTodos(update);
  };
  const handleDeleting = (index) => {
    setTodos((oldValues) =>
      oldValues.filter((todo) => todo.text !== todos[index].text)
    );
  };
  const getLength = () => {
    let length = todos.length;
    todos.forEach((todo) => {
      if (todo.isCompleted) {
        length--;
      }
    });
    return length;
  };
  const getAll = () => {
    return setTodos(todos);
  };
  const getActiveTodos = () => {
    return todos.filter((todo) => !todo.isCompleted);
  };
  const getCompleted = () => {
    return todos.filter((todo) => todo.isCompleted);
  };
  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(updatedTodos);
  };

  return (
    <section className="main">
      <div className="todoapp">
        <h1>todos</h1>
        <form onSubmit={handleNewTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={todo.text}
            onChange={newTodo}
          />
        </form>
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" onClick={() => markAll()}>
            Mark all as complete
          </label>
          <ul className="todo-list">
            {todos.map((todo, i) => {
              return (
                <li key={i} className={todo.isCompleted ? "completed" : ""}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => changeComplete(i)}
                    />
                    <label>{todo.text}</label>
                    <button
                      className="destroy"
                      onClick={() => handleDeleting(i)}
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{getLength()}</strong>&nbsp; items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected" onClick={getAll}>
                All
              </a>
            </li>
            <li>
              <a href="#/" onClick={getActiveTodos}>
                Active
              </a>
            </li>
            <li>
              <a href="#/" onClick={getCompleted}>
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </div>
      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </section>
  );
};
export default TodoApp;

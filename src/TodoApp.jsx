import { useState } from "react";

const TodoApp = () => {
  const [todo, setTodo] = useState({ text: "", isCompleted: false });
  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState("active");

  const filteredTodos = () => {
    if (filterType === "all") {
      return todos;
    } else if (filterType === "completed") {
      return todos.filter((todo) => todo.isCompleted);
    } else if (filterType === "active") {
      return todos.filter((todo) => !todo.isCompleted);
    }
  };
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

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
          {todos.length > 0 ? (
            <>
              <input className="toggle-all" type="checkbox" />
              <label htmlFor="toggle-all" onClick={() => markAll()}>
                Mark all as complete
              </label>
            </>
          ) : null}

          <ul className="todo-list">
            {filteredTodos().map((todo, i) => {
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
        </section>{" "}
        {todos.length > 0 ? (
          <>
            <footer className="footer">
              <span className="todo-count">
                <strong>{getLength()}</strong>&nbsp; items left
              </span>

              <ul className="filters">
                <li>
                  <a
                    href="#/"
                    className={filterType === "all" ? "selected" : ""}
                    onClick={() => {
                      handleFilterChange("all");
                    }}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    href="#/"
                    className={filterType === "active" ? "selected" : ""}
                    onClick={() => {
                      handleFilterChange("active");
                    }}
                  >
                    Active
                  </a>
                </li>
                <li>
                  <a
                    href="#/"
                    className={filterType === "completed" ? "selected" : ""}
                    onClick={() => {
                      handleFilterChange("completed");
                    }}
                  >
                    Completed
                  </a>
                </li>
              </ul>

              <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
              </button>
            </footer>
          </>
        ) : null}
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

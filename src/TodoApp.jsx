import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const TodoApp = () => {
  let userID = 1;
  const [todo, setTodo] = useState({
    text: "",
    isCompleted: false,
    userId: userID,
  });
  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState("active");
  function handleEdit(userId, newText) {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex((todo) => todo.userId === userId);
    if (index !== -1) {
      updatedTodos[index].text = newText;
      setTodos(updatedTodos);
    }
  }

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
    setTodo({
      text: e.target.value,
      isCompleted: false,
      userId: uuidv4(),
    });
  };

  const handleNewTodo = (e) => {
    console.log(userID);
    e.preventDefault();
    if (todo.text.trim() === "") {
      return false;
    }
    setTodos([...todos, todo]);
    setTodo({
      text: "",
      isCompleted: false,
      userId: "",
    });
  };
  const changeComplete = (userId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.userId === userId) {
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
  const handleDeleting = (userId) => {
    setTodos((oldValues) => oldValues.filter((todo) => todo.userId !== userId));
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
            {filteredTodos().map((todo) => {
              return (
                <li
                  key={todo.userId}
                  className={todo.isCompleted ? "completed" : ""}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => changeComplete(todo.userId)}
                    />

                    <label
                      onClick={(e) => {
                        e.target.contentEditable = true;
                      }}
                      onBlur={(e) => {
                        e.target.contentEditable = false;
                        handleEdit(todo.userId, e.target.innerText);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.target.blur();
                        }
                      }}
                    >
                      {todo.text}
                    </label>
                    <button
                      className="destroy"
                      onClick={() => handleDeleting(todo.userId)}
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
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

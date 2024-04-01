import { useState } from "react";
import FooterTodo from "./FooterTodo";

const TodoApp = () => {
  const [todo, setTodo] = useState({ text: "", isCompleted: false });
  const [todos, setTodos] = useState([]);

  const newTodo = (e) => {
    e.preventDefault();
    setTodo({ text: e.target.value, isCompleted: false });
  };
  const handleNewTodo = () => {
    if (todo.text === "") {
      return false;
    }
    setTodos([...todos, todo]);
    console.log(todos);
    setTodo({ text: "", isCompleted: false });
  };
  const changeComplete = () => {
    console.log("deneme");
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
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            <li className="completed">
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  onChange={changeComplete}
                />
                <label>Learn JavaScript</label>
                <button className="destroy"></button>
              </div>
            </li>
            <li>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  onChange={changeComplete}
                />
                <label>Learn React</label>
                <button className="destroy"></button>
              </div>
            </li>
            <li>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  onChange={changeComplete}
                />
                <label>Have a life!</label>
                <button className="destroy"></button>
              </div>
            </li>
            {todos.map((todo, i) => {
              //   if (todo.isCompleted) {
              //     return (
              //       <li key={i} className="completed">
              //         <div className="view">
              //           <input
              //             className="toggle"
              //             type="checkbox"
              //             onChange={changeComplete}
              //           />
              //           <label>{todo.text}</label>
              //           <button className="destroy"></button>
              //         </div>
              //       </li>
              //     );
              //   } else {
              return (
                <li key={i}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      onChange={changeComplete}
                    />
                    <label>{todo.text}</label>
                    <button className="destroy"></button>
                  </div>
                </li>
              );
              //   }
            })}
          </ul>
        </section>

        <FooterTodo />
      </div>
    </section>
  );
};
export default TodoApp;

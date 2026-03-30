"use client";

import {
  useState,
  useReducer,
  useContext,
  createContext,
  useEffect,
} from "react";

const AppContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState("Guest");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("dark");
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState("en");

  /* LocalStorage (Persist user) */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        password,
        setPassword,
        theme,
        toggleTheme,
        count,
        setCount,
        todos,
        setTodos,
        isLoggedIn,
        login,
        logout,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function ContextChild() {
  const {
    user,
    setUser,
    password,
    setPassword,
    theme,
    toggleTheme,
    count,
    setCount,
    todos,
    setTodos,
    isLoggedIn,
    login,
    logout,
    language,
    setLanguage,
  } = useContext(AppContext);

  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [task, setTask] = useState("");

  /* User */
  const handleUser = () => {
    if (inputName.trim()) {
      setUser(inputName);
      setInputName("");
    }
  };

  /* Password */
  const handlePassword = () => {
    if (inputPassword.trim()) {
      setPassword(inputPassword);
      setInputPassword("");
    }
  };

  /* Todo */
  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  return (
    <div>
      {/* USER */}
      <h3>User</h3>
      <p>User: {user}</p>
      <input
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleUser}>Change User</button>

      {/* PASSWORD */}
      <h3>Password</h3>
      <p>Password: {password}</p>
      <input
        type="password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handlePassword}>Change Password</button>

      {/* THEME */}
      <h3>Theme</h3>
      <p>{theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>

      {/* COUNTER */}
      <h3>Counter</h3>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>

      {/* LOGIN */}
      <h3>Auth</h3>
      <p>{isLoggedIn ? "Logged In" : "Logged Out"}</p>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      {/* LANGUAGE */}
      <h3>Language</h3>
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ta">Tamil</option>
      </select>
      <p>{language === "en" ? "Hello" : "வணக்கம்"}</p>

      {/* TODO */}
      <h3>Todo</h3>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}


export default function StateDemoPage() {
  return (
    <ContextProvider>
      <div style={container}>
        <h1>State Management Full Demo</h1>
        <ContextChild />
      </div>
    </ContextProvider>
  );
}


const container = {
  padding: "20px",
  background: "#0f172a",
  color: "white",
  minHeight: "100vh",
};
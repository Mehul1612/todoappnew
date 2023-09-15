import { BrowserRouter as Router, Route,Routes} from "react-router-dom"
import './App.css';
import ListTodo from "./components/ListTodo";
import CreateTodo from "./components/CreateTodo";
import DeleteTodo from "./components/DeleteTodo";
import AuthContext from "./Context/TodoContext";

import { createContext, useContext, useState } from 'react';
import { ToastContainer } from "react-toastify";

function App() {
  const [authstatus, setauthstatus] = useState(null);

  return (
    <div className="App">
    <AuthContext.Provider value={{ valueNew: authstatus, setValue: setauthstatus }}>
    <Router>
    <Routes>
    <Route path="/" element={<ListTodo />} />
    <Route path="/add-todo" element={<CreateTodo />} />
    <Route path="/delete-todo" element={<DeleteTodo />} />
   
    </Routes>
    </Router>
    </AuthContext.Provider>
    <ToastContainer />
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//components & pages
import { Navbar } from "./components/Navbar";
import { TodoList } from "./pages/TodoList"
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { useAuthContextProvider } from "./hooks/useAuthContextProvider";

function App() {
  const { user } = useAuthContextProvider()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index element={user ? <TodoList/> : <Navigate to='/login'/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to='/'/>}/>
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to='/'/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

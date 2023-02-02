import "./App.css";
import Headers from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList/TodoList";

function App() {
  return (
    <div className="App">
      <Headers />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;

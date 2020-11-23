import logo from './logo.svg';
import './App.css';
import Task from './components/Task';
import AddTask from './components/AddTask';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Task />
        <AddTask />
      </header>
    </div>
  );
}

export default App;
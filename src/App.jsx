import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignetDashboard from "./pages/Dashboard";

function App() {
  const [count, setCount] = useState(0)

    return (
        <div className="App">
            <SignetDashboard />
        </div>
    );
}

export default App

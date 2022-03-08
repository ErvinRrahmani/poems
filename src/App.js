import React from 'react';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Home from "./containers/Home/Home";
import {toast} from "react-toastify";

toast.configure();

function App() {

    return (
        <div className="App">
            <Home/>
        </div>
    );
}

export default App
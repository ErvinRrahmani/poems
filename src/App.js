import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar";

toast.configure();
function App(){


    return (
        <div>
        <Navbar />
        </div>
    );
}

export default App
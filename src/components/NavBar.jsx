import React from "react";
import { Link } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

let NavBar = ({children}) =>{
   return(
    <div>
    <header>
        <nav className="navbar navbar-light bg-primary">
            <div className="container">
                <Link className="navbar-brand text-white" to="/">Pos System</Link>
            </div>
        </nav>
    </header>
    <main>
        <div className="container mt-3">
            {children}
        </div>
        <ToastContainer />
    </main>
</div>
   )
}
export default NavBar;
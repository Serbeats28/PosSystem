import React from "react";
import {Link} from "react-router-dom"
import NavBar from "../components/NavBar";

let Home = () => {
    return (
        <NavBar>
            <div className="rounded-3 bg-light p-5 mt-4">
                        <h1>Welcome to the simple POS for small business</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>If you have an issue, call 444-123-xxxx anytime.</p>
                        <Link to={'/pos'} className="btn btn-primary">Click here to sell products</Link>
             </div>
        </NavBar>
    )
}
export default Home;
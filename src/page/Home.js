import React from "react";
import {Link} from "react-router-dom"

export default function Home(props) {
    return(
        <div>
            <Link to ="/">Home page</Link>
            <Link to ="/register">Click me</Link>
        </div>
    )
}
import * as React from "react";
import "./App.css";
import { Link } from "react-router-dom";

class PageNav extends React.Component {
    public render() {
        return (
            <nav>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>

                    <hr/>

                </div>
            </nav>
        );
    }
}

export default PageNav;

import * as React from "react";
import About from "../app/about/About";
import Home from "../Home";
import { Route } from "react-router-dom";

class PageContent extends React.Component {
    public render() {
        return (
            <main>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </main>
        );
    }
}

export default PageContent;

import * as React from "react";
import "./App.css";

import PageContent from "./layout/PageContent";
import PageFooter from "./layout/PageFooter";
import PageHeader from "./layout/PageHeader";
import PageNav from "./layout/PageNav";
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
    public render() {
        return (
            <Router>
                <div className="app">
                    <PageHeader/>
                    <div className="nav-and-content">
                        <PageNav/>
                        <PageContent/>
                    </div>
                    <PageFooter/>
                </div>
            </Router>
        );
    }
}

export default App;

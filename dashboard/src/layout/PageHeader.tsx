import * as React from "react";

import logo from "../logo/white-on-transparent.png";

class PageHeader extends React.Component {
    public render() {
        return (
            <header>
                <img src={logo} alt="Clustero"/>
            </header>
        );
    }
}

export default PageHeader;

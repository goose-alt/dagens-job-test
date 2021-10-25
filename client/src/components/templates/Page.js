import React from "react";

export default class Page extends React.Component {
    render() {
        const {
            children,
        } = this.props;

        return (
            <div class="app">
                { children }
            </div>
        )
    }
}
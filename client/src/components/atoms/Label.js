import React from "react";

export default class Label extends React.Component {
    render() {
        const {
            label,
            children,
        } = this.props;

        return (
            <label>
                { label }: 
                { children }
            </label>
        )
    }
}
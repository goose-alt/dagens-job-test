import React from "react";

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onChange) this.props.onChange({
      value: event.target.value,
      name: event.target.name,
    });
  }

  render() {
    const {
        name,
        value
    } = this.props;

    return (
      <input
        type="text"
        name={ name }
        value={ value }
        onChange={ this.handleChange }
      />
    );
  }
}
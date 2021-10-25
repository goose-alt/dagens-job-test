import React from "react";

export default class SelectInput extends React.Component {
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
        value,
        values,
    } = this.props;

    return (
      <select
        name={ name }
        value={ value }
        onChange={ this.handleChange }
      >
        { values.map(x => <option value={ x } key={ x }>{ x }</option>) }
      </select>
    );
  }
}
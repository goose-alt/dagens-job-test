import React from "react";
import Label from "../atoms/Label";
import NumberInput from "../atoms/NumberInput";

export default class NumberInputWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onChange) this.props.onChange(event);
  }

  render() {
    const {
      name,
      value,
      label,
    } = this.props;

    return (
      <Label label={ label }>
        <NumberInput
          name={ name }
          value={ value }
          onChange={ this.handleChange }
        />
      </Label>
    )
  }
}
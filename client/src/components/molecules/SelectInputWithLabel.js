import React from "react";
import Label from "../atoms/Label";
import SelectInput from "../atoms/SelectInput";

export default class SelectInputWithLabel extends React.Component {
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
      values,
      label,
    } = this.props;

    return (
      <Label label={ label }>
        <SelectInput
          name={ name }
          value={ value }
          values={ values }
          onChange={ this.handleChange }
        />
      </Label>
    )
  }
}
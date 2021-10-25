import React from "react";
import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";

export default class TextInputWithLabel extends React.Component {
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
        <TextInput
          name={ name }
          value={ value }
          onChange={ this.handleChange }
        />
      </Label>
    )
  }
}
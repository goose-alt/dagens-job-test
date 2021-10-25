import React from 'react';
import TextInputWithLabel from '../molecules/TextInputWithLabel';
import NumberInputWithLabel from '../molecules/NumberInputWithLabel';
import SelectInputWithLabel from '../molecules/SelectInputWithLabel';

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      price: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event; 

    this.setState({
      [name]: value,
    });
  }
  
  handleSubmit(event) {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        name: this.state.name,
        category: this.state.category,
        price: this.state.price,
      });
    }
    
    event.preventDefault();
  }

  render() {
    const {
      categories
    } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextInputWithLabel
            name="name"
            label="Name"
            value={ this.state.name }
            onChange={ this.handleChange }
          /><br />
          
          <SelectInputWithLabel
            name="category"
            label="Category"
            value={ this.state.category }
            values={ categories }
            onChange={ this.handleChange }
          /><br />
          
          <NumberInputWithLabel
            name="price"
            label="Price"
            value={ this.state.price }
            onChange={ this.handleChange }
          /><br />
          
          <input
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

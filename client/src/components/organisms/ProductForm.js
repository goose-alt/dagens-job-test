import React from 'react';
import axios from 'axios';
import TextInputWithLabel from '../molecules/TextInputWithLabel';
import NumberInputWithLabel from '../molecules/NumberInputWithLabel';

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
      [name]: value
    });
  }

  handleSubmit(event) {
    axios.post('http://localhost:3001/products', this.state)
        .then((res) => {
            console.log(res);
            alert("Added product");
        }).catch((e) => {
            console.error(e);
            alert("Adding of product failed");
        })
    
    event.preventDefault();
  }

  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
              <TextInputWithLabel
                name="name"
                label="Name"
                value={ this.state.name }
                onChange={ this.handleChange }
              /><br />
              
              <TextInputWithLabel
                name="category"
                label="Category"
                value={ this.state.category }
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

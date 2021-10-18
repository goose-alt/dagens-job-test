import React from 'react';
import axios from 'axios';

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
    const { target } = event;
    const { name, value } = target; 

    this.setState({
      [name]: value
    });
  }

  // TODO: Extract to client
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
                <label> {/* TODO: Extract this */}
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </label><br />

                <label> {/* TODO: Extract this */}
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                    />
                </label><br />

                <label> {/* TODO: Extract this */}
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                    />
                </label><br />
                <input
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    );
  }
}

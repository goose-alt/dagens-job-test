import Page from '../templates/Page';
import ProductForm from '../organisms/ProductForm';
import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      categories: [],
      data: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Retrieve data
    this.getCategories();
  }

  handleSubmit(data) {
    axios.post('http://localhost:3001/products', data)
      .then((res) => {
        console.log(res);
        alert("Added product");
      }).catch((e) => {
        console.error(e);
        alert("Adding of product failed");
      });
  }

  getCategories() {
    this.setState({ loading: true });

    axios.get('http://localhost:3001/categories')
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
          categories: res.data.categories,
        });
      }).catch((e) => {
        console.error(e);
        alert("Retrieval of categories failed");
      });
  }

  render() {
    let component;

    // Only show the form, if all the necessary data has been retrieved
    if (this.state.loading) {
      component = <p>Loading data, please wait</p>;
    } else {
      component = (
        <ProductForm
          categories={ this.state.categories }
          onSubmit={ this.handleSubmit }
        />
      );
    }

    return (
      <Page>
        { component }
      </Page>
    );
  }
}
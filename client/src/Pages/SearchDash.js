import React, { Component } from "react";
import Container from "../components/Container";
import DogCards from "../components/DogCards/DogCards";
import SearchForm from "../components/SearchForm/SearchForm";

class SearchDash extends Component {
  state = {
    test1: "One",
    test2: "Two",
    selectedOption: ""
  };

  componentDidMount() {}

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  };

  handleSelect = value => {
    console.log(value);
  };

  render() {
    return (
      <Container>
        <SearchForm />
        <DogCards dogs={this.state.dogs} />
      </Container>
    );
  }
}

export default SearchDash;

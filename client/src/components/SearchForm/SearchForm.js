import React from "react";
import "./SearchForm.css";
import { render } from "react-dom";
import Downshift from "downshift";
import API from "../../utils/API";
import DogCards from "../DogCards/DogCards";

export default class SearchForm extends React.Component {
  state = {
    items: [],
    dogs: [],
    results: []
  };

  componentDidMount() {
    API.getDogs()
      .then(response => {
        this.setState({ dogs: response.data });
        let states = this.state.dogs
          .map(dog => {
            return dog.state;
          })
          .filter((val, ix, arr) => {
            return arr.indexOf(val) === ix;
          })
          .map(state => {
            return { state: state };
          });
        this.setState({ items: states });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSelection(selectedVal) {
    let results = this.state.dogs.filter(dog => {
      return dog.state.toLowerCase() === selectedVal.state.toLowerCase();
    });
    this.setState({ results: results });
  }

  onInputValueChange = (inputValue, stateAndHelpers) => {
    const visibleItems = this.state.items.filter(i => i.state.toLowerCase().includes(inputValue.toLowerCase()));
    const item = visibleItems.find(i => i.state.toLowerCase().includes(inputValue.toLowerCase()));
    const index = visibleItems.indexOf(item);
    stateAndHelpers.setHighlightedIndex(index);
  }

  render() {
    return (
      <div className="searchDiv">
        <Downshift
          onChange={selection => this.handleSelection(selection)}
          itemToString={item => (item ? item.state : "")}
          onInputValueChange={this.onInputValueChange}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
            <div>
              <label className="stateLabel" {...getLabelProps()}>
                Enter a state
              </label>
              <br />
              <input className="stateInput" {...getInputProps()} />
              <ul className="options" {...getMenuProps()}>
                {isOpen
                  ? this.state.items
                      .filter(
                        item => !inputValue || item.state.toLowerCase().includes(inputValue.toLowerCase())
                      )
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.state,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? "whitesmoke"
                                  : "white",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal"
                            }
                          })}
                        >
                          {item.state}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>

        <div className="dogContainer">
          {this.state.results.map((results, i) => (
            <DogCards
              key={i}
              id={results.id}
              pet_name={results.pet_name}
              breed={results.breed}
              city={results.city}
              imgurl={results.imgurl}
            />
          ))}
        </div>
      </div>
    );
  }
}

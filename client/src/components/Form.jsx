import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      zipcode: 1,
      options: ['Select', 'Forest', 'Land', 'Climate', 'Earth']
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log('STATE BEFORE SENDING ', this.state);
    this.props.addInfo(this.state);
  }

  handleSelect(evt) {
    console.log(evt.target.value);
    let selectedCategory = evt.target.value;
    this.state.category = selectedCategory;
    this.setState(
      Object.assign({}, this.state, { category: selectedCategory })
    );
    console.log(this.state);
  }
  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(Object.assign({}, this.state, newState));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Category
        <select onChange = {this.handleSelect}>
          {this.state.options.map(option =>
            <option key={option}>{option}</option>
          )}
        </select>
        </label>
        <label> Location
          <input
            name="zipcode"
            value={this.state.zipcode}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" />
      </form>);
  }
}

export default Form;

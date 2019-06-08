import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      zipcode: 1
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
    this.setState({
      category: selectedCategory
    });
    console.log(this.state);
  }
  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <label> Category
        <select onChange = {this.handleSelect}>
          <option>Forest</option>
          <option>Land</option>
          <option>Climate</option>
          <option>Earth</option>
        </select>
        </label>
        <label> Zipcode
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

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
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addZip(this.state);
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
          <input
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          />
        </label>
        <label> Zipcode
          <input
            category="zipcode"
            value={this.state.zipcode}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" />
      </form>);
  }
}

export default Form;

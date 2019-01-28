import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addGrocery(this.state);
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
        <label> Name
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label> Quantity
          <input
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" />
      </form>);
  }
}

export default Form;

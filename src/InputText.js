import React, { Component } from 'react';

class InputText extends Component {
  constructor(props) {
    super(props);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleInputText(e.target.value)
  }

  render() {
    return(
      <div className='InputText'>
        <textarea maxLength='3000' onChange={this.handleChange}></textarea>
        <span>{this.props.length}/3000</span>
      </div>
    )
  }
}

export default InputText;
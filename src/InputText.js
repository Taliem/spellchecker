import React, { Component } from 'react';
import './css/InputText.css';

class InputText extends Component {
  constructor(props) {
    super(props);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onInputText(e.target.value)
  }

  render() {
    return(
        <textarea 
          className='input__textarea' maxLength='3000'
          placeholder='Введите текст для проверки' 
          spellcheck='false'
          onChange={this.handleChange}></textarea>
    )
  }
}

export default InputText;
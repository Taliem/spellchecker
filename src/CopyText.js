import React, { Component } from 'react';

class CopyText extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.copy = this.copy.bind(this);
  }

  handleClick() {
    let text = '';
    
    if (this.props.textArrToCopy === null)
      return alert('Ничего скопировать')

    this.props.textArrToCopy.forEach((obj) => {
      for (let key in obj) {
        // т.к ключи объектов все являются строками, 
        // след-но они итерируются по порядку добавления
        text += obj[key];
      }
    })
    console.log(text)
    return this.copy(text);
  }

  copy(text) {
    const textArea = document.createElement('textarea');    
    textArea.textContent = text;
    
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }

  render() {
    return (
      <button className='correction__button button' onClick={this.handleClick}>Скопировать</button>
    );
  }

}


export default CopyText;
import React, { Component } from 'react';

class SendText extends Component {
  constructor(props) {
    super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const url = 'https://speller.yandex.net/services/spellservice.json/checkText?';
    const text = encodeURIComponent(this.props.text);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send('text=' + text);

    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const json = JSON.parse(xhr.responseText);
          this.props.onResponse(json)
          this.props.onPostedText(this.props.text)
      }
    }
  }

  render() {
    return(
      <button onClick={this.handleClick}>Проверить</button>
    )
  }
}

export default SendText;
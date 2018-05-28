import React, { Component } from 'react';

class EditText extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.parseText = this.parseText.bind(this);
  }

  handleClick(e) {
    console.log('click')
  }

  parseText() {
    const json = this.props.json;
    const sentText = this.props.text;
    let strIndex = 0;
    
    return json.map((e, i) => {
      let text = [];

      if (strIndex < e.pos)
        text.push(
          <span key={'unchanged-'+i}>{sentText.slice(strIndex, e.pos)}</span>);

      text.push(
        <b key={'changed-'+i} id={'unchanged-'+i}>{e.word}</b>)
      strIndex = e.pos + e.len;
      
      if (json.length - 1 === i && strIndex + 1 !== sentText.length)
        text.push(
          <span key={'unchanged-last'}>{sentText.slice(strIndex)}</span>);

      return text;
    })
  }

  render() {
    const text = this.props.json ? this.parseText() : 'Здесь будет текст';

    return(
      <pre>{text}</pre>
    )
  }
}

export default EditText;
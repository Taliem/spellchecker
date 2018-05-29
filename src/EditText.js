import React, { Component } from 'react';

class EditText extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.parseText = this.parseText.bind(this);
    this.toEditText = this.toEditText.bind(this);
  }

  handleClick(e) {
    console.log('click')
  }

  parseText(json) {
    const text = this.props.text;
    let strIndex = 0;
    let srtArr = [];

    json.forEach((e, i) => {
      let map = {};
      
      if (strIndex < e.pos)
        map['normal-' + i] = text.slice(strIndex, e.pos);
      
      map['toChange-' + i] = e.word;
      // индекс окончания слова для исправления 
      strIndex = e.pos + e.len;

      if ((json.length - 1 === i) && (strIndex !== text.length))
        map['normal-last'] = text.slice(strIndex);

      srtArr.push(map)
    })
    console.log(srtArr)
    return srtArr;
  }

  toEditText(json) {
    const textMap = this.parseText(json)
    let textTags = []
    textMap.forEach((e, i) => {
      // т.к у нас не числовые ключи, то порядок перебора будет в соответствовать порядку добавления в объект
      for (let mapKey in e) {
        switch(mapKey) {
          case 'normal-' + i:
            textTags.push(<span key={mapKey}>{e[mapKey]}</span>);
            console.log(e.mapKey)
            break;
          
          case 'toChange-' + i:
            textTags.push(
              <select onChange={this.props.onSelect} key={mapKey} id={mapKey}>
                <option key={'sel-' + i + ' ' + json[i].word } defaultValue={json[i].word}>{json[i].word}</option>
                {
                  json[i].s.map((word) => {
                    return <option key={'sel-' + i + ' ' + word } value={word}>{word}</option>
                  }) 
                }
              </select>
            );
            break;
          
          case 'normal-last':
            textTags.push(<span key={mapKey}>{e[mapKey]}</span>)
            break;
          default:
            alert('ошибка разбора текста');
            
        }
      }
    })
    return textTags; 
  }

  render() {
    const json = this.props.json;
    const text = json ? this.toEditText(json) : 'Здесь будет текст';

    return(
      <pre>{text}</pre>
    )
  }
}

export default EditText;
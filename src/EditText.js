import React, { Component } from 'react';
import './css/EditText.css';

class EditText extends Component {
  constructor(props) {
    super(props);
    this.parseText = this.parseText.bind(this);
    this.toEditText = this.toEditText.bind(this);
  }

  parseText(json) {
    const text = this.props.text;
    let strIndex = 0;
    let strArr = [];

    json.forEach((e, i) => {
      let map = {};
      
      if (strIndex < e.pos)
        map['normal-' + i] = text.slice(strIndex, e.pos);
      
      map['toChange-' + i] = e.word;
      // индекс окончания слова для исправления 
      strIndex = e.pos + e.len;

      if ((json.length - 1 === i) && (strIndex !== text.length))
        map['normal-last'] = text.slice(strIndex);

      strArr.push(map)
    })
    
    this.props.onParseText(strArr)
    return strArr;
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
            break;
          
          case 'toChange-' + i:
            textTags.push(
              <select onChange={this.props.onSelect} key={mapKey} id={mapKey} className='select'>
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

  // для оптимизации отрисовки
  shouldComponentUpdate(nextProps) {
    if (nextProps.text !== this.props.text) {
      return true;
    }

    return false;
  }

  render() {

    const text = (
      () => {
      const json = this.props.json
      if (json === null)
        return ''
      else if (json.length === 0)
        return ' Все верно!'
      else
        return this.toEditText(json)
    }
    )()

    return(
      <pre className='correction__edit'>{text}</pre>
    )
  }
}

export default EditText;
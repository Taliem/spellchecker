import React, { Component } from 'react';

import InputText from './InputText';
import SendText from './SendText';
import EditText from './EditText';
import CopyText from './CopyText';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: '',
      jsonResponse: null,
      postedText: '',
      textArrToCopy: null,
    }
    this.handleInputText = this.handleInputText.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handlePostedText = this.handlePostedText.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleParseText = this.handleParseText.bind(this);
  }

  handleInputText(text) {
    this.setState({
      textArea: text,
    })
  }

  handleResponse(json) {
    this.setState({
      jsonResponse: json,
    })
  }

  handlePostedText(text) {
    this.setState({
      postedText: text,
    })
  }

  handleSelect(e) {
    const id = e.target.id;
    const text = e.target.value;
    // так как цифра после '-' id слов требующих
    //исправление равна индексу json
    // и соответственно массива текстов  
    const i = parseInt(id.split('-')[1], 10)

    this.setState((prevState) => ({
      textArrToCopy: (() => {
        prevState.textArrToCopy[i][id] = text;
        return prevState.textArrToCopy
      })()
    }));
  }

  handleParseText(array) {
    this.setState({
      textArrToCopy: array,
    })
  }

  render() {
    return (
      <div className='container'>
        <h1 className='headline'>проверь свое правописание.</h1>

        <div className='input'>
          <InputText
            onInputText={this.handleInputText} />
          
          <div className='input__props'>
            <SendText className='input__button button'
              onResponse={this.handleResponse}
              text={this.state.textArea}
              onPostedText={this.handlePostedText} />

            <span className='input__counter'>{this.state.textArea.length}/3000</span>
          </div>
        </div>  

        <div className='correction'>
          <EditText
            json={this.state.jsonResponse}
            text={this.state.postedText}
            onSelect={this.handleSelect}
            onParseText={this.handleParseText} />

          <CopyText
            textArrToCopy={this.state.textArrToCopy} />
        </div>

        <a className="link api-link" href='http://api.yandex.ru/speller/'>Проверка правописания: Яндекс.Спеллер</a>
      </div>
    );
  }
}

export default App;

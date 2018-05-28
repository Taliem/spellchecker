import React, { Component } from 'react';
import InputText from './InputText';
import SendText from './SendText';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: '',
      jsonResponse: null,
      sentText: '',
    }
    this.handleInputText = this.handleInputText.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleSentText = this.handleSentText.bind(this);
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

  handleSentText(text) {
    this.setState({
      sentText: text,
    })
  }

  render() {
    return (
      <div className="App">
        <InputText
          length={this.state.textArea.length} 
          onInputText={this.handleInputText} />

        <SendText 
          onResponse={this.handleResponse}
          text={this.state.textArea}
          onSentText={this.handleSentText} />
      </div>
    );
  }
}

export default App;

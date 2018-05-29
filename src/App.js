import React, { Component } from 'react';
import InputText from './InputText';
import SendText from './SendText';
import EditText from './EditText';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: '',
      jsonResponse: null,
      postedText: '',
    }
    this.handleInputText = this.handleInputText.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handlePostedText = this.handlePostedText.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
    console.log(e.target.value)
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
          onPostedText={this.handlePostedText} />

        <EditText
          json={this.state.jsonResponse}
          text={this.state.postedText}
          onSelect={this.handleSelect} />
      </div>
    );
  }
}

export default App;

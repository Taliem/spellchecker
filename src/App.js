import React, { Component } from 'react';
import InputText from './InputText';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: '',
      jsonWords: null,
    }
    this.handleInputText = this.handleInputText.bind(this);
  }

  handleInputText(text) {
    this.setState({
      textArea: text,
    })
  }

  render() {
    return (
      <div className="App">
        <InputText
          length={this.state.textArea.length} 
          handleInputText={this.handleInputText}
        />
      </div>
    );
  }
}

export default App;

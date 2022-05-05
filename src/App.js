import React from 'react';
import './App.css';

class App extends React.Component{
  constructor() {
    super();

    this.state = {
      isPracticing: false,
      charactersInput: "", 
      iterationsInput: 0,
      text: "",
      number: 0
    };

    this.togglePractice = this.togglePractice.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.practice = this.practice.bind(this);
  }

  togglePractice() {
    const { isPracticing } = this.state;
    if (isPracticing) {
      return this.setState({
        isPracticing: false
      });
    } 

    this.practice();
  }

  practice() {

    this.setState({
      isPracticing: true
    });

    let { text } = this.state
    let u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = "zh";
    speechSynthesis.speak(u);
  }

  handleInput(input) {
    this.setState({
      [input.target.name]: input.target.value
    })
  }

  render() {
    const { isPracticing, text, number } = this.state;

    return (
      <div className="app">
  
        <div className="app__header">
          <h1>Welcome to Practice Hanzi!</h1>
          <p>Input the list of comma separated characters, the number of iterations you'd like and press practice!</p>
        </div>
  
        <div className="app__inputs_container">
          <input name="text" onChange={this.handleInput} value={text} type="text" className="app__string_input"/>
          <input name="number" onChange={this.handleInput} value={number} type="number" className="app__number_of_iterations" />
          <button onClick={this.togglePractice} className="app__practice_pause_btn">{ isPracticing ? "Pause" : "Practice"}</button>
        </div>
  
        <div className="app__overall_sequence_container">
          <div className="app__overall_sequence_marker"></div>
          <div className="app__overall_sequence_text"></div>
        </div>
  
        <div className="app__character_display">
          <p className="app__current_character_label">Current character:</p>
          <p className="app__current_character"></p>
        </div>
  
      </div>
    );
  }
}

export default App;

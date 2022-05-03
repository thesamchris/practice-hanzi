import React from 'react';
import './App.css';

class App extends React.Component{
  constructor() {
    super();

    this.state = {
      isPracticing: false,
      charactersInput: "", 
      iterationsInput: 0
    };

    this.togglePractice = this.togglePractice.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  togglePractice() {
    const { isPracticing } = this.state;
    if (isPracticing) {
      this.setState({
        isPracticing: false
      });
    }
  }

  practice() {
    const { isPracticing } = this.state;
    if (isPracticing) {

    }
  }

  handleInput() {

  }

  render() {
    const { isPracticing } = this.state;

    return (
      <div className="app">
  
        <div className="app__header">
          <h1>Welcome to Practice Hanzi!</h1>
          <p>Input the list of comma separated characters, the number of iterations you'd like and press practice!</p>
        </div>
  
        <div className="app__inputs_container">
          <input onChange={this.handleInput} type="text" className="app__string_input"/>
          <input onChange={this.handleInput} type="number" className="app__number_of_iterations" />
          <button onClick={this.togglePractice} className="app__practice_pause_btn">{ isPracticing ? "Pause" : "Practice"}</button>
        </div>
  
        <div className="app__overall_sequence_container">
          <div className="app__overall_sequence_marker"></div>
          <div className="app__overall_sequence_text"></div>
        </div>
  
        <div className="app__character_display">
          <p className="app__current_character_label">Current character:</p>
          <p classNAme="app__current_character"></p>
        </div>
  
      </div>
    );
  }
}

export default App;

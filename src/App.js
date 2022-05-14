import React from 'react';
import './App.css';
import Continuous from './components/tests/continuous';
import PlayPauseTest from './components/tests/playpausetest';

class App extends React.Component{
  constructor() {
    super();

    this.state = {
      isPracticing: false,
      charactersInput: "", 
      iterationsInput: 0,
      text: "",
      number: 0,
      delay: 5000,
      sequence: [],
      completedInitial: 0,
    };

    this.togglePractice = this.togglePractice.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.practice = this.practice.bind(this);
    this.getCharacter = this.getCharacter.bind(this);
  }

  arraysMatch(arr1, arr2) {

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    // Otherwise, return true
    return true;

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.arraysMatch(prevState.sequence, this.state.sequence) && this.state.isPracticing) {
      this.practice();
    }
  }

  togglePractice() {
    const { isPracticing } = this.state;
    this.setState({
        isPracticing: !isPracticing
    });

    this.practice();
  }

  makeList() {
    let { text } = this.state;
    let words = text.split("");
    return words;
  }

  getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  timeout (ms) {
    return new Promise(res => setTimeout(res,ms));
  }

  getCharacter() {
    let { sequence, text, completedInitial } = this.state;

    if (sequence.length < 1 && !completedInitial) {
      let characters = text.split('');
      let current = characters.shift();
      this.setState({
        sequence: characters
      });

      return current;

    } else if (sequence.length < 1 && completedInitial) {
      let characters = text.split('');
      return characters[this.getRandomIndex(0, characters.length)];
    }

    if (sequence.length === 1 && !completedInitial) {
      this.setState({
        completedInitial: true
      });
    }

    return sequence.shift();
  }

  async practice() {
    let { delay } = this.state;
    // TODO: Pause and pick up from where it left off when resuming
    // TODO: Mode where, first round bring up ALL characters in random order, then randomise for iterations
    // TODO: First time, "Hi i am Hana, let's start practicing!"
    let u = new SpeechSynthesisUtterance();
    // let randomWord = characters[this.getRandomIndex(0, characters.length)] 
    u.text = this.getCharacter();
    u.lang = "zh";
    speechSynthesis.speak(u);
    await this.timeout(delay);
  }

  handleInput(input) {
    this.setState({
      [input.target.name]: input.target.value
    })
  }

  render() {
    const { isPracticing, text, number } = this.state;
    return  <PlayPauseTest />
    return <Continuous />
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

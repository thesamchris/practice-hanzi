import React, { useState, useEffect } from 'react';
import useToggle from '../useToggle';

async function timeout (ms) {
    return new Promise(res => setTimeout(res,ms));
  }

async function speak() {
    let u = new SpeechSynthesisUtterance();
    u.text = "woof";
    u.lang = "en";
    speechSynthesis.speak(u);
    await timeout(2000);
}

const Continuous = () => {

  const [seconds, setSeconds] = useState(0);
  const [isOn, toggleIsOn] = useToggle();
  const [intervalTime, setIntervalTime] = useState(2000);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      if (isOn) {
          speak();
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        {seconds} seconds have elapsed since mountings.
        <button onClick={toggleIsOn}>{ isOn ? "Pause" : "Play" }</button>
      </header>
    </div>
  );
};

export default Continuous;
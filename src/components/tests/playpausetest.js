import React from 'react'

export default class PlayPauseTest extends React.Component {
    constructor() {
        super();

        this.state = {
            isPlaying: false,
            characterCount: 0
        }

        this.togglePlay = this.togglePlay.bind(this)

    }

    async timeout (ms) {
        return new Promise(res => setTimeout(res,ms));
    }


    async componentDidMount() {
        this.interval = setInterval(async () => {
            if (this.state.isPlaying) {
                let { characterCount } = this.state
                let u = new SpeechSynthesisUtterance();
                u.text = "woof " + characterCount;
                // u.lang = "en";
                speechSynthesis.speak(u);
                this.setState({ time: Date.now(), characterCount: characterCount + 1 })
                await this.timeout(2000);
            }
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    togglePlay() {
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.togglePlay}>{ this.state.isPlaying ? "pause" : "play" }</button>
                <h1>{ this.state.isPlaying ? "true" : "false" }</h1>
            </div>
        )
    }
}
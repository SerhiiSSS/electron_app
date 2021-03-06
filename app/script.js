import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: null, 
  }

  formatTime = () => {
    const { time } = this.state

    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - (minutes * 60))

    if(minutes < 10) minutes = '0' + minutes.toString()
    if(seconds < 10) seconds = '0' + seconds.toString()

    return minutes + ':' + seconds
  }

  step = () => {
    const { time } = this.state
    const { status } = this.state

    this.setState({ time: (time -1) })
    if( time === 0 && status === 'work'){
      this.playBell()
      this.setState({
        time: 20,
        status: 'rest'
      })
    } else if ( time === 0 && status === 'rest'){
      this.playBell()
      this.setState({
        time: 1200,
        status: 'work'
      })
    }
  }

  startTimer = () => {
    this.setState({
      time: 1200,
      status: 'work',
      timer: setInterval(this.step, 1000),
    })
  }

  stopTimer = () => {
    this.setState({
      time: 0,
      status: 'off',
      timer: clearInterval(this.step)
    })
  }

  closeApp = () => {
    window.close()
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav')
    bell.play()
  }

  render() {

    const {status} = this.state;
    
    return (
      <div>
        <h1>Protect your eyes</h1>
      { 
        (status === 'off') &&
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      }
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">
          {this.formatTime(this.state.time)}
        </div>}

        {(status === 'off') && <button className="btn" onClick={() => this.startTimer()}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));

import React, { Component } from 'react';
import classNames from 'classnames/bind'
import './App.css';

class App extends Component {
  state = {
    score: 0,
    question: {},
    words: [],
    wrong: [],
    ended: false,
    success: false,
    fail: false,
    totalCount: 0
  }

  setRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * this.state.words.length);
    const question = this.state.words.splice(randomIndex, 1)[0];

    this.setState({ 
      success: false,
      fail: false,
      question 
    });
  }

  handKeyPress = (e) => {
    if (e.key === 'Enter')  {
      if (e.target.value === '') {
        return false;
      }

      if (this.state.question.meaning === e.target.value) {
        this.setState({
          score: this.state.score + 2,
          success: true
        });
      } else {
        let wrong = this.state.wrong;
        wrong.push(this.state.question);
        this.setState({
          fail: true,
          wrong 
        });
      }

      if (this.state.words.length === 0) {
        this.setState({ ended: true });
        return;
      }

      e.target.value = '';

      setTimeout(this.setRandomWord, 1000);
    }
  }

  randomWords = (words) => {
    let questions = [];
    for (var i = 0; i < 50; i++) {
      let randomIndex = Math.floor(Math.random() * words.length);
      questions.push(words.splice(randomIndex, 1)[0]);
    }
    return questions;
  }

  componentWillMount() {
    fetch('words.json')
      .then(response => response.json())
      .then(words => {
        this.setState({ 
          words: this.randomWords(words), 
          totalCount: words.length 
        });
        this.setRandomWord();
      });
  }

  render() {
    var hanzaiClass = classNames({
      hanzai: true,
      'success': this.state.success,
      'fail': this.state.fail
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1 className={hanzaiClass}>{this.state.question.hanzai}</h1>
          <input type="text" className={this.state.ended ? 'visibility' : 'active'} onKeyPress={this.handKeyPress}></input>
        </header>
        <p>{this.state.words.length + 1} 문제 남았습니다.</p>
        <p>점수 : {this.state.score}</p>
        <p className={this.state.ended ? 'active' : 'visibility'}>
          게임이 끝났습니다.
        </p>
      </div>
    );
  }
}

export default App;

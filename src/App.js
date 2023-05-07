
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  apiKey

  state={     //this is for loading bar
    progress:0
  }

  setProgress = (progress)=>{  //this is for loading bar
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>

        <Router>
     
          <NavBar/>
      
        <LoadingBar   //for loading bar
        color='#f11946'
        height={2.5}
        progress={this.state.progress}
  
      />
        <Routes>
          {/* here setProgress is used for loading bar */}
          <Route exact path="/" element= {<News setProgress={this.setProgress} key="general"  country="in" category="general"/>}></Route>  
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business"  country="in" category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment"  country="in" category="entertainment"/>}></Route>
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health"  country="in" category="health"/>}></Route>
          <Route exact path="/science"  element={<News setProgress={this.setProgress} key="science"  country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports"  country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology"  country="in" category="technology"/>}></Route>

        </Routes>
        
        </Router>
      </div>
    )
  }
}

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddSchool from './components/addSchool'

function App() {
  return (
    <Router>
    <Route path='/' exact component={AddSchool} />
    </Router>
  );
}

export default App;

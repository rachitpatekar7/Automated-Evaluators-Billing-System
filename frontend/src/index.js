import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ExamForm from './components/ExamForm';
import Billing from './components/Billing';
import Profile from './components/profile';
import Faculty from './components/Faculty';
import ExamList from './components/ExamList';
import './App.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/exam-form" component={ExamForm} />
        <Route path="/billing" component={Billing} />
        <Route path="/profile" component={Profile} />
        <Route path="/faculty" component={Faculty} />
        <Route path="/exams" component={ExamList} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import { Link, Router } from "@reach/router";
import './App.css';
import Home from './Home';
import Dashboard from './Dashboard';
import Invoice from './Invoice';
import Invoices from './Invoices';

const NotFound = () => <p>404! Sorry, nothing here</p>

function App() {
  return (
    <div className="App">
      
      <h1>Tutorial!</h1>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="dashboard">Dashboard</Link>{" "}
        <Link to="invoices">Invoices</Link>{" "}
      </nav>

      <Router>
        <NotFound default />
        <Home path="/" />
        <Dashboard path="/dashboard" />
          <Invoices path="invoices">
            <Invoice path=":invoiceId" />
          </Invoices>
      </Router>

    </div>
  );
}

export default App;

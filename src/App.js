import React from 'react';
import './App.css';
import Asiakaslista from './components/asiakaslista';
import Treenilista from './components/treenilista';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">
          Personaltrainer
        </Typography>
      </Toolbar>
    </AppBar>

      <BrowserRouter>
        <div>
          <Link to="/treenilista">Treenilista  </Link>
          <Link to="/"> Asiakaslista</Link>
          <Switch>
            <Route path="/treenilista" component={Treenilista} />
            <Route exact path="/" component={Asiakaslista} />
            <Route render={() => <h2>404 No page with this name found</h2>} />
          </Switch>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;

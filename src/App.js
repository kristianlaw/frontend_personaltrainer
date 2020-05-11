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

      <BrowserRouter>
        <div>
        <Link to="/">Asiakaslista</Link>{''}
        <br/>
        <Link to="/treenilista">Treenilista</Link>{''}

        <Switch>
          <Route path="/treenilista">
          
          </Route>

        </Switch>
        </div>
      </BrowserRouter>


       <Toolbar>
         <Typography variant="h4">
           Personaltrainer
         </Typography>

       </Toolbar>
     </AppBar>
      <Asiakaslista />

    </div>
  );
}

export default App;

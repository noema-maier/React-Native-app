import React from 'react';
import {View} from 'react-native';
import SearchName from './SearchName'
import UserRepositories from './UserRepositories'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



class App extends React.Component {
    render() {
      return (

      <View>
        <Router>
          <View >
            <Switch>
                <Route 
                    exact 
                    path="/" 
                    render={() => <SearchName/>}     
                />
                <Route
                    exact
                    path="/user-repositories"
                    render={() => <UserRepositories/>}
                />
            </Switch>
          </View>
        </Router>
      </View>
      );
   }
}


export default App;

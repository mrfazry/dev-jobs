import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentAccount, logoutAccount } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import CreateUserProfile from './components/create-profile/CreateUserProfile';
import CreateCompanyProfile from './components/create-profile/CreateCompanyProfile';
import './App.css';
import { clearCurrentUserProfile } from './actions/userProfileActions';
import { clearCurrentCompanyProfile } from './actions/companyProfileActions';

import PrivateRoute from './components/common/PrivateRoute';

//check existency of token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //decode token and get account data
  const decoded = jwt_decode(localStorage.jwtToken);

  //set account and isAuthenticated
  store.dispatch(setCurrentAccount(decoded));

  //token expiration
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //log user out
    store.dispatch(logoutAccount());

    //clear last profile
    store.dispatch(clearCurrentUserProfile());
    store.dispatch(clearCurrentCompanyProfile());

    //clear current profile
    //blablabla, belum ada

    //redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateUserProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile-2"
                  component={CreateCompanyProfile}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

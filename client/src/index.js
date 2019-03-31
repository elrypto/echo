import React from 'react';
import {render} from "react-dom";
import './index.css';
import Backbone from 'backbone';
import './bootstrap.min.css';
import './style.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";

import App from './App';
import Main from './views/Main';
import LeaderBoard from './views/Leaderboard';
import Admin from './views/Admin';
import Create from './views/Create';
import Register from './views/Register';
import Follow from './views/Follow';
import MyPortfolio from './views/MyPortfolio';
import configureStore from './config/configureStore'



const store = configureStore();
let content = document.getElementById('root');


const Router = Backbone.Router.extend({
    routes: {
      ''    : 'index',
      'leaderboard' : 'leaderboard',
      'follow' : 'follow',
      'admin' : 'admin',
      'my_portfolio' : 'my_portfolio',
      'create' : 'create',
      'register' : 'register',
    },
    index: function() {
      render(
        <Provider store={store}>
          <App id="index" router={router}>
              <Main />
          </App>
          </Provider>
        , content)
    },
    admin: function() {
      render(
        <Provider store={store}>
          <App id="admin">
            <Admin />
          </App>
        </Provider>
        , content)
      },
     create: function() {
        render(
          <Provider store={store}>
            <App id="create">
              <Create />
            </App>
          </Provider>
          , content)
        },
    leaderboard: function() {
      render(
        <Provider store={store}>
          <App id="leaderboard">
            <LeaderBoard />
          </App>
        </Provider>
        , content)
      },
      my_portfolio: function() {
        render(
          <Provider store={store}>
            <App id="my_portfolio">
              <MyPortfolio />
            </App>
          </Provider>
          , content)
        },
      follow: function() {
        render(
          <Provider store={store}>
            <App id="follow">
              <Follow />
            </App>
          </Provider>
          , content)
        },
        register: function() {
          render(
            <Provider store={store}>
              <App id="follow">
                <Register />
              </App>
            </Provider>
            , content)
          }
  })
  
  let router = new Router()
  Backbone.history.start()
  


//ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Component } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

//import Web3Test from './../components/test/Web3Test';
import {TOKENS} from './../components/0x/tokens';
import DragAndDropTest from './../components/test/DragAndDropTest';
import DynamicJSONTest from '../components/test/DynamicJSONTest';
import { buildJSON } from '../utils/EchoUtils';
import ShowAccounts from './../components/echo/ShowAccounts';
 


let startingPointJson = {
  tasks : {},
  columns: {
      'column-1': {
      id: 'column-1',
      title: 'To do'
      //taskIds: ['task-1', 'task-2', 'task-3', 'task-N']
      },
      'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: []
      },
      'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
      }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
}


export default class Admin extends Component {
  constructor (props){
    super(props);
    let jsonForDnD = buildJSON(TOKENS, startingPointJson);
    this.state = {
      jsonData : jsonForDnD
    }
  }



  render() {
    
    return (
      <div>
        <Header />
        
        <div class="container">
          <h3>--a**d*m**i*n--</h3>

          <hr class="my4"/>

          <ShowAccounts />
         

          <br/><br/>
        </div>
        <Footer />
    </div>
    );
  }
}


import React, { Component } from 'react';
import {TOKENS} from '../0x/tokens';
import {buildJSON} from './../../utils/EchoUtils';


    let token_json = {
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


export default class DynamicJSONTest extends Component {
  callBuildJSON = () => {
    console.log("callBuildJSON")
    let json = buildJSON(TOKENS, token_json);
  }

  render() {
    return( 
        <div>
            <button class="btn btn-secondary" onClick={this.callBuildJSON}>(-- build JSON tree --)</button>
        </div>
    );
  }
}

/*const initialData = {
  tasks : {
    'task-1': {id: 'task-1', symbol: TOKENS.ZRX.symbol, image: TOKENS.ZRX.image},
    'task-2': {id: 'task-2', symbol: TOKENS.GNT.symbol, image: TOKENS.GNT.image},
    'task-3': {id: 'task-3', symbol: TOKENS.WETH.symbol, image: TOKENS.WETH.image},
    'task-4': {id: 'task-4', symbol: TOKENS.REP.symbol, image: TOKENS.REP.image},
    'task-5': {id: 'task-5', symbol: TOKENS.MKR.symbol, image: TOKENS.MKR.image},
    'task-6': {id: 'task-6', symbol: TOKENS.BNB.symbol, image: TOKENS.BNB.image},
    'task-7': {id: 'task-7', symbol: TOKENS.OMG.symbol, image: TOKENS.OMG.image},
    'task-7': {id: 'task-7', symbol: TOKENS.BAT.symbol, image: TOKENS.BAT.image},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Tokens Available',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6', 'task-7']
    },
    'column-2': {
      id: 'column-2',
      title: 'Tokens for Index',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2']
}*/

/*
const initialData = {
    tasks : {
      'task-1': {id: 'task-1', content: 'take out garbage'},
      'task-2': {id: 'task-2', content: 'cook dinner'},
      'task-3': {id: 'task-3', content: 'buy groceries'},
      'task-4': {id: 'task-4', content: 'mow the lawn'}
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
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
*/
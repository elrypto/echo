import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';

import {startInProgress} from './../../actions';
import Column from './Column';



const initialData = {
    tasks : {
      'task-1': {id: 'task-1', content: 'take out garbage'},
      'task-2': {id: 'task-2', content: 'cook dinner'}
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2']
      }
    },
    columnOrder: ['column-1']
}

class AdminTests extends Component {
  state = initialData;


  handleTestInvokeAction = e => {
    console.log("handleTestInvokeAction");
    this.props.dispatch(startInProgress());
  }

  handleTestPropsSetFromAction = e => {
    console.log("handleTestPropsSetFromAction");
    const {inProgress} = this.props;
    console.log(inProgress);
  }

  onDragEnd = result => {
    //TODO: reorder code
  }

  /*<div>
             <button class="btn btn-secondary" onClick={this.handleTestInvokeAction}>
            Test Action Invoke</button>

            <button class="btn btn-secondary" onClick={this.handleTestPropsSetFromAction}>
            Test Props State Set (Action)</button>
        </div>*/
  
  render() {
    return( 
    <DragDropContext onDragEnd={this.onDragEnd}>
    
    {this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
    
      return <Column key={column.id} column={column} tasks={tasks} />;
    })}
    </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  const {inProgress} = state;
  return {inProgress}
}
export default connect(mapStateToProps)(AdminTests)



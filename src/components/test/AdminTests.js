import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {startInProgress} from './../../actions';
import Column from './Column';


const Container = styled.div`
  display: flex;
`;


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
    const {destination, source, draggableId} = result;

    if (!destination){
      return;
    }

    if (destination.droppableId === source.droppableId &&
          destination.index === source.index){
      return;        
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    }

    this.setState(newState);
  }

  /*<div>
             <button class="btn btn-secondary" onClick={this.handleTestInvokeAction}>
            Test Action Invoke</button>

            <button class="btn btn-secondary" onClick={this.handleTestPropsSetFromAction}>
            Test Props State Set (Action)</button>
        </div>*/
  
  render() {
    return( 
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
        
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
        
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
        </DragDropContext>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {inProgress} = state;
  return {inProgress}
}
export default connect(mapStateToProps)(AdminTests)



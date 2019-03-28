import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {startInProgress} from './../../actions';
import Column from './Column';
import {TOKENS} from './../0x/tokens';


const Container = styled.div`
  display: flex;
`;


const initialData = {
    tasks : {
      'task-1': {id: 'task-1', symbol: TOKENS.ZRX.symbol, image: TOKENS.ZRX.image},
      'task-2': {id: 'task-2', symbol: TOKENS.GNT.symbol, image: TOKENS.GNT.image},
      'task-3': {id: 'task-3', symbol: TOKENS.WETH.symbol, image: TOKENS.WETH.image},
      'task-4': {id: 'task-4', symbol: TOKENS.REP.symbol, image: TOKENS.REP.image},
      'task-5': {id: 'task-5', symbol: TOKENS.MKR.symbol, image: TOKENS.MKR.image}
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Tokens Available',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
      },
      'column-2': {
        id: 'column-2',
        title: 'Tokens for Index',
        taskIds: []
      }
    },
    columnOrder: ['column-1', 'column-2']
}

class TokenDnD extends Component {
  state = initialData;


  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if (!destination){
      return;
    }

    if (destination.droppableId === source.droppableId &&
          destination.index === source.index){
      return;        
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    //move within the same list
    if (start===finish){
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
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
      return;
    }

    //move to a new lists
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }
    
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns:{
        ...this.state.columns,
        [newStart.id]:newStart,
        [newFinish.id]:newFinish
      }
    };
    this.setState(newState);
  }

  
  render() {
    return( 
      <div>
        <Container>
          <DragDropContext onDragEnd={this.onDragEnd}>
          
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
          
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
          </DragDropContext>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {inProgress} = state;
  return {inProgress}
}

export default connect(mapStateToProps)(TokenDnD)



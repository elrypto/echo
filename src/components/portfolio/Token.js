import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;


export default class Token extends React.Component {
    render(){
        return (
            //return <Container>{this.props.task.content}</Container>;
            <Draggable draggableId={this.props.task.id} index={this.props.index} >
              {(provided, snapshot) => (  
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                <img height="35" width="35" src={this.props.task.image} alt="" class="mr-2 rounded"/>
                {this.props.task.symbol}
                </Container>
              )}  
            </Draggable>
        );
    }
}
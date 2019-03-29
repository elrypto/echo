import React, { Component } from 'react';
import { connect } from 'react-redux';
import TokenDnD from './../components/portfolio/TokenDnD';
import IndexNaming from './../components/portfolio/IndexNaming';
import styled from 'styled-components';
import {TOKENS} from './../components/0x/tokens';
import { buildJSON } from '../utils/EchoUtils';

const Container = styled.div`
  display: inline;
`;


let startingPointJson = {
  tasks : {},
  columns: {
      'column-1': {
      id: 'column-1',
      title: 'Available Tokens'
      //taskIds: ['task-1', 'task-2', 'task-3', 'task-N']
      },
      'column-2': {
      id: 'column-2',
      title: 'Tokens to Purchase',
      taskIds: []
      }
  },
  columnOrder: ['column-1', 'column-2']
}


class Create extends Component {
  constructor(props){
    super(props);
    
    let builtJson = buildJSON(TOKENS, startingPointJson);
   // console.log("builtJson:" + builtJson);
    this.state = {
      tokenJson : builtJson
    }
  }


  render() {
    return( 
    
        <Container>
          <IndexNaming />

          <button class="btn btn-primary">Save Index</button>

         <TokenDnD tokenData={this.state.tokenJson} />
        
        </Container>

    );
  }
}

const mapStateToProps = state => {
  const {inProgress} = state;
  return {inProgress}
}
export default connect(mapStateToProps)(Create)



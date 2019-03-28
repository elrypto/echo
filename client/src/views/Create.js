import React, { Component } from 'react';
import { connect } from 'react-redux';
import TokenDnD from './../components/portfolio/TokenDnD';
import IndexNaming from './../components/portfolio/IndexNaming';
import styled from 'styled-components';

const Container = styled.div`
  display: inline;
`;

class Create extends Component {
  state = {};


  render() {
    return( 
    
        <Container>
          <IndexNaming />


          <button class="btn btn-primary">Save Index</button>


         <TokenDnD />
        
        </Container>

    );
  }
}

const mapStateToProps = state => {
  const {inProgress} = state;
  return {inProgress}
}
export default connect(mapStateToProps)(Create)



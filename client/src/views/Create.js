import React, { Component } from 'react';
import { connect } from 'react-redux';
import TokenDnD from './../components/portfolio/TokenDnD';
import IndexNaming from './../components/portfolio/IndexNaming';

class Create extends Component {
  state = {};


  render() {
    return( 
      <div>
        

        <IndexNaming />

        <TokenDnD />

        <button class="btn btn-primary">Save Index</button>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const {inProgress} = state;
  return {inProgress}
}
export default connect(mapStateToProps)(Create)



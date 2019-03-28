import React, { Component } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

//import Web3Test from './../components/test/Web3Test';
import {TOKENS} from './../components/0x/tokens';
import DragAndDropTest from './../components/test/DragAndDropTest';


class Admin extends Component {
  render() {
    
    return (
      <div>
        <Header />
        
        <div class="container">
          <h3>--admin--</h3>

          <DragAndDropTest tokenData={TOKENS}/>

          <br/><br/>
        </div>
        <Footer />
    </div>
    );
  }
}

export default Admin;

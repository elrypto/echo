import React, { Component } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

import LoomTest from './../components/test/LoomTest';
import DragAndDropTest from './../components/test/DragAndDropTest';



class Admin extends Component {
  render() {
    
    return (
      <div>
        <Header />
        
        <div class="container">
          <h3>--Admin/Test--</h3>

          <DragAndDropTest />

          <LoomTest />

          <br/><br/>
        </div>
        <Footer />
    </div>
    );
  }
}

export default Admin;

import React, { Component } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

import LoomTest from './../components/test/LoomTest';



class Admin extends Component {
  render() {
    
    return (
      <div>
        <Header />
        
        <div class="container">
          <h3>--Admin/Test--</h3>

          <LoomTest />

          <br/><br/>
        </div>
        <Footer />
    </div>
    );
  }
}

export default Admin;

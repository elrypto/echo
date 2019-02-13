import React, { Component } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

import AdminTests from './../components/test/AdminTests';



class Admin extends Component {
  render() {
    
    return (
      <div>
        <Header />
        
        <div class="container">
          <h3>--Admin--</h3>

         <AdminTests />

          <br/><br/>
        </div>
        <Footer />
    </div>
    );
  }
}

export default Admin;

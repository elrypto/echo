import React, { Component } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import RegisterAddress from './../components/RegisterAddress';

class Admin extends Component {
  render() {
    
    return (
      <div>
        <Header />   
        <div class="container">
            
            <RegisterAddress />
        </div>
        <Footer />
    </div>
    );
  }
}

export default Admin;

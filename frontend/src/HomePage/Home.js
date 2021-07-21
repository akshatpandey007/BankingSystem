import React, { Component } from "react";
import moneyHome from "../images/pigibank.jpg";
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="container Content">
        <div className="row">
        <div className="col-sm Imgbox">
            <img src={moneyHome} alt="money" className="Money"/>
        </div>
        <div className=" col-sm TextBox">
          <h2>Welcome To <br/><span className="text-danger">Spark Foundation BANK</span></h2>
          <div className="container mx-5">
          <p style={{textAlign :'justify', fontSize:'17px'}}>Banking made easy 
            <ul className='tick' style={{textAlign :'justify'}}>
              <li> View Customer Details along with available Bank-balance</li>
              <li> Transfer Instant Money from One Customer to Another</li>
              <li> View your Transaction History</li>
            </ul>
          </p>
          </div>
          <h5 className="text">&copy;Made by <strong className="text-black">Akshat Pandey</strong></h5>
        </div>
        
        </div>
      </div>
    );
  }
}

export default Home;

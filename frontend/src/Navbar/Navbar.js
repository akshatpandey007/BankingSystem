import React, { Component } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';


class Navbar extends Component{

    render(){

        const linkStyle = {
            color : 'white',
        }

        return(
            <>
            <nav className=" Navstyle navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">
            {/* <Link to="/" style={{color:"white"}}>Home</Link> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link to="/" className="nav-link" style={linkStyle}>Home</Link>
                </li>
                <li className="nav-item">
                <Link to="/customers" className="nav-link" style={linkStyle}>View All Customers</Link>
                </li>
                <li className="nav-item">
                <Link to="/maketransaction" className="nav-link" style={linkStyle}>Make Transaction</Link></li>
                <li className="nav-item">
                <Link to="/transactionsHistory" className="nav-link" style={linkStyle}>Transactions History</Link>
                </li>
            </ul>
           
            </div>
        </div>
        </nav>
            {/* <div classNameName="Navstyle">
                
                <ul>
                   <li><Link to="/" style={{color:"white"}}>Home</Link></li>
                    <li><Link to="/customers" style={{color:"white"}}>View All Customers</Link></li>
                    <li><Link to="/maketransaction" style={{color:"white"}}>Make Transaction</Link></li>

                    <li><Link to="/transactionsHistory" style={{color:"white"}}>Transactions History</Link></li>
                    
                </ul>
            </div> */}
            </>
        )
    }
}

export default Navbar;
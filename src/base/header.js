import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      orgname: '',
      loggedIn : false,
    };
  };

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.setState({loggedIn : true,username: localStorage.getItem('username'),orgname: localStorage.getItem('orgName'), role: this.getRole()});
    } else {
      this.setState({loggedIn : false});
    }
    console.log(localStorage.getItem('orgname'));
  }

  async getRole() {
    let org = localStorage.getItem('orgName');
    var role = '';
    switch(org) {
      case 'Org1':
        role = 'Manufacturer'
        break;
      case 'Org2':
        role = 'Producer'
        break;
      case 'Org3':
        role = 'Regulatory'
        break;
      case 'Org4':
        role = 'Retailer'
        break;
      case 'Org5':
        role = 'Deliverer'
        break;
      default:
        break;
    }
    return role;
  }


  chooseForTransfer(){
    if (this.state.orgname !== 'Org1' && this.state.orgname !== 'Org') {
      return <a href="/transfer-vaccine">Transfer Vaccine</a>
    }
    else return null;
  }

  chooseForRequirement(){
    return <a href="/requirement">Requirement</a>
  }

  chooseForResponse(){
    return <a href="/response">Response</a>
  }

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('orgName');
    localStorage.removeItem('expirationDate');
    console.log("loggedOUT");
  }

  render() {
    return (
    <div className="header">
      <div className="brand">
        <NavLink to="/">Product supply-chain</NavLink>
      </div>
      { this.state.loggedIn===true

        ?

        <div className="components">
          <a href="/dashboard">Dashboard</a>
          {this.chooseForRequirement()}
          {this.chooseForResponse()}
          <a href="/" onClick={this.logout}>logout</a>
        </div>

        :

          <div className="components">
            <NavLink to="/login">Login</NavLink>
          </div>

      }
      {
        this.state.loggedIn === false

        ?

        <div className="components">
          <NavLink to="/signup">Signup</NavLink>
        </div>

        :

        ""
      }


    </div>
  )}
}

export default Header;

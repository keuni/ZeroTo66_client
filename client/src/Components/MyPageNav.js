import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyPageNav.css';

class MyPageNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleLinkClick() {
    this.setState({ menuOpen: false });
  }
  render() {
    return (
      <div className='MyPageNav'>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Navbar.Brand className='MypagezeroTo66'>ZeroTo66</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link>
                <Link className='Logout' to='/login'>
                  LOGOUT
                </Link>
              </Nav.Link>
              {/* <NavDropdown title='FONT' id='collasible-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>FONT1</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
  //   <Link to='/login'>
  //   <button className='Logout'>LOGOUT</button>
  // </Link>
}

export default MyPageNav;

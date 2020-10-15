import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'

import logo from '../../assets/logo.png';

import './navbar.styles.scss';

const NavbarComponent = () => {
	return (
		<React.Fragment>
		  <Navbar bg='light' expand='lg' variant='light'>
		    <LinkContainer to='/'>
		      <Navbar.Brand className='logo'>
		      	<img src={logo} />
		      </Navbar.Brand>
		    </LinkContainer>
		    <Navbar.Toggle />
		    <Navbar.Collapse></Navbar.Collapse>
		  </Navbar>
		</React.Fragment>
	)
};

export default NavbarComponent;

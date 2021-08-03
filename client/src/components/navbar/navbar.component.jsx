import React from 'react';
import { useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../../redux/auth/auth.actions'

import logo from '../../assets/logo.png';

import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './navbar.styles.scss';

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

	return (
		<React.Fragment>
		  <Navbar bg='light' expand='lg' variant='light'>
		    <LinkContainer to='/'>
		      <Navbar.Brand className='logo'>
		      	<img src={logo} alt='company logo'/>
		      </Navbar.Brand>
		    </LinkContainer>
		    <Button variant='link' onClick={handleLogout}>
		    	<FontAwesomeIcon icon={faSignOutAlt} />
		    </Button>
		    <Navbar.Collapse></Navbar.Collapse>
		  </Navbar>
		</React.Fragment>
	)
};

export default NavbarComponent;

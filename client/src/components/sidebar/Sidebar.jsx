import React from 'react';

import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.scss';

const Sidebar = ({ children, isSidebarVisible, toggleSidebar }) => {

	return (
		<div className={`sidebar ${isSidebarVisible ? 'is-open' : null}`} >
			<div className='sidebar-header'>
				<Button variant='link' onClick={() => toggleSidebar(false)} className='mt-4' >
					<FontAwesomeIcon icon={faTimesCircle} pull='right' size='xs' />
				</Button>
				<h3>Add a graph to your dashboard</h3>
			</div>
			{ children }
	  </div>
	);
}

export default Sidebar;

// <Nav className='flex-column pt-2'>
// 	<p className='ml-3'>Heading</p>
//   <Nav.Item className="active">
//     <Nav.Link href="/">
//       <FontAwesomeIcon icon={faHome} className="mr-2" />
//       Home
//     </Nav.Link>
//   </Nav.Item>

//   <Nav.Item>
//     <Nav.Link href="/">
//       <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
//       About
//     </Nav.Link>
//   </Nav.Item>

//   <Nav.Item>
//     <Nav.Link href="/">
//       <FontAwesomeIcon icon={faImage} className="mr-2" />
//       Portfolio
//     </Nav.Link>
//   </Nav.Item>

//   <Nav.Item>
//     <Nav.Link href="/">
//       <FontAwesomeIcon icon={faQuestion} className="mr-2" />
//       FAQ
//     </Nav.Link>
//   </Nav.Item>

//   <Nav.Item>
//     <Nav.Link href="/">
//       <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
//       Contact
//     </Nav.Link>
//   </Nav.Item>
// </Nav>
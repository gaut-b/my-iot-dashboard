import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login } from '../../redux/auth/auth.actions';
import { selectIsAuthenticated } from '../../redux/auth/auth.selectors';

import Alert from 'react-bootstrap/Alert';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const INITIAL_VALUES = {
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	password1: '',
	password2: '',
};

const VALIDATION_SCHEMA = Yup.object({
	username: Yup.string()
		.max(15, 'Must be 15 characters or less')
		.required('Required'),
	firstName: Yup.string()
		.max(15, 'Must be 15 characters or less')
		.required('Required'),
	lastName: Yup.string()
		.max(20, 'Must be 20 characters or less')
		.required('Required'),
	email: Yup.string().email('Invalid email address').required('Required'),
	password1: Yup.string().required('Password is required'),
	password2: Yup.string()
	 .oneOf([Yup.ref('password1'), null], 'Passwords must match').required('Required')
});

const SignUp = () => {

	const [isSubmitted, setSubmitted] = useState(false);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const dispatch = useDispatch();
	const login = (email, password) => dispatch(login(email, password));

	const onSubmit = async (values) => {
		const headers = {"Content-Type": "application/json"};
		const body = JSON.stringify(values, null, 2);
		await fetch("http://localhost:8000/signup/", {headers, body, method: "POST"})
		setSubmitted(true)
	}

	if (isSubmitted === true) {
		return <Redirect to='/' />
	}

	return (
		<Row>
			<Col lg={12}>
				<Breadcrumb>
					<Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
					<Breadcrumb.Item active>Sign up</Breadcrumb.Item>
				</Breadcrumb>
				<Card className='mb-3'>
					<Card.Header>Sign up</Card.Header>
					<Card.Body>
						<Formik
							initialValues={INITIAL_VALUES}
							onSubmit={onSubmit}
							validationSchema={VALIDATION_SCHEMA}
						>
							{
								({ errors, handleChange, handleBlur, handleSubmit, values }) => (
									<React.Fragment>
		                <Form onSubmit={handleSubmit} >
		                  <Form.Group controlId='firstName'>
		                    <Form.Label>First name:</Form.Label>
		                    <Form.Control
		                      className={ 'firstName' in errors ? 'is-invalid' : '' }
		                      name='firstName'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      value={values.firstName}
		                    />
		                    {
		                      'firstName' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.firstName }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Form.Group controlId='lastName'>
		                    <Form.Label>Last name:</Form.Label>
		                    <Form.Control
		                      className={ 'lastName' in errors ? 'is-invalid' : '' }
		                      name='lastName'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      value={values.lastName}
		                    />
		                    {
		                      'lastName' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.lastName }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Form.Group controlId='username'>
		                    <Form.Label>Username:</Form.Label>
		                    <Form.Control
		                      className={ 'username' in errors ? 'is-invalid' : '' }
		                      name='username'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      value={values.username}
		                      required
		                    />
		                    {
		                      'username' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Form.Group controlId='email'>
		                    <Form.Label>Email:</Form.Label>
		                    <Form.Control
		                      className={ 'email' in errors ? 'is-invalid' : '' }
		                      name='email'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      value={values.email}
		                      required
		                    />
		                    {
		                      'email' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Form.Group controlId='password1'>
		                    <Form.Label>Password:</Form.Label>
		                    <Form.Control
		                      className={ 'password1' in errors ? 'is-invalid' : '' }
		                      name='password1'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      type='password'
		                      value={values.password1}
		                    />
		                    {
		                      'password1' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.password1 }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Form.Group controlId='password2'>
		                    <Form.Label>Password confirmation:</Form.Label>
		                    <Form.Control
		                      className={ 'password2' in errors ? 'is-invalid' : '' }
		                      name='password2'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      type='password'
		                      value={values.password2}
		                    />
		                    {
		                      'password2' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.password2 }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Col className='text-center'>
		                  	<Button type="submit" variant='primary'>Sign up</Button>
		                  </Col>
		                </Form>
									</React.Fragment>
								)
							}
						</Formik>
					</Card.Body>
					<p className='mt-3 text-center'>
						<Link to='/login'>
							Already have an account ?
						</Link>
					</p>
				</Card>
			</Col>
		</Row>
	);
};

export default SignUp;
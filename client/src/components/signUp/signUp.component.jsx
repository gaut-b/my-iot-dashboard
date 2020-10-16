import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
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

const LogIn = ({ isAuthenticated, login }) => {

	const onSubmit = async (values, actions) => {
		const formData = new FormData();
		formData.append('username', values.username);
		formData.append('first_name', values.firstName);
		formData.append('last_name', values.lastName);
		formData.append('password1', values.password)
		formData.append('password2', values.password)
	}

	const INITIAL_VALUES = {
	  username: '',
	  firstName: '',
	  lastName: '',
	  password: '',
	  passwordConfirmation: '',
	}

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
		password: Yup.string().required('Password is required'),
		passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
	});

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
							validationSchema={VALIDATION_SCHEMA}
							onSubmit={onSubmit}
						>
							{
								({ errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, values }) => (
									<React.Fragment>
		                <Form>
		                  <Form.Group controlId='username'>
		                    <Form.Label>Username:</Form.Label>
		                    <Form.Control
		                      className={ 'username' in errors ? 'is-invalid' : '' }
		                      name='username'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      values={values.username}
		                      required
		                    />
		                    {
		                      'username' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Form.Group controlId='firstName'>
		                    <Form.Label>First name:</Form.Label>
		                    <Form.Control
		                      className={ 'firstName' in errors ? 'is-invalid' : '' }
		                      name='firstName'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      values={values.firstName}
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
		                      values={values.lastName}
		                    />
		                    {
		                      'lastName' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.lastName }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Form.Group controlId='password'>
		                    <Form.Label>Password:</Form.Label>
		                    <Form.Control
		                      className={ 'password' in errors ? 'is-invalid' : '' }
		                      name='password'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      type='password'
		                      value={values.password}
		                    />
		                    {
		                      'password' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Form.Group controlId='password'>
		                    <Form.Label>Password confirmation:</Form.Label>
		                    <Form.Control
		                      className={ 'passwordConfirmation' in errors ? 'is-invalid' : '' }
		                      name='passwordConfirmation'
		                      onChange={handleChange}
		                      onBlur={handleBlur}
		                      type='passwordConfirmation'
		                      value={values.passwordConfirmation}
		                    />
		                    {
		                      'passwordConfirmation' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.passwordConfirmation }</Form.Control.Feedback>
		                    }
		                  </Form.Group>
		                  <Col className='text-center'>
		                  	<Button type='submit' variant='primary'>Sign up</Button>
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

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
})

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
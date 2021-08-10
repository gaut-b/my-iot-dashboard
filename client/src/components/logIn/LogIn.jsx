import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login } from '@redux/auth/auth.actions';
import { selectIsAuthenticated } from '@redux/auth/auth.selectors';

import Alert from 'react-bootstrap/Alert';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const INITIAL_VALUES = {username: '', password: ''};

const VALIDATION_SCHEMA = Yup.object({
	username: Yup.string()
		.max(15, 'Must be 15 characters or less')
		.required('Required'),
	password: Yup.string().required('Password is required'),
});


const LogIn = () => {

	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);

	const onSubmit = ({username, password}, actions) => {
		dispatch(login(username, password));
	}

	return (
		<Row>
			<Col lg={12}>
				<Breadcrumb>
					<Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
					<Breadcrumb.Item active>LogIn</Breadcrumb.Item>
				</Breadcrumb>
				<Card className='mb-3'>
					<Card.Header>Log in</Card.Header>
					<Card.Body>
						<Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit} >
							{
								({ errors, touched, handleChange, handleSubmit, isSubmitting, values }) => (
									<React.Fragment>
										{
											'__all__' in errors &&
											<Alert variant='danger'>
												{errors['__all__']}
											</Alert>
										}
										<Form noValidate onSubmit={handleSubmit}>
											<Form.Group controlId='username'>
												<Form.Label>Username:</Form.Label>
												<Form.Control
													className={ 'username' in errors && 'username' in touched ? 'is-invalid' : '' }
													name='username'
													onChange={handleChange}
													value={values.username}
												/>
												{
		                      'username' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
		                    }
											</Form.Group>
											<Form.Group controlId='password'>
												<Form.Label>Password</Form.Label>
												<Form.Control
													className={ 'password' in errors && 'password' in touched ? 'is-invalid' : '' }
													name='password'
													onChange={handleChange}
													value={values.password}
													type='password'
												/>
                   			{
		                      'password' in errors &&
		                      <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
		                    }
											</Form.Group>
											<Col className='text-center'>
												<Button disabled={isSubmitting} type='submit' variant='primary'>Log In</Button>
											</Col>
										</Form>
									</React.Fragment>
								)
							}
						</Formik>
					</Card.Body>
					<p className='mt-3 text-center'>
						<Link to='/sign-up'>
							Don't have an account yet ?
						</Link>
					</p>
				</Card>
			</Col>
		</Row>
	);
};

export default LogIn;
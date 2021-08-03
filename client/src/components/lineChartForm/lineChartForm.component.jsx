import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { createChart } from '../../redux/dashboard/dashboard.actions';
import ChartTypes from '../chart/utils/chart.types';
import ACCESSORS from '../chart/utils/accessors';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './lineChartForm.styles.scss';

const INITIAL_STATE = {
	dataGrid: {
		x: 0,
		y: 0,
		w: 4,
		h: 2,
		minH: 2,
	},
	type: ChartTypes.LINE_CHART,
	xData: '',
	xLabel: '',
	yData: '',
	yLabel: '',
}

const LineChartForm = ({ history }) => {

	const dispatch = useDispatch();

	const handleSubmit = (graphData) => dispatch(createChart(graphData)),

	const fields = Object.keys(ACCESSORS).map( (key) => {
		return { text: key, value: key}
	});

	return (
		<Row>
			<Card className='m-5'>
				<Card.Body>
					<Formik
						initialValues={INITIAL_STATE}
						onSubmit={handleSubmit}
					>
						{
							({ errors, handleChange, handleBlur, handleSubmit, values }) => (
								<React.Fragment>
	                <Form onSubmit={handleSubmit} >
	                  <Form.Group controlId='xData'>
	                    <Form.Label>Data for X axis:</Form.Label>
	                    <Form.Control
	                    	as='select'
	                      className={ 'xData' in errors ? 'is-invalid' : '' }
	                      name='xData'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      values={values.xData}
	                    >
		                    <option selected value={'DEFAULT'}> -- select a field -- </option>
												{fields.map( ({text, value}, index) => <option key={index} value={value}>{text}</option>)}
											</Form.Control>
	                    {
	                      'xData' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.xData }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='xLabel'>
	                    <Form.Label>Label for X axis:</Form.Label>
	                    <Form.Control
	                      className={ 'xLabel' in errors ? 'is-invalid' : '' }
	                      name='xLabel'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      values={values.xLabel}
	                    />
	                    {
	                      'xLabel' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.xLabel }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='yData'>
	                    <Form.Label>Data for Y axis:</Form.Label>
	                    <Form.Control
	                    	as='select'
	                      className={ 'yData' in errors ? 'is-invalid' : '' }
	                      name='yData'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      values={values.yData}
	                    >
		                    <option selected value={'DEFAULT'}> -- select a field -- </option>
												{fields.map( ({text, value}, index) => <option key={index} value={value}>{text}</option>)}
											</Form.Control>
	                    {
	                      'yData' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.yData }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='yLabel'>
	                    <Form.Label>Label for Y axis:</Form.Label>
	                    <Form.Control
	                      className={ 'yLabel' in errors ? 'is-invalid' : '' }
	                      name='yLabel'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      values={values.yLabel}
	                    />
	                    {
	                      'yLabel' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.yLabel }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Col className='text-center'>
	                  	<Button type="submit" variant='primary'>Create graph</Button>
	                  </Col>
	                </Form>
								</React.Fragment>
							)
						}
					</Formik>
				</Card.Body>
			</Card>
		</Row>
	);
};

export default LineChartForm;
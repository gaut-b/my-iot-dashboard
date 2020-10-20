import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { createGraph } from '../../redux/dashboard/dashboard.actions';
import ChartTypes from '../chart/utils/chart.types';
import ACCESSORS from '../chart/utils/accessors';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './gaugeChartForm.styles.scss';

const INITIAL_VALUES = {
		type: ChartTypes.GAUGE,
		observable: '',
		label: '',
		units: '',
		min: 0,
		minColor: '#dbdbe7',
		max: 100,
		maxColor: '#4834d4',
}

const GaugeForm = ({ createGraph, history }) => {

	const handleSubmit = (values) => {
		createGraph(values);
	}

	const fields = Object.keys(ACCESSORS).map( (key) => {
		return { text: key, value: key}
	});

	return (
		<Row>
			<Card className='m-5'>
				<Card.Body>
					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={handleSubmit}
					>
						{
							({ errors, handleChange, handleBlur, handleSubmit, values }) => (
								<React.Fragment>
	                <Form onSubmit={handleSubmit} >
	                  <Form.Group controlId='observable'>
	                    <Form.Label>Data:</Form.Label>
	                    <Form.Control
	                    	as='select'
	                      className={ 'observable' in errors ? 'is-invalid' : '' }
	                      name='observable'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      values={values.observable}
	                    >
		                    <option selected value={'DEFAULT'}> -- select a field -- </option>
												{fields.map( ({text, value}, index) => <option key={index} value={value}>{text}</option>)}
											</Form.Control>
	                    {
	                      'observable' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.observable }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='label'>
	                    <Form.Label>Label:</Form.Label>
	                    <Form.Control
	                      className={ 'label' in errors ? 'is-invalid' : '' }
	                      name='label'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      values={values.label}
	                    />
	                    {
	                      'label' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.label }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='units'>
	                    <Form.Label>Units:</Form.Label>
	                    <Form.Control
	                      className={ 'units' in errors ? 'is-invalid' : '' }
	                      name='units'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      values={values.units}
	                    />
	                    {
	                      'units' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.units }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='min'>
	                    <Form.Label>Minimum value:</Form.Label>
	                    <Form.Control
	                      className={ 'min' in errors ? 'is-invalid' : '' }
	                      type="number"
	                      name='min'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      value={values.min}
	                    />
	                    {
	                      'min' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.min }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='minColor'>
	                    <Form.Label>Minimum color:</Form.Label>
	                    <Form.Control
	                      className={ 'minColor' in errors ? 'is-invalid' : '' }
	                      name='minColor'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      type='color'
	                      value={values.minColor}
	                    />
	                    {
	                      'minColor' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.minColor }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='max'>
	                    <Form.Label>Maximum Value:</Form.Label>
	                    <Form.Control
	                      className={ 'max' in errors ? 'is-invalid' : '' }
	                      name='max'
	                      type='number'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      value={values.max}
	                    />
	                    {
	                      'max' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.max }</Form.Control.Feedback>
	                    }
	                  </Form.Group>
	                  <Form.Group controlId='maxColor'>
	                    <Form.Label>Maximum Color:</Form.Label>
	                    <Form.Control
	                      className={ 'maxColor' in errors ? 'is-invalid' : '' }
	                      name='maxColor'
	                      type='color'
	                      onChange={handleChange}
	                      onBlur={handleBlur}
	                      value={values.maxColor}
	                    />
	                    {
	                      'maxColor' in errors &&
	                      <Form.Control.Feedback type='invalid'>{ errors.maxColor }</Form.Control.Feedback>
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

const mapDispatchToProps = dispatch => ({
	createGraph: (graphData) => dispatch(createGraph(graphData)),
})

export default connect(null, mapDispatchToProps)(GaugeForm);

// <div className='formContainer'>
// 			<div className='title'>Create a gauge</div>
// 			<form action="">
// 				<div>
// 					<label>Data</label>
// 					<select name="observable" required onChange={handleChange} defaultValue={'DEFAULT'}>
// 						<option disabled value={'DEFAULT'}> -- select a field -- </option>
// 						{fields.map( ({text, value}, index) => <option key={index} value={value}>{text}</option>)}
// 					</select>
// 				</div>
// 				<div>
// 					<label>Label</label>
// 					<input type="text" name="label" value={graphData.label} onChange={handleChange} required/>
// 				</div>
// 				<div>
// 					<label>Units</label>
// 					<input type="text" name="units" value={graphData.units} onChange={handleChange} required/>
// 				</div>
// 				<div>
// 					<label>Min</label>
// 					<input type="number" name="min" value={graphData.min} onChange={handleChange} required/>
// 				</div>
// 				<div>
// 						<label htmlFor="maxColor">Min Color</label>
// 				    <input type="color" name="minColor" value={graphData.minColor} onChange={handleChange} />
// 				</div>
// 				<label>
// 					Max
// 					<input type="number" name="max" value={graphData.max} onChange={handleChange} required/>
// 				</label>
// 				<div>
// 				    <label htmlFor="maxColor">Max Color</label>
// 				    <input type="color" name="maxColor" value={graphData.maxColor} onChange={handleChange} />
// 				</div>
// 				<button type="submit" onClick={handleSubmit}>Create gauge</button>
// 			</form>
// 		</div>
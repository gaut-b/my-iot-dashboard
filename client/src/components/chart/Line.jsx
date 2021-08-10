import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { accessorPropsType } from './utils/useChartDimensions';

import './Chart.scss';

import * as d3 from 'd3';

const Line = ({ type, data, dimensions, interpolation, xAccessor, yAccessor, y0Accessor, ...props }) => {

	let svgRef = useRef(null);

	const lineGenerator = d3[type]()
			.x(xAccessor)
			.y(yAccessor)
			.curve(interpolation)


	// if (type === "area") {
	// 	lineGenerator
	// 			.y0(y0Accessor)
	// 			.y1(yAccessor)
	// }  

	// d3.select(svgRef.current)
	// 		.append('clipPath')
	// 			.attr('id', 'bounds-clip-path')
	// 		.append('rect')
	// 			.attr('width', dimensions.boundedWidth)
	// 			.attr('height', dimensions.boundedHeight)

	// const clip = d3.select(svgRef.current)
	// 		.attr('clip-path', 'url(#bounds-clip-path)')

	// clip.append('path')

	// useEffect(() => {

	// 	const lastTwoPoints = data.slice(-2);
	// 	const pixelsBetweenLastPoints = xAccessor(lastTwoPoints[1]) - xAccessor(lastTwoPoints[0]);

	// 	d3.select(svgRef.current)
	// 		.selectAll('path')
	// 			.attr('d', lineGenerator(data))
	// 			.style('transform', `translateX(${pixelsBetweenLastPoints}px)`)
	// 		.transition().duration(1000)
	// 			.style('transform', 'none')

	// }, [data])


	return(
		<svg wdith={dimensions.boundedWidth} height={dimensions.boundedHeight} ref = {svgRef} >
			<path
				{...props}
				className={`Line Line--type-${type}`}
				d = {lineGenerator(data)}
			/>
		</svg>

	);
};

Line.propType = {
	type: PropTypes.oneOf(['line', 'area']),
	data: PropTypes.array,
	xAccessor: accessorPropsType,
	yAccessor: accessorPropsType,
	y0Accessor: accessorPropsType,
	interpolation: PropTypes.func
};

Line.defaultProps = {
	type: 'line',
	y0Accessor: 0,
	interpolation: d3.curveMonotoneX
};

export default Line;


import * as d3 from 'd3';

const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%SZ")
const dateAccessor = d => parseDate(d.time)
const humAccessor = d => d.humidity
const tempAccessor = d => d.temp
const lumAccessor = d => d.luminosity
const deviceIdAccessor = d => d.deviceId

const ACCESSORS = {
	temp: tempAccessor,
	hum: humAccessor,
	time: dateAccessor,
	lum: lumAccessor,
	deviceId: deviceIdAccessor,
};

export default ACCESSORS;
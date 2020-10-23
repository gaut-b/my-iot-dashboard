import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { initData, addLastData } from '../../redux/data/data.actions';
import { moveChart } from '../../redux/dashboard/dashboard.actions';

import ChartContainer from '../../components/chartContainer/chartContainer.component';
import ChartCreatorContainer from '../../components/chartCreatorContainer/chartCreatorContainer.component';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

import './dashboardPage.styles.scss';
// Import needed for react-grid-layout
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardPage = ({ data, dashboard, initData, addLastData, moveChart }) => {

  const [isSidebarVisible, setSidebarVisible] = useState(false);

	const ws = useRef(null);

	useEffect(() => {
    async function fetchData() {
      let headers={
          "Accept": "application/json",
          "Content-Type": "application/json",
      };

      const res = await fetch('http://iot-backend.gautier-bayle.fr/data/', headers);
      res
        .json()
        .then(res => initData(res))
        .catch(err => console.log(err));
    }

    if (Object.keys(dashboard).length) {
    	if (!data.data.length) {
    		fetchData();
    	}

    	if (!ws.current) {
		    ws.current = new WebSocket('ws://iot-backend.gautier-bayle.fr/ws/pubsub/1B290A4/');
		    ws.current.onopen = () => console.log('ws opened');
		    ws.current.onclose = () => console.log('ws closed')
		    ws.current.onmessage = (e) => {
		        const message = JSON.parse(e.data);
		        addLastData(message.message)
		    }

		    return () => {
		    	ws.current.close();
		    	ws.current = null;
		    };
		  }
    }

  }, [dashboard]);

  const handleDrop = (elem) => console.log(elem)

  const layout = (dashboard, data) => {
     if (!Object.keys(dashboard).length) {
      return null;
    } else if (!data.data.length) {
      return <div className="loader"></div>
    } else {
      return dashboard.map((chart, index) =>
        <div key={chart.id} data-grid={chart.dataGrid}>
          <ChartContainer key={index} chartIndex={index} data={data.data} chartInfos={chart} />
        </div>
    )}
  }

  return(
    <div className='dashboardContainer h-100'>
      <ChartCreatorContainer isSidebarVisible={isSidebarVisible} toggleSidebar={setSidebarVisible} />
          <ResponsiveGridLayout
            className="layout"
            breakpoints={{lg: 1200}}
            cols={{lg: 4}}
            onDragStop={console.log}
          >
          {layout(dashboard, data)}
          </ResponsiveGridLayout>
          <Container className="editPanel">
            <Button hidden={isSidebarVisible} size="sm" variant='link' onClick={() => setSidebarVisible(!isSidebarVisible)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button hidden={isSidebarVisible} size="sm" variant='link' onClick={() => setSidebarVisible(!isSidebarVisible)}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
          </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
    data: state.data,
    dashboard: state.dashboard,
})

const mapDispatchToProps = dispatch => ({
    initData: (data) => dispatch(initData(data)),
    addLastData: (data) => dispatch(addLastData(data)),
    moveChart: (source, destination) => dispatch(moveChart(source, destination)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
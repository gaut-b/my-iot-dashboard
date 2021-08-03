import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { initData, addLastData } from '../../redux/data/data.actions';
import { updateLayout } from '../../redux/dashboard/dashboard.actions';

import ChartContainer from '../../components/chartContainer/chartContainer.component';
import ChartCreatorContainer from '../../components/chartCreatorContainer/chartCreatorContainer.component';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

import './dashboardPage.styles.scss';
// Import needed for react-grid-layout
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardPage = () => {
  console.log(process.env)
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const dashboard = useSelector(state => state.dashboard);

  // The isUserAdmin will be stored in user state when implemented
  const [isUserAdmin, setUserAdmin] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLayout, setCurrentLayout] = useState({});

	const ws = useRef(null);

	useEffect(() => {
    async function fetchData() {
      let headers={
          "Accept": "application/json",
          "Content-Type": "application/json",
      };

      const res = await fetch('http://iot-backend.gautier-bayle.fr/data/', headers);
      const jsonRes = await res.json();
      try {
        dispatch(initData(jsonRes))
      } catch (err) {
        console.log(err)
      }
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
		        dispatch(addLastData(message.message))
		    }

		    return () => {
		    	ws.current.close();
		    	ws.current = null;
		    };
		  }
    }

  }, [dashboard]);

  const finishEditing = () => {
    setIsEditing(false);
    dispatch(updateLayout(currentLayout));
  }

  const onLayoutChange = (layout) => setCurrentLayout(layout);

  const layout = (dashboard, data) => {
    if (!Object.keys(dashboard).length) {
      return null;
    } else if (!data.data.length) {
      return <div className="loader"></div>
    } else {
      return dashboard.map((chart, index) =>
        <div key={chart.id} data-grid={chart.dataGrid}>
          <ChartContainer key={index} isEditing={isEditing} chartIndex={index} data={data.data} chartInfos={chart} />
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
          onLayoutChange={onLayoutChange}
          isResizable={isEditing}
          isDraggable={isEditing}
        >
          {layout(dashboard, data)}
        </ResponsiveGridLayout>
        <Container className="editPanel" hidden={!isUserAdmin}>
          { (isEditing) ?
            <Button hidden={isSidebarVisible} size="sm" variant='link' onClick={finishEditing}>
              <FontAwesomeIcon icon={faSave} />
            </Button> :
            <Button hidden={isSidebarVisible} size="sm" variant='link' onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          }
          <Button hidden={isSidebarVisible} size="sm" variant='link' onClick={() => setSidebarVisible(!isSidebarVisible)}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </Container>
    </div>
  );
};


export default DashboardPage;
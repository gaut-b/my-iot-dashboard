import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { initData, addLastData } from '../../redux/data/data.actions';

import ChartContainer from '../../components/chartContainer/chartContainer.component';
import ChartCreatorContainer from '../../components/chartCreatorContainer/chartCreatorContainer.component';


const DashboardPage = ({ data, dashboard, initData, addLastData }) => {

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

    return(
        <div>
            <ChartCreatorContainer />
            	{
	            	(!Object.keys(dashboard).length) ? null :
	            	<React.Fragment>
	            		{
	            			(!data.data.length) ? <div className="loader"></div> :
		                <div className = 'homepage-container__content' >
		                    {Object.keys(dashboard).map((key, index) => <ChartContainer key={index} data={data.data} chartInfos={dashboard[key]} />)}
		                </div>
		              }
	              </React.Fragment>
            	}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
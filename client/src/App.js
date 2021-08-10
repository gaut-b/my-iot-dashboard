import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotificationsSystem, {
  setUpNotifications,
  atalhoTheme,
  dismissNotification
} from 'reapop';

import Router from './Router';

import 'bootswatch/dist/lumen/bootstrap.css';
import './App.css';

setUpNotifications({
    defaultProps: {
        position: 'bottom-right',
        dismissible: true,
        dismissAfter: 3000,
        showDismissButton: true,
    } 
})

const App = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  return (
    <>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={atalhoTheme}
      />
      <Router />
    </>
  );
};

export default App;

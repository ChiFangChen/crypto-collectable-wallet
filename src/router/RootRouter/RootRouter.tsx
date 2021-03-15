import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import MainList from 'pages/MainList';

const RootRouter: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/list" component={MainList} />
        <Redirect path="*" to="/list" />
      </Switch>
    </Router>
  );
};

export default RootRouter;

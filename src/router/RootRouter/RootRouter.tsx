import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { PUBLIC_URL } from 'utils/variables';
import MainList from 'pages/MainList';
import Detail from 'pages/Detail';

const RootRouter: FC = () => {
  return (
    <Router basename={PUBLIC_URL}>
      <Switch>
        <Route exact path="/detail/:contract_address/:token_id" component={Detail} />
        <Route path="/list" component={MainList} />
        <Redirect path="*" to="/list" />
      </Switch>
    </Router>
  );
};

export default RootRouter;

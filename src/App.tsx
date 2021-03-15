import React, { Suspense } from 'react';
import 'fontsource-roboto';
import 'normalize.css';

import './i18n.ts';
import './index.css';
import Spinner from 'components/Spinner';
import RootRouter from 'router/RootRouter';

function App() {
  return (
    <Suspense fallback={<Spinner wrapperHeight="100vh" />}>
      <RootRouter />
    </Suspense>
  );
}

export default App;

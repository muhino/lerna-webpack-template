import Leaf from 'leaf';
import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Set a route prefix so this will work when we deploy to github pages.
// If you fork this repo, update this value and in the webpack / package.json
// to be able to deploy to your repo as well.
const routePrefix = '/lerna-webpack-template';

// Create an async wrapper around our async-leaf component.
// Only want to load this component on the '/async' path
const LoadableAsyncLeaf = React.lazy(() => {
  // We are intentionally ignoring here as this leaf is in JS not TS. This is useful
  // if you want to progressively update your packages over to TS.
  return import(/* webpackChunkName: 'async-leaf' */ 'async-leaf')
});

const LoadingState = (
  <div style={{ background: 'aqua', width: '100px', height: '100px' }}>
    Loading...
  </div>
);

const BasicRouting = () => (
  <Suspense fallback={LoadingState}>
    <Router>
      <div>
        <a href={`${routePrefix}/async`}>Hard redirect to /async</a>
        <br />
        <a href={`${routePrefix}/`}>Hard redirect to /</a>
        <br />
        <br />

        {/* We can still use external routing (e.g. page redirects) to load our components. */}
        <Route exact={true} path={routePrefix} component={Leaf} />
        <Route path={`${routePrefix}/async`} component={LoadableAsyncLeaf} />
      </div>
    </Router>
  </Suspense>
);

const container = document.getElementById('react-root');
render(<BasicRouting />, container);

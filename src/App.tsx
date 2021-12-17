import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/styles/tailwind.css';
import '../assets/styles/index.css';

// Create a client
const queryClient = new QueryClient();

// Views
import Index from './views/Index';

// Remote Views
//import RemoteComponent from 'remote_mf/RemoteComponent';

ReactDOM.render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <BrowserRouter>
      <Switch>
        {/* add mf routes here */}
        {/* <Route path='/remote' component={RemoteComponent} /> */}
        <Route path='/' exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from='*' to='/' />
      </Switch>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root'),
);

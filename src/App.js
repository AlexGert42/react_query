import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Content } from './components/Content'
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  app: {
    background: grey[100],
    minHeight: 'calc(100vh - 220px)',
    padding: '100px 50px'
  },
});



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  const classes = useStyles()
  return (
    <QueryClientProvider client={queryClient}>


      <div className={classes.app}>
        <Content/>
      </div>
   

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
   
  );
}

export default App;

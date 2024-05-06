import React from 'react';
import RegistrationForm from './form';
import ApolloProvider from './apoloProvider';



function App() {
  return (
    <ApolloProvider>
      <RegistrationForm />
    </ApolloProvider>
  );
}


export default App;

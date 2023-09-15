import React from 'react';
 
// Creating the context object and passing the default values.
const authContext = React.createContext({valueNew:null,setValue:()=>{}});
 
export default authContext;
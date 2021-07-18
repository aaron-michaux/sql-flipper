
const initialState = {
    host : '127.0.0.1',
    port: 5432,
    user : 'junibee',
    password : 'jhPMkLvpST7eQaM5gYUdZlHNqQd3O1',
    database : 'dvdrental'
};

const dbCredentialsReducer = (state = initialState, action) => {
  switch (action.type) {   
    default:
      return {
          ...state,
          error: `Unhandled action type = '${action.type}'`
      };
  }
};

export default dbCredentialsReducer;
 

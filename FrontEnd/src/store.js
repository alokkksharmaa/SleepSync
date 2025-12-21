import { createStore } from 'redux';

// Reducer (Understanding Redux flow)
const initialState = { user: null, logs: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOGS':
      return { ...state, logs: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
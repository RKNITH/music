import { createContext, useReducer } from "react";

export const QueueContext = createContext();

const addSongToQueue = (state, action) => {
  switch (action.type) {
    case "ADD_TO_QUEUE":
      return [...state, action.payload];
    case "REMOVE_FROM_QUEUE":
      return state.filter((song) => song._id !== action.payload);
    default:
      return state;
  }
};

const addSongToList = (state, action) => {
  switch (action.type) {
    case "ADD_SONG":
      return [...state, action.payload];
    case "REMOVE_SONG":
      return state.filter((song) => song.title !== action.payload);
    default:
      return state;
  }
};

export const QueueContextState = ({ children }) => {
  const initialQueue = [
    
  ];
  const initialList = [];

  const [queue, dispatchQueue] = useReducer(addSongToQueue, initialQueue);
  const [list, dispatchList] = useReducer(addSongToList, initialList);

  return (<QueueContext.Provider value={{list,queue,dispatchList,dispatchQueue}}>
    {children}
  </QueueContext.Provider>);
};

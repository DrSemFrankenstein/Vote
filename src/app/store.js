import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import reducer from "./reducer";
import mockData from "../assets/mockData.json"; // Import the mock data
import { setInitialData } from "./actions";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Create the Redux store
const store = createStore(persistedReducer);

// Create the persistor
export const persistor = persistStore(store);

const initializeStore = () => {
  const state = store.getState();

  // Check if there's no data in the store
  if (state.items.length === 0) {
    // Dispatch initial data to the store
    store.dispatch(setInitialData(mockData));
  }
};

// Initialize the store
initializeStore();

export default store;

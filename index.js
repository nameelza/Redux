function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo])
  }

  return state;
}

function createStore() {
  // The store has four parts:
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
      state = todos(state, action)
      listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  };
}

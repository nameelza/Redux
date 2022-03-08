function todos(state = [], action) {
  if (action === "ADD_TODO") {
    state.concat([action.todo]);
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

  return {
    getState,
    subscribe,
  };
}

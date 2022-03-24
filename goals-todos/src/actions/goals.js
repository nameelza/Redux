import API from 'goals-todos-api';

export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";

function addGoal(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}

function removeGoal(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

export function handleAddGoal(name, callback) {
  return (dispatch) => {
    return API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoal(goal));
        callback();
      })
      .catch(() => {
        alert("An error occurred. Try again");
      });
  };
}

export function handleDeleteGoal(item) {
  return (dispatch) => {
    dispatch(removeGoal(item.id));

    return API.deleteGoal(item.id).catch(() => {
      dispatch(addGoal(item));
      alert("An error occured. Try again");
    });
  };
}

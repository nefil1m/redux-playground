let id = 0;

export const todo = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: id++,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(action.id !== state.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

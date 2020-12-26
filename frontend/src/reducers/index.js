export const countReducer = function (state = [], action) {
  switch (action.type) {
    case 'ADD_NEW_FORM':
      console.log('ADD_NEW_FORM action called');
      state.unshift(action.payload);
      return state;
    case 'ALL_FORMS':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

import { ADD_USER } from 'components/constants/ActionTypes';

const initialState =
  {
      account:'test@payegis.com',
      name: '',
      password:'',
      roler:''
  };

export default function addUserModal(state = initialState, action ) {
  switch (action.type) {
    case ADD_USER:
        state.account=action.json.account;
        state.name=action.json.name;
        state.password=action.json.password;
        state.roler=action.json.roler;

      return state;

    default:
      return state
  }
}

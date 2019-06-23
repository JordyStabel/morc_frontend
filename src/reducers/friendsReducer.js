import { GET_FRIENDS, ADD_FRIEND, REMOVE_FRIEND } from "../actions/types";

const initialState = {
  friends: [
    {
      id: "1",
      userName: "Henk",
      credits: 784,
      online: true
    },
    {
      id: "2",
      userName: "Karen",
      credits: 394,
      online: false
    },
    {
      id: "3",
      userName: "Josh",
      credits: 923,
      online: true
    },
    {
      id: "4",
      userName: "Marshall",
      credits: 235,
      online: true
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        // Filter out the friends with the same id as the payload (which is an id)
        friends: state.friends.filter(friend => friend.id !== action.payload)
      };
    case ADD_FRIEND:
      return {
        ...state,
        // Add the new friend (from the payload) to the friends array in from the state
        // In this case as the first friend in the array
        friends: [action.payload, ...state.friends]
      };
    default:
      return state;
  }
}

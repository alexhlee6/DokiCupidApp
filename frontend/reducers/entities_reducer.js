import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import profilesReducer from "./profiles_reducer";
import matchesReducer from "./matches_reducer";
import conversationsReducer from "./conversations_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  profiles: profilesReducer,
  matches: matchesReducer,
  conversations: conversationsReducer
});

export default entitiesReducer;
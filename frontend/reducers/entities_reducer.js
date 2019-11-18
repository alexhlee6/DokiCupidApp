import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import profilesReducer from "./profiles_reducer";
import matchesReducer from "./matches_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  profiles: profilesReducer,
  matches: matchesReducer
});

export default entitiesReducer;
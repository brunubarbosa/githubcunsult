import { combineReducers } from 'redux';

import repositories from './repositories'
import issues from './issues'

export default combineReducers({
    repositories,
    issues,
})

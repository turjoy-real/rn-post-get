import {
    SET_USERS,
    CREATE_USER
} from '../action/users';
import User from '../../models/User';

const initialState = {
    currentUsers: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                currentUsers: action.users
            };

        case CREATE_USER:
            const newUser = new User(
                action.eid,
                action.userData.userName,
                action.userData.age,
                action.userData.address,
                action.userData.activity
            )


            return {
                ...state,
                currentUsers: state.currentUsers.concat(newUser)
            }
    }
    return state
}
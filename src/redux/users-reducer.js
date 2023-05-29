import { usersAPI } from '../DAL/api';




let _usersState = {
    isFetching: false,
    currentUsersPage: 1,
    usersPerList: 5,
    totalUsersCount: 0,
    totalPages: 0,
    users: [],
    userFriendlist: [],
    currentProfilePageUserInfo: {
        profilePic: '',
        status: '',
        fullName: '',
        info: {},
        contacts: {},
        photo: '',
        aboutMe: '',
        id:'',
        userWallPosts: [],
    },

    
}

export function usersReducer(state = _usersState, action) {

    switch (action.type) {

        case 'SET_CURRENT_USER_WALL_POSTS' : {
            let CPPUIcopy = {...state.currentProfilePageUserInfo};
            CPPUIcopy.userWallPosts = action.posts;
            CPPUIcopy.userWallPosts = CPPUIcopy.userWallPosts.map(el => {
                el.likes = JSON.parse(el.likes)
                return el;
            })
            return {
                ...state,
                currentProfilePageUserInfo : CPPUIcopy

            }
        }
        case 'REMOVE_USER_DATA': {
        }
        case 'SET_USER_FRIENDLIST': {
            return {
                ...state,
                userFriendlist: action.friendList
            }
        }

        case 'ADD_REMOVE_USER': {
            let usersCopy = [...state.users];
            usersCopy[action.i].followed = !usersCopy[action.i].followed;
            return {
                ...state,
                users: usersCopy,
            }
        }

        case 'SET_CURRENT_PROFILE_DATA': {
            let currentUserProfileCopy = {...state.currentProfilePageUserInfo};
                currentUserProfileCopy.fullName = action.fullName || currentUserProfileCopy.fullName;
                currentUserProfileCopy.info = JSON.parse(action.info) || currentUserProfileCopy.info;
                currentUserProfileCopy.photo = action.photo || currentUserProfileCopy.photo;
                currentUserProfileCopy.status = action.status || currentUserProfileCopy.status;
                currentUserProfileCopy.profilePic = action.profilePic || currentUserProfileCopy.profilePic;

            return {
                ...state,
                currentProfilePageUserInfo: currentUserProfileCopy
            }
        }

        case 'SET_PAGINATION_PAGE': {
            return {
                ...state,
                currentUsersPage: action.page,
                users: action.users,
            }
        }

        case 'SET_CURRENT_PROFILE_PAGE_USER_ID' : {
            let currentUserProfileCopy = {...state.currentProfilePageUserInfo}
            currentUserProfileCopy.id = action.id
            return {
                ...state,
                currentProfilePageUserInfo: currentUserProfileCopy,
            }
        }

        case 'SET_USERS': {
            let totalPagesCopy = Math.ceil((action.totalUsersCount|| state.totalUsersCount) / state.usersPerList);
            return {
                ...state,
                users: [...action.users],
                totalUsersCount: action.totalUsersCount || state.totalUsersCount,
                totalPages: totalPagesCopy,
                currentUsersPage: action.page || state.currentUsersPage
            }

        }

        case 'LOAD_MORE_USERS': {
            
            let currentUsersPageCopy = state.currentUsersPage;
            currentUsersPageCopy += 1;
            return {
                ...state,
                currentUsersPage: currentUsersPageCopy,
                users: [...state.users, ...action.users]
            }
        }

        default: return state
    }

}


export const getUserListThunkCreator = (token, id) => {

    return (dispatch, getState) => {
        usersAPI.getUsers(token, getState().usersReducer.currentUsersPage, getState().usersReducer.usersPerList, id)
        .then(res => {
            dispatch({ type: 'SET_USERS', users: res.data.users, totalUsersCount: res.data.totalUsers, })
            dispatch({ type: 'SET_USER_FRIENDLIST', friendList: res.data.friends })
        })
    }
}


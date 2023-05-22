import { usersAPI } from '../DAL/api';

let _authState = {
    id: null,
    authorized: null,
    errorMessage: null,
    userData: {
        name: '',
        email: '',
        info: {
            age: '',
            gender: '',
            city: '',
        },
        photo: '',
        status: '',
        profilePic: '',
    }
}

export const authReducer = (state = _authState, action) => {

    switch (action.type) {

        case 'USER_STATUS_TEXT_HANDLER': {
            return {
                ...state,
                userData: { ...state.userData, status: action.statusText }
            }
        }

        case 'USER_NAME_SETTINGS_HANDLER': {
            return {
                ...state,
                userData: { ...state.userData, name: action.name }
            }
        }

        case 'USER_EMAIL_SETTINGS_HANDLER': {
            return {
                ...state,
                userData: { ...state.userData, email: action.email }
            }
        }

        case 'USER_PHOTO_SETTINGS_HANDLER': {
            console.log(`photo >>> `, action);
            return {
                ...state,
                userData: { ...state.userData, photo: action.photo }
            }
        }

        case 'USER_PROFILE_PIC_HANDLER': {
            console.log(`profilePic >>> `, action);
            return {
                ...state,
                userData: { ...state.userData, profilePic: action.profilePic }
            }
        }

        case 'USER_GENDER_SETTINGS_HANDLER': {
            return {
                ...state,
                userData: { ...state.userData, info: { ...state.userData.info, gender: action.gender } }
            }
        }
        case 'USER_AGE_SETTINGS_HANDLER': {
            return {
                ...state,
                userData: { ...state.userData, info: { ...state.userData.info, age: action.age } }
            }
        }
        case 'USER_CITY_SETTINGS_HANDLER': {
            return {
                ...state,
                userData: { ...state.userData, info: { ...state.userData.info, city: action.city } }
            }
        }

        case 'SET_USER_INFO_AFTER_LOGIN': {
            console.log(action.userData);
            let userDataCopy = { ...action.userData };
            if (userDataCopy.info) userDataCopy.info = JSON.parse(userDataCopy.info);
            else userDataCopy.info = { age: '', gender: '', city: '' };
            console.log(`userDataCopy >> `, action.userData);
            return {
                ...state,
                authorized: true,
                userData: { ...userDataCopy },
                id: action.id

            }
        }

        case 'SET_AUTHORIZED': {
            return {
                ...state,
                authorized: action.authorized,
                errorMessage: action.errorMessage
            }
        }

        case 'SET_LOGIN': {
            return {
                ...state,
                login: action.login
            }
        }

        case 'SET_PASS': {
            return {
                ...state,
                pass: action.pass
            }
        }

        default: return state
    }
}

export const fetchAndDispatchProfilePicThunkCreator = (formData, setLoaderProfPic) => {
    
    return dispatch => {
        console.log(`fetchAndDispatchProfilePicThunkCreator`);
        usersAPI.fetchProfilePic(formData).then(res => {
            dispatch({ type: 'USER_PROFILE_PIC_HANDLER', profilePic: res.data.filePath });
            setLoaderProfPic(false);
        });
    }
}
export const fetchAndDispatchAvatarThunkCreator = (formData, setLoaderAvatar) => {
    return dispatch => {
        usersAPI.fetchAvatar(formData).then(res => {
            dispatch({ type: 'USER_PHOTO_SETTINGS_HANDLER', photo: res.data.filePath });
            setLoaderAvatar(false);
        })
        
    }
}
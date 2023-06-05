import axios from "axios";


export const usersAPI = {

    sendUserWallPost: (from, to, message, reply) => {
        console.log(`DAL >> `, reply);
        return axios.post('http://193.168.46.22:3005/user_wall_posts', {
            from: from,
            to: to,
            message: message,
            reply: reply
        })
    },

    updateProfileSettings: (token, settings, ownerId) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        return axios.post('http://193.168.46.22:3005/update_user_settings', {
            id: ownerId,
            settings
        }, {
            headers
        })
    },
    sendMsg : (ownerId, to_id, msg) => {
        console.log(ownerId, to_id, msg);
        return axios.post('http://193.168.46.22:3005/messages/post', {

                from_id: ownerId,
                to_id: to_id,
                message: msg

            })
    },
    updateUsersStatus: (token, id, statusText) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        return axios.post('http://193.168.46.22:3005/update_user_status', {
            id: id,
            statusText: statusText
        },
            {
                headers
            })
    },
    updatepost: (action) => {

        let body;

        switch (action.type) {

            case 'editPost': {
                body = {
                    type: action.type,
                    postId: action.postId,
                    message: action.message
                }
                break;
            }

            case 'updateLikes': {
                body = {
                    type: action.type,
                    postId: action.postId,
                    likes: action.likes
                }
                break;
            }

            case 'deletePost': {
                body = {
                    type: action.type,
                    postId: action.postId
                }
                break;
            }

            default: return
        }


        return axios.post('http://193.168.46.22:3005/updatepost', body)
    },
    getCurrentUser: (id) => {
        return axios.get(`http://193.168.46.22:3005/users/${id}`)
    },
    getUsers: (token, page, limit, id) => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }

        return axios.get(`http://193.168.46.22:3005/users?page=${page}&limit=${limit}&id=${id}`, {
            headers
        })
    },
    getFilteredUsers: (name, page) => {

        return axios.post('http://193.168.46.22:3005/filteredUsers', { name: `%${name}%`, page: page })
    }
    ,
    getUserFriendlist: (id, token) => {
        return axios.get(`http://193.168.46.22:3005/user/friends?id=${id}`, {
            headers: {
                Authorization: token
            }
        })
    },
    getUserPosts: (userId) => {
        return axios.get(`http://193.168.46.22:3005/user_wall_posts?to=${userId}`)
    },
    postFollowUser: (userId, followId) => {
        console.log(`add to friend called from api`, userId, followId);
        return axios.post(`http://193.168.46.22:3005/follow/`, {
            userId: userId,
            followId: followId
        })
    },
    deleteUnfollowUser: (userId, followId) => {

        return axios.post(`http://193.168.46.22:3005/unfollow/`, {

            userId: userId,
            followId: followId

        })
    },

    logout: () => {
        return axios.delete(`https://social-network.samuraijs.com/api/1.0/auth/login`, {
            withCredentials: true,
        })
    },

    authentification: (token, id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        return axios.post('http://193.168.46.22:3005/auth/me', {
            id: id
        }, {
            headers
        })
    },

    fetchProfilePic: (formData) => {
        return axios.post('http://193.168.46.22:3005/upload?type=profile_background', formData)
    },

    fetchAvatar: (formData) => {
        console.log(`DAL fetchAndDispathAvatar`);
        return axios.post('http://193.168.46.22:3005/upload?type=photo', formData)
    },

    authorizedMe: (login, password) => {
        return axios.post('http://193.168.46.22:3005/auth/login', {
            login: login,
            password: password
        })
    },

    getDialogContacts: (ownerId) => {
        return axios.get(`http://193.168.46.22:3005/messages/contacts?ownerId=${ownerId}`)
    },
    getDialogContactsUnreads: (ownerId, contragentId) => {
        return axios.get(`http://193.168.46.22:3005/messages/unreads?ownerId=${ownerId}&contragentId=${contragentId}`)
    },
    getDialogMessages: (ownerId, userId) => {
        return axios.get(`http://193.168.46.22:3005/messages/get?ownerId=${ownerId}&userId=${userId}`)
    },


}

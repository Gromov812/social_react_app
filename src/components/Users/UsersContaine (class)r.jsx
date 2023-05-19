import React, { useEffect, useState, Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Users from './Users'
import u from './Users.module.css';
import UserProfileBlock from './User-profile-block'
import Preloader from '../Preloader/Preloader'
import { deleteUnfollowUser, initialUsersSet, postFollowUser, usersAPI } from '../../DAL/api';
import Cookies from 'universal-cookie';
import axios, { Axios } from 'axios';
import { connect } from 'react-redux';

const generatePagination = (curPage, lastPage) => {

    let arrOfPages = []
    let nextPage = curPage
    let prevPage = curPage



    if (lastPage == curPage) {
        for (let i = curPage; i > curPage - 6; i--) {
            prevPage -= 1
            arrOfPages.unshift(prevPage)
        }
        arrOfPages.push(curPage)
    }
    if (curPage > 3 && curPage != lastPage) {
        for (let i = curPage; i > curPage - 2; i--) {
            prevPage -= 1
            arrOfPages.push(prevPage)
        }
        arrOfPages.reverse()
        arrOfPages.push(curPage)
        for (let i = 0; i < 2; i++) {
            nextPage += 1
            arrOfPages.push(nextPage)
        }
    }
    if (curPage == 1) {
        arrOfPages.push(1)
        for (let i = 0; i < 5; i++) {
            nextPage += 1
            arrOfPages.push(nextPage)
        }
    }
    if (curPage == 2) {
        arrOfPages.push(1)
        arrOfPages.push(curPage)
        for (let i = 0; i < 4; i++) {
            nextPage += 1
            arrOfPages.push(nextPage)
        }
    }
    if (curPage == 3) {
        arrOfPages.push(1)
        arrOfPages.push(2)
        arrOfPages.push(curPage)
        for (let i = 0; i < 3; i++) {
            nextPage += 1
            arrOfPages.push(nextPage)
        }
    }
    if (curPage != lastPage) {
        arrOfPages.push(lastPage)
    }
    if (curPage >= 4) {
        arrOfPages.unshift(1)
    }

    return arrOfPages
}

const cookie = new Cookies();



class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            test: 1,
            isFatching: false,
            token: cookie.get('cookie localhost'),
            authState: this.props.authReducer,
            usersState: this.props.usersReducer,
            usersComponents: null,
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.loadMoreUsers = this.loadMoreUsers.bind(this);
        this.setPagination = this.setPagination.bind(this);
        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    usersAPI.getUsers(this.state.token, this.state.usersState.currentUsersPage, this.state.usersState.usersPerList)
        .then(res => {
            console.log(`users getted!`);
            this.props.dispatchUsers(res.data.users, res.data.totalUsers)
            this.setState({isFatching: false})

        })
        .then(()=> {
            console.log(this.state.usersState);
        })

        axios.get(`http://127.0.0.1:3005/user/friends?id=${this.state.authState.id}`, {headers: {
            Authorization: this.state.token
            }})
            .then(res => {
                console.log(`friendlist setted!`);
                this.props.dispatchUserFriendlist(res.data.friends)
            })
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {
        
    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() { }

    loadMoreUsers() {
        this.setState({ ...this.state, isFatching: true });
        usersAPI.getUsers(this.state.token, this.state.usersState.currentUsersPage + 1, this.state.usersState.usersPerList).then(res => {
            this.props.dispatchMoreUsers(res.data.users)
        })

        .then(() => {
                this.setState({ ...this.state, isFatching: false })
            })
    }

    setPagination(page) {

        this.setState({ ...this.state, isFatching: true })

        usersAPI.getUsers(this.state.token, page, this.state.usersState.usersPerList)
            .then(res => {
                this.props.dispatchPaginationPage(page, res.data.users)
            })
            .then(() => {
                this.setState({ ...this.state, isFatching: false })
            })
    }

    followUser(userId, followId) {
        usersAPI.postFollowUser(userId, followId).then(res => console.log(res))
    }

    unfollowUser(userId, followId) {
        usersAPI.deleteUnfollowUser(userId, followId)
    }
    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    render() {

        let users = this.state.usersComponents.users.map((el) => {
            let followed = this.state.usersComponents.userFriendlist.map(el => el.id).includes(el.id);          
            return <>
                <UserProfileBlock key={crypto.randomUUID()} follow={followed} unfollowUser={unfollowUser} followUser={followUser} photo={el.photo} userId={id} name={el.name} id={el.id} avatar={'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_male_person-256.png'} dispatch={dispatch} />
            </>
        })

        let pages = generatePagination(this.state.usersState.currentUsersPage, this.state.usersState.totalPages).map(el => {
            return <> <span key={crypto.randomUUID()} onClick={() => this.setPagination(el)} className={`${u.elem} ${el == this.state.usersState.currentUsersPage ? u.active_elem : ''}`}>{el}</span></>
        })

        return (
            <>
        {isFetching ? <Preloader /> : <Users key={crypto.randomUUID()} users={users} loadMoreUsers={this.loadMoreUsers} pages={pages} />}
            </>
        )
    }


}
export default connect(function mapStateToProps(state) {
    return state;
},
function mapDispatchToProps(dispatch) {
    return {
        dispatchMoreUsers: (users) => dispatch({ type: 'LOAD_MORE_USERS', users: users }),
        dispatchPaginationPage: (page, users) => dispatch({ type: 'SET_PAGINATION_PAGE', page: page, users: users }),
        dispatchUsers: (users, totalUsers) => dispatch({ type: 'SET_USERS', users: users, totalUsersCount: totalUsers, }),
        dispatchUserFriendlist: (friendlist) => dispatch({ type: 'SET_USER_FRIENDLIST', friendList: friendlist }),


    }
})(UsersContainer);




// function UsersContainer() {

//     const [isFetching, setFetching] = useState(false);

//     const state = useSelector(state => state.usersReducer)
//     const dispatch = useDispatch();
//     let id = useSelector(state => state.authReducer.id);
//     const cookie = new Cookies();
//     const token = cookie.get('cookie localhost')


//     // function loadMoreUsers() {
//     //     setFetching(true)
//     //     usersAPI.getUsers(token, state.currentUsersPage + 1, state.usersPerList).then(res => {
//     //         dispatch({
//     //             type: 'LOAD_MORE_USERS',
//     //             users: [...res.data.users],
//     //         })
//     //     })
//     //         .then(() => {
//     //             setFetching(false)
//     //         })
//     // }

//     // function setPagination(page) {
//     //     setFetching(true)

//     //     usersAPI.getUsers(token, page, state.usersPerList)
//     //         .then(res => {
//     //             dispatch({ type: 'SET_PAGINATION_PAGE', page: page, users: [...res.data.users] })
//     //         })
//     //         .then(() => {
//     //             setFetching(false)
//     //         })
//     // }




//     // function followUser(userId, followId) {
//     //     usersAPI.postFollowUser(userId, followId).then(res => console.log(res))
//     // }

//     // function unfollowUser(userId, followId) {
//     //     usersAPI.deleteUnfollowUser(userId, followId)
//     // }

//     let users = state.users.map((el) => {
//         let followed = state.userFriendlist.map(el => el.id).includes(el.id);
//         console.log(followed);

//         return <>
//             <UserProfileBlock key={crypto.randomUUID()} follow={followed} unfollowUser={unfollowUser} followUser={followUser} photo={el.photo} userId={id} name={el.name} id={el.id} avatar={'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_male_person-256.png'} dispatch={dispatch} />
//         </>
//     })

//     return <div key={crypto.randomUUID()}>

//         {isFetching ? <Preloader /> : <Users key={crypto.randomUUID()} users={users} loadMoreUsers={loadMoreUsers} pages={pages} />}
//     </div>
// }

// export default UsersContainer;


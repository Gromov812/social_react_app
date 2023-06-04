import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileBlock from "../Users/User-profile-block";
import Cookies from "universal-cookie";
import { decodeToken, isExpired } from "react-jwt";
import { usersAPI } from "../../DAL/api";
import Users from "../Users/Users";
import { getUserListThunkCreator } from "../../redux/users-reducer";
import ModalNewMessage from "../Users/ModalNewMessage";
import { useNavigate } from "react-router-dom";

function UserFriendsListContainer() {
  let cookies = new Cookies();
  let isAuthorized = useSelector((state) => state.authReducer.authorized);
  let id = useSelector((state) => state.authReducer.id);
  let state = useSelector((state) => state.usersReducer);
  let dispatch = useDispatch();
  let token = cookies.get("cookie localhost");

  const [upd, setUpd] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isFetching, setFetching] = useState(true);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    console.log(`rerender`);
    if (!isExpired(token)) {
      id = decodeToken(token).id;
    }
    dispatch(getUserListThunkCreator(token, id));
    setFetching(false);
    if (!isAuthorized) navigate("/", { replace: true });
  }, [isAuthorized, upd]);

  function sendMessageModalHandler(id, name, photo) {
    setModalActive(true);
    setModalData((data) => (data = { id, name, photo }));
    console.log(modalData);
  }

  function followUser(userId, followId) {
    usersAPI.postFollowUser(userId, followId).then((res) => console.log(res));
  }

  function unfollowUser(userId, followId) {
    usersAPI.deleteUnfollowUser(userId, followId);
  }

  let friends = null;
  if (state.userFriendlist)
    friends = state.userFriendlist.map((el, i, arr) => {
      let followed = arr.map((el) => el.id).includes(el.id);

      return (
        <UserProfileBlock
          setActive={sendMessageModalHandler}
          userId={id}
          unfollowUser={unfollowUser}
          followUser={followUser}
          follow={followed}
          key={el.id}
          name={el.name}
          id={el.id}
          photo={el.photo}
          upd={upd}
          setUpd={setUpd}
          dispatch={dispatch}
        />
      );
    });

  return (
    <div>
      <h1>FRIENDS LIST</h1>
      <ModalNewMessage
        isActive={isModalActive}
        modalData={modalData}
        setModalActive={setModalActive}
      />
      <Users
        state={state}
        token={token}
        isFetching={isFetching}
        setFetching={setFetching}
        users={friends}
      />
    </div>
  );
}

export default UserFriendsListContainer;

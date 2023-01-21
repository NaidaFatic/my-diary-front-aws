import "./notification.css";
import "../index.css";
import axios from 'axios';
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import jwt_decode from "jwt-decode";
import { Ajax } from "../utils/axios";
import { IconHeart, IconFlame, IconMessage2, IconX } from '@tabler/icons';
import { FriendsRequest } from "../components/FriendsRequest"
import { FriendsLike } from "../components/FriendsLike"
import { FriendsComment } from "../components/FriendsComment"
import { WarningUnauthorized } from "../components/WarningUnauthorized"
import { ToastContainer } from 'react-toastify';
import { SearchFriend } from "../components/SearchFriend";

function NotificationPage(props) {
    props.setCurrentPage("NOTIF");
    const params = useParams();
    var decoded = jwt_decode(localStorage.getItem('token'));
    const [friendRequest, setFriendRequest] = useState();
    const [posts, setPosts] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [profileOwner, setProfileOwner] = useState(false);
    const [searchIcon, setsearchIcon] = useState(true);
    const inputSearch = useRef(null);
    const [searchText, setSearchText] = useState();

    useEffect(() => {
        let cancel
        setProfileOwner((decoded.uid === params.id));

        Ajax.get('owners/' + params.id, null, function (response) {
            setFriendRequest(response.friendsRequest);
        });

        Ajax.get('posts/owner/' + params.id, null, function (response) {
            setPosts(response);
        });
        setSearchUsers(null);
        axios({
            method: 'GET',
            url: 'https://my-diary-backend-api.herokuapp.com/api/owners/search',
            params: { name: searchText },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setSearchUsers(response.data)
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            }
        });
        return () => { cancel(); }
    }, [params, decoded.uid, profileOwner, searchIcon, searchText]);
    //console.log(searchUsers)
    function search(e) {
        setSearchText(inputSearch.current.value)
    }

    function clear(e) {
        inputSearch.current.value = ""
        setsearchIcon(false)
        setSearchUsers()
    }

    if (!profileOwner) {
        return (
            < main >
                <WarningUnauthorized />
            </main >
        )
    } if (profileOwner) {
        return (
            <main>
                <ToastContainer />
                <div className="post">
                    <section>
                        <div className="post-img flex flex-wrap items-center ">
                            <h4 className="font-bold">Notifications</h4>
                            <div className="flex" style={{ width: '-webkit-fill-available' }}>
                                <input label="Name" name="name" type="text" placeholder="Search Friends" ref={inputSearch} onChange={search} />
                                <IconX onClick={clear} />
                            </div>
                            {searchUsers ? React.Children.toArray(
                                searchUsers.map((val) => (<SearchFriend user={val} />))
                            ) : null}
                        </div>
                    </section>
                </div >
                <h4 className="mx-3 mb-5 flex">Friend Requests <IconFlame style={{ fill: 'red' }} /></h4>
                <div className="post">
                    <section className="notif">
                        <FriendsRequest request={friendRequest} id={params.id} />
                    </section>
                </div >
                <h4 className="mx-3 mb-5 flex">Liked Posts  <IconHeart style={{ fill: 'red' }} /></h4>
                <div className="post">
                    <section>
                        {React.Children.toArray(
                            posts.map((val) => (<FriendsLike likes={val.likes} post={val} />))
                        )}
                    </section>
                </div >
                <h4 className="mx-3 mb-5 flex">Commented Posts  <IconMessage2 style={{ fill: '#114B5F' }} /></h4>
                <div className="post">
                    <section>
                        {React.Children.toArray(
                            posts.map((val) => (<FriendsComment post={val} />))
                        )}
                    </section>
                </div >
            </main >
        );
    }
}

export default NotificationPage;

import { IconUser, IconExternalLink } from '@tabler/icons';
import React, { useState, useEffect } from 'react';
import { Ajax } from "../utils/axios";
import { Link } from "react-router-dom";

export const FriendLike = (props) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Ajax.get('owners/' + props.user, null, function (response) {
            setUser(response);
            setLoading(false)
        });
        return () => {
            setUser();
            props = null
        };
    }, [setLoading]);

    if (user) {
        var backgroundImageStyle = {
            backgroundImage: `url(${user.profilePic})`
        };
    }

    //console.log(user)
    if (!props.user || loading || !user) {
        return (
            <>
                <div className="post-img flex flex-wrap items-center">
                    <IconUser className="user-img flex-none" />
                    <div>
                        <p>Loading..</p>
                    </div>
                    <div className="like-post text-right grow flex justify-end items-center"></div>
                </div>
                <hr></hr>
            </>
        );
    } else {
        return (
            <>
                <div className="post-img flex flex-wrap items-center">
                    <Link to={{
                        pathname: '/profile/' + props.user
                    }}>  {user.profilePic ? <div className="user-img-picture flex-none" style={backgroundImageStyle} /> : <IconUser className="user-img flex-none" />}</Link>
                    <div>
                        <h4>{user.name} {user.surname}</h4>
                    </div>
                    <div className="like-post text-right grow flex justify-end items-center"><h4>{props.post.name}</h4>
                        {props.post.picture && <Link to={{ pathname: '/profile/' + props.post.ownerID }} state={{ modal: props.post._id }}><img src={props.post.picture} height="45" width="50" alt={""} className="ml-3 mx-0" /></Link>}
                        {!props.post.picture && <Link to={{ pathname: '/profile/' + props.post.ownerID }} state={{ modal: props.post._id }}> <IconExternalLink /> </Link>}
                    </div>
                </div>
                <hr></hr>
            </>
        )
    }
}
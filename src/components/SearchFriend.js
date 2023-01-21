import "../index.css";
import React, { useState, useEffect } from 'react';
import { IconLoader2, IconUser } from '@tabler/icons';
import { Ajax } from "../utils/axios";
import { Link } from "react-router-dom";

export const SearchFriend = (props) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true);
        Ajax.get('owners/' + props.user._id, null, function (response) {
            setUser(response);
            setLoading(false);
        });

    }, [setLoading]);

    if (user) {
        var backgroundImageStyle = {
            backgroundImage: `url(${user.profilePic})`
        };
    }

    if (loading || !user) {
        return (
            <>
                <div className="searchFriend flex py-2">
                    <IconUser className="user-img flex-none" />
                    <input label="Name" name="name" type="text" value="Loading.." readOnly />
                </div>
            </>
        );
    } else {
        return (
            <>
                <Link className="searchFriend flex py-2" to={{
                    pathname: '/profile/' + user._id
                }}> {user.profilePic ? <div className="user-img-picture flex-none" style={backgroundImageStyle} /> : <IconUser className="user-img flex-none" />}
                    <input label="Name" name="name" type="text" value={user.name + ' ' + user.surname} readOnly /></Link>
            </>
        )
    }
}
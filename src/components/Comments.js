import "../index.css";
import { IconUser } from '@tabler/icons';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Ajax } from "../utils/axios";

export const Comments = (props) => {
    const date = props.comment.updatedAt.split('T')[0]
    const time = props.comment.updatedAt.split('T')[1].split(':')[0] + ':' + props.comment.updatedAt.split('T')[1].split(':')[1]
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Ajax.get('owners/' + props.comment.ownerID, null, function (response) {
            setUser(response);
            setLoading(false)
        });

        return () => {
            setUser();
        };
    }, [setLoading, props]);

    if (user) {
        var backgroundImageStyle = {
            backgroundImage: `url(${user.profilePic})`
        };
    }
    if (!props || loading || !user) {
        return (
            <div className="mb-5">
                <div className="flex items-center" >
                    <IconUser className="user-img flex-none" />
                    <div className="commentDiv">
                        <input type="text" value="Loading" readOnly disabled />
                        <small className="ml-2"> </small>
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div className="mb-5">
                <div className="flex items-center" >
                    <Link to={{ pathname: '/profile/' + props.comment.ownerID }}> {user.profilePic ? <div className="user-img-picture flex-none" style={backgroundImageStyle} /> : <IconUser className="user-img flex-none" />} </Link>
                    <div className="commentDiv">
                        <input type="text" value={props.comment.description} readOnly disabled />
                        <small className="ml-2">{date} {time}</small>
                    </div>
                </div>
            </div >
        )
    }
}
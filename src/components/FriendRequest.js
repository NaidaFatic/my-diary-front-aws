import { IconUser } from '@tabler/icons';
import React, { useState, useEffect } from 'react';
import { Ajax } from "../utils/axios";
import { Link } from "react-router-dom";

export const FriendRequest = (props) => {
    const [isApproved, setIsApproved] = useState(false);
    const [request, setRequest] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Ajax.get('owners/' + props.request, null, function (response) {
            setRequest(response);
            setLoading(false)
        });

        return () => {

        };
    }, [setLoading, setIsApproved]);


    const approve = (e) => {
        Ajax.put('owners/addFriend/' + props.id, { "friendID": request._id }, function (response) { console.log(response) });
        setIsApproved(!isApproved);
    };

    if (!props || loading || !request) {
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
                <div className="post-img flex flex-wrap items-center pb-5">
                    <Link to={{
                        pathname: '/profile/' + request._id
                    }}>  <IconUser className="user-img" /></Link>
                    <h4>{request.name} {request.surname}</h4>
                    <h4 className={`text-right grow mr-3  ${isApproved ? 'like-notf' : 'dislike'}`} onClick={approve} ><span className="approve">Approve</span></h4>
                </div>
                <hr></hr>
            </>
        )
    }
}
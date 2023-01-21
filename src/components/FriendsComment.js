import React, { useState, useEffect } from 'react';
import { Ajax } from "../utils/axios";
import { FriendComment } from './FriendComment';

export const FriendsComment = (props) => {
    const [comment, setComment] = useState();

    useEffect(() => {
        Ajax.get('comments/post/' + props.post._id, null, function (response) {
            setComment(response);
            //console.log(props.post._id)
        });
        return () => {
            setComment();
        };
    }, []);

    if (!props || !comment) {
        return (
            <>
            </>
        );
    } else {
        return (
            <>
                {comment &&
                    React.Children.toArray(
                        comment.map((val) => (<FriendComment comment={val} />))
                    )
                }
            </>
        )
    }
}
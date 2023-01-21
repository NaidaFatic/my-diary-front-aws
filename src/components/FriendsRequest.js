import { FriendRequest } from './FriendRequest';
import React from 'react';

export const FriendsRequest = (props) => {

    if (!props.request) {
        return (
            <>
            </>
        );
    } else {
        return (
            <>
                {React.Children.toArray(
                    props.request.map((val) => <FriendRequest request={val} id={props.id} />)
                )}
            </>
        )
    }
}
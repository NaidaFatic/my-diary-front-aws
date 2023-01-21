import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Ajax } from "../utils/axios";
import ProfilePost from "../components/ProfilePost";
import ProfilePostPrivate from "../components/ProfilePostPrivate";

function ProfilePosts(props) {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState();
    const [changed, setChanged] = useState(false);
    const [len, setLen] = useState(false);

    useEffect(() => {
        setLoading(true);
        Ajax.get('posts/owner/' + params.id, null, function (response) {
            setPosts(response);
            setLoading(false);
            setLen(response.length > 0)
        });
        return () => { setChanged(); setPosts() };

    }, [setLoading, params, changed]);

    function rend() {
        setChanged(!changed);
    }

    if (props.notFriends) {
        return (

            < h4 className='m-5' > Add {props.notFriends} as a friend in order to see the posts</h4 >
        );
    }
    else if (loading || !props.owner) {
        return (
            <></>
        );
    } else {
        return (
            <>{
                (props.page === "DIARY") ? <>
                    {len && React.Children.toArray(
                        posts.map((val) => <ProfilePostPrivate post={val} id={params.id} owner={props.owner} change={rend} openModal={props.openModal} />)
                    )
                    }</> : <>
                    {len && React.Children.toArray(
                        posts.map((val) => <ProfilePost post={val} id={params.id} owner={props.owner} change={rend} openModal={props.openModal} />)
                    )
                    }</>
            }
            </>
        );
    }
}

export default ProfilePosts;

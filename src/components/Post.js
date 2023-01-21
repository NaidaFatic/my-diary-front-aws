import "../index.css";
import loadingGif from "../img/loading.gif";
import React, { useState, useEffect, useRef } from 'react';
import { Comments } from "../components/Comments";
import { IconUser, IconHeart, IconMessage2, IconSend, IconLoader2 } from '@tabler/icons';
import { Ajax } from "../utils/axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const Post = (props) => {
    //console.log(props.post.ownerID)
    const [owner, setOwner] = useState();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();
    const [post, setPost] = useState();
    const [liked, setLiked] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [comment, setComment] = useState();
    const [addComments, setAddComments] = useState();
    const [ajaxResponse, setAjaxResponse] = useState(false);
    const inputMessage = useRef(null);
    var decoded = jwt_decode(localStorage.getItem('token'));

    useEffect(() => {
        setLoading(true);
        Ajax.get('owners/' + props.post.ownerID, null, function (response) {
            setOwner(response);
            setLoading(false);
        });

        Ajax.get('owners/' + decoded.uid, null, function (response) {
            setUser(response);
            setLoading(false);
        });

        Ajax.get('posts/post/' + props.post._id, null, function (response) {
            setPost(response);
            setLoading(false);
            if (response.likes.includes(decoded.uid)) {
                setLiked(true);
            }
        });

        Ajax.get('comments/post/' + props.post._id, null, function (response) {
            setComment(response);
        });
        return () => {
            setOwner();
            setUser();
        };
    }, [setLoading, addComments, ajaxResponse]);


    const like = (e) => {

        if (liked) {
            Ajax.put('posts/unlikes/' + props.post._id, { "id": decoded.uid }, function (response) { setAjaxResponse(response) });
            setLiked(false);
        } else {
            Ajax.put('posts/likes/' + props.post._id, { "id": decoded.uid }, function (response) { setAjaxResponse(response) });
            setLiked(true);
        }

    };

    const addComment = (e) => {
        Ajax.post('comments/' + props.post._id, { "ownerID": decoded.uid, "description": inputMessage.current.value }, function (response) { setAddComments(response) });
    };

    const showComment = (e) => {
        setIsComment(!isComment);
    };

    if (user) {
        var backgroundImageStyle = {
            backgroundImage: `url(${user.profilePic})`
        };
    }

    if (owner) {
        var backgroundImageStyleOwner = {
            backgroundImage: `url(${owner.profilePic})`
        };
    }

    if (loading || !owner || !user) {
        return (
            <main>
                <img src={loadingGif} alt="loading page" width="101" height="70" />
            </main >
        );
    } else {
        return (
            (!props.post.private) ?
                <div className="post">
                    <section>
                        <div className="post-img flex flex-wrap items-center ">
                            <Link to={{
                                pathname: '/profile/' + owner._id
                            }}>{owner.profilePic ? <div className="user-img-picture flex-none" style={backgroundImageStyleOwner} /> : <IconUser className="user-img flex-none" />}
                            </Link>
                            <h4 className="font-bold">{owner.name} {owner.surname}</h4>
                        </div>
                    </section>
                    <section>
                        {props.post.picture &&
                            <div>
                                <div className="post-photo">
                                    <img src={props.post.picture} height="45" width="100" style={{ width: '100%' }} alt="Post image" />
                                </div>
                            </div>
                        }
                        <div className="px-5">
                            <div className="post-name">
                                <h4 className="font-bold">{props.post.name}</h4>
                            </div>
                            <div className="post-desc">
                                <p>{props.post.description}</p>
                            </div>
                            <div className="post-comment flex">
                                <div className="post-comment flex">
                                    <div className="text-center">
                                        <IconHeart className={`ml-0 ${liked ? 'like' : 'dislike'}`} onClick={like} />
                                        {post && <small className="text-gray-500">{post.likes.length}</small>}
                                    </div>
                                    <div className="text-center">
                                        <IconMessage2 className={isComment ? 'comment' : 'uncomment'} onClick={showComment} />
                                        {comment && <small className="text-gray-500">{comment.length}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="pb-5">
                                {comment && isComment && React.Children.toArray(
                                    comment.map((val) => <div className={'showComment'}><Comments comment={val} /></div>)
                                )}
                                <div>
                                    <div className="flex items-center ml-5">
                                        {user.profilePic ? <div className="user-img-picture flex-none" style={backgroundImageStyle} /> : <IconUser className="user-img flex-none" />}
                                        <input type="text" name="comment" ref={inputMessage} />
                                        <IconSend onClick={addComment} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </div > :
                null
        )
    }
}
import { IconEdit, IconHeart, IconMessage2, IconUser, IconSend } from "@tabler/icons";
import React, { useState, useEffect, useRef } from 'react';
import { Ajax } from "../utils/axios";
import loadingGif from "../img/loading.gif";
import { Comments } from "../components/Comments";
import { Formik, Form } from "formik";
import { TextField } from "../components/TextField";
import jwt_decode from "jwt-decode";

function ProfilePostPrivate(props) {
    const [showModal, setShowModal] = useState(false);
    const [showModalPost, setShowModalPost] = useState(false);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState();
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState();
    const [editing, setEditing] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const inputMessage = useRef(null);
    const [ajaxResponse, setAjaxResponse] = useState(false);
    var decoded = jwt_decode(localStorage.getItem('token'));
    const [profileOwner, setProfileOwner] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setEditing(false)
        setIsComment(false);
        if (props.openModal === props.post._id) { setShowModalPost(true); }
        else { setShowModalPost(false); }
        setProfileOwner((decoded.uid === props.id));

        Ajax.get('posts/post/' + props.post._id, null, function (response) {
            setPost(response);
            setLoading(false);
            if (response.likes.includes(decoded.uid)) {
                setLiked(true);
            }
        });

        if (props.post._id) {
            Ajax.get('comments/post/' + props.post._id, null, function (response) {
                setComment(response);
            });
        }
        return () => { isMounted = false; setShowModal(); setLiked(); setComment(); setProfileOwner(); };
    }, [ajaxResponse, setLoading, decoded.uid, props]);

    useEffect(() => {
        if (showModalPost) { document.body.style.overflow = 'hidden'; }
        else { document.body.style.overflow = 'auto'; }

    }, [showModalPost]);

    var backgroundImageStyleProfile = {
        backgroundImage: `url(${props.owner.profilePic})`
    };

    const like = (e) => {

        if (liked) {
            Ajax.put('posts/unlikes/' + props.post._id, { "id": decoded.uid }, function (response) { setAjaxResponse(response) });
            setLiked(false);
        } else {
            Ajax.put('posts/likes/' + props.post._id, { "id": decoded.uid }, function (response) { setAjaxResponse(response) });
            setLiked(true);
        }

    };
    const showComment = (e) => {
        setIsComment(!isComment);
    };

    const addComment = (e) => {
        Ajax.post('comments/' + props.post._id, { "ownerID": decoded.uid, "description": inputMessage.current.value }, function (response) { console.log(response); setAjaxResponse(!ajaxResponse); inputMessage.current.value = '' });
    };

    function updatePost(values, actions) {
        Ajax.put('posts/' + props.post._id, values, function (response) {
            console.log(response);
            setAjaxResponse(!ajaxResponse);
            setShowModalPost(false);
            props.change()
        });
    }

    function deletePost() {
        Ajax.delete('posts/' + props.post._id, null, function (response) {
            console.log(response);
            setAjaxResponse(!ajaxResponse);
            setShowModalPost(false);
            props.change()
        });
    }

    if (post) {
        if (post.picture) {
            var backgroundImageStyle = {
                backgroundImage: `url(${post.picture})`
            }
        } else {
            var backgroundImageStyle = {
                backgroundColor: `${post.color}`
            }
        }
    }

    if (loading || !post) {
        return (
            <><img src={loadingGif} alt="loading page" width="101" height="70" /></>
        );
    } else {
        return (post.private ?
            <div>
                <div className="flex flex-col postWrap" style={backgroundImageStyle} onClick={() => setShowModalPost(true)} >
                    <p className="postName grow">
                        {post.description}
                    </p>
                </div>
                <p className="postDescription">{post.name}</p>
                {/* {
                    showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative my-6 mx-auto max-w-3xl" style={{ width: '75em' }}>
                                   
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                       
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                Update Post
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <span className="bg-transparent text-blac h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        
                                        <div className="relative p-6 modal">
                                            <div>
                                                <label>
                                                    <h4>Post Name</h4>
                                                    <input type="text" name="username" placeholder="username" />
                                                </label>
                                                <label>
                                                    <h4>Post Desciption</h4>
                                                    <input type="text" name="title" placeholder="title" />
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Back
                                            </button>
                                            <button
                                                className="bg-submit text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null
                } 
            */}
                {
                    showModalPost ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative my-6 mx-auto post-modal" >
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="font-semibold">
                                                {props.owner.name} {props.owner.surname}
                                                <p className="font-normal">{props.owner.diaryName}</p>
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModalPost(false)}
                                            >
                                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 modal">
                                            <div className="md:flex flex-none">
                                                {post.picture &&
                                                    <div className="post-pic-container">
                                                        <img src={post.picture} style={{ width: '100%' }} className="ml-0" alt="Post image" />
                                                    </div>
                                                }
                                                {editing ?
                                                    <div className="md:ml-5" style={{ width: '-webkit-fill-available' }}>
                                                        <Formik
                                                            enableReinitialize='true'
                                                            initialValues={{ name: post.name, description: post.description }}
                                                            onSubmit={(values, actions) => {
                                                                updatePost(values, actions)
                                                            }}
                                                        >
                                                            <Form>
                                                                <TextField label="Post Name" name="name" type="text" />
                                                                <TextField label="Description" name="description" type="text" />
                                                                <hr></hr>

                                                                {/*footer*/}
                                                                <div className="flex items-center justify-between py-6 border-t border-solid border-slate-200 rounded-b">
                                                                    <button
                                                                        className="bg-[#c98989] text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                        onClick={deletePost}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <div className="flex">
                                                                        <button
                                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                            type="button"
                                                                            onClick={() => setEditing(false)}
                                                                        >
                                                                            Close
                                                                        </button>
                                                                        <button
                                                                            className="bg-submit text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                            type="submit">Update
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </Form>
                                                        </Formik>
                                                    </div>
                                                    :
                                                    <div className="md:ml-5" style={{ width: '-webkit-fill-available' }}>
                                                        <div className="flex justify-between">
                                                            <h3>{post.name}</h3>
                                                            {profileOwner && <IconEdit className="editPost flex-none self-end" onClick={() => setEditing(true)} />}
                                                        </div>
                                                        <p>{post.description}</p>
                                                        <hr></hr>
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
                                                        <div className={`mb-5 ${isComment ? 'showComment' : 'notShowComment'}`}>
                                                            <div className="flex items-center ml-5">
                                                                {props.owner.profilePic ? <div className="user-img-picture flex-none" style={backgroundImageStyleProfile} /> : <IconUser className="user-img flex-none" />}
                                                                <input type="text" name="comment" ref={inputMessage} />
                                                                <IconSend onClick={addComment} />
                                                            </div>
                                                        </div>
                                                        {comment && React.Children.toArray(
                                                            comment.map((val) => <Comments comment={val} />)
                                                        )}
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null
                }
            </div > : null
        );
    }
}

export default ProfilePostPrivate;

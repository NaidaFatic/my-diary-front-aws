import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const useRedirect = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            var decoded = jwt_decode(localStorage.getItem('token'));
            navigate("/feed/" + decoded.uid);
        } else {
            navigate("/login");
        }
    }, []);

}
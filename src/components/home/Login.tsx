import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "../../redux/auth/authActions";

export async function loader(data: { params: any }) {
    console.log(data);
    return "";
}

export const Login = React.memo(function Login({ hash }: { hash: string }) {
    // immediately redirect to home
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // extract the token type and access token from the hash
    // skip the # symbol in the beginning
    const parsedHash = hash.substring(1);
    // split the hash into individual components
    const hashParts = parsedHash.split("&");
    // then for each of the split items, build a dictionary of fragments
    const fragmentParts: { [id: string]: string } = {};

    for (const part of hashParts) {
        const value = part.split("=");
        fragmentParts[value[0]] = value[1];
    }

    // we need to save the token information into our state
    dispatch(
        AuthAction.GetAuthComplete({
            tokenType: fragmentParts["token_type"],
            accessToken: fragmentParts["access_token"],
            expirationTimeInSeconds: Number(fragmentParts["expires_in"])
        })
    );

    useEffect(() => {
        navigate("/", { replace: true });
    }, [navigate]);

    return <div>Yo</div>;
});

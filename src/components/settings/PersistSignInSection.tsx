import React, { useCallback, useState } from "react";

import { Checkbox } from "@chakra-ui/react";
import { useAuthInfo } from "../../logic/hooks/authHooks";

export const PersistSignInSection = React.memo(function PersistSignInSection() {
    const { accessToken, tokenType, expirationDate } = useAuthInfo();
    const accessTokenFromState = localStorage.getItem("tokenType");

    const [isRememberMe, setIsRememberMe] = useState<boolean>(accessTokenFromState !== null);

    // When the user closes the modal, if they have selected "remember me", we save the access token to local storage
    const toggleRememberMe = useCallback(() => {
        if (isRememberMe) {
            // turn off remember me if it is on
            localStorage.clear();
        } else {
            if (tokenType) {
                localStorage.setItem("tokenType", tokenType);
            }
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
            if (expirationDate) {
                localStorage.setItem("expirationDate", expirationDate.getTime().toString());
            }
        }

        setIsRememberMe(!isRememberMe);
    }, [accessToken, expirationDate, isRememberMe, tokenType]);

    return (
        <Checkbox isChecked={isRememberMe} onChange={toggleRememberMe} marginBottom={"64px"} marginTop={"32px"}>
            Keep me signed in
        </Checkbox>
    );
});

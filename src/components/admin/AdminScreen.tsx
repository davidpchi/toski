import React from "react";
import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../logic/hooks/userHooks";

export const Admin = React.memo(function Admin() {
    const navigate = useNavigate();
    const { userId } = useUserInfo();
    const profiles = useSelector(ProfileSelectors.getProfiles);

    if (!profiles) {
        return <Text>"No profiles loaded!"</Text>;
    }

    // This should always be true
    const currentUser = userId ? profiles[userId] : undefined;

    // This is a soft admin auth check. Technically, all
    // data stored in a chatterfang profile is public at the moment.
    // Hence, even if a user were to skip this check, all of this information is public atm.

    if (currentUser === undefined || !currentUser.isAdmin) {
        navigate("/", { replace: true });
        return <div></div>;
    }

    const tableData = [];
    for (const value of Object.values(profiles)) {
        tableData.push(
            <Tr>
                <Td>{value.id}</Td>
                <Td>{value.toskiId}</Td>
                <Td>{value.moxfieldId}</Td>
            </Tr>
        );
    }

    return (
        <div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Chatterfang ID</Th>
                        <Th>Toski Name</Th>
                        <Th>Moxfield ID</Th>
                    </Tr>
                </Thead>
                <Tbody>{tableData}</Tbody>
            </Table>
        </div>
    );
});

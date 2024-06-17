import React from "react";
import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { useSelector } from "react-redux";
import { profileMap } from "../../services/ProfileService";
import { Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";

export const Admin = React.memo(function Admin() {
    const profiles = useSelector(ProfileSelectors.getProfiles);

    if (!profiles) {
        return <Text>"No profiles loaded!"</Text>;
    }

    let reverseProfileMap: { [id: string]: string } = {};
    for (const [key, value] of Object.entries(profileMap)) {
        reverseProfileMap[value] = key;
    }

    const tableData = [];
    for (const value of Object.values(profiles)) {
        tableData.push(
            <Tr>
                <Td>{value.id}</Td>
                <Td>{reverseProfileMap[value.id]}</Td>
                <Td>{value.moxfieldId}</Td>
            </Tr>
        );
    }

    return (
        <div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Discord ID</Th>
                        <Th>Toski Name</Th>
                        <Th>Moxfield ID</Th>
                    </Tr>
                </Thead>
                <Tbody>{tableData}</Tbody>
            </Table>
        </div>
    );
});

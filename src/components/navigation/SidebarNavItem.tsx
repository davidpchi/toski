import { FlexProps, Flex, Button, Icon, Text, Link } from "@chakra-ui/react";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItemProps extends FlexProps {
    key: string;
    icon: IconType;
    label: string;
    route: string;
    onClose: () => void;
}

export const SidebarNavItem = ({ icon, label, route, onClose }: NavItemProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSelected = () => {
        return location.pathname === route || (route !== "/" && location.pathname.indexOf(route) > -1);
    };

    const onClick = useCallback(() => {
        navigate(route);
        window.scrollTo(0, 0);
        onClose();
    }, [route, navigate, onClose]);

    return (
        <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex direction="column">
                <Button
                    leftIcon={<Icon as={icon}></Icon>}
                    onClick={onClick}
                    variant={isSelected() ? "solid" : "ghost"}
                    size="lg"
                    borderRadius="0"
                    justifyContent="flex-start"
                >
                    <Text>{label}</Text>
                </Button>
            </Flex>
        </Link>
    );
};

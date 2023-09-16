import {
    Box,
    BoxProps,
    Button,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    Icon,
    IconButton,
    Link,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { ReactNode, useCallback } from 'react';
import { IconType } from 'react-icons';
import {
    FiCalendar,
    FiHome,
    FiMenu,
    FiRss,
    FiShield,
    FiTrendingUp,
    FiUsers,
} from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { FF_IS_NEWS_ENABLED } from '../services/featureFlagService';

interface LinkItemProps {
    name: string;
    icon: IconType;
    route: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, route: '/' },
    { name: 'Player Overview', icon: FiUsers, route: '/playerOverview' },
    { name: 'Commander Overview', icon: FiShield, route: '/commanderOverview' },
    { name: 'Match History', icon: FiCalendar, route: '/matchHistory' },
    { name: 'Match Trends', icon: FiTrendingUp, route: '/matchTrends' },
];

export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH='100vh'>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <Box>
                <MobileNav onOpen={onOpen} />
            </Box>
            <Box ml={{ base: 0, md: 60 }} p='4'>
                {children}
                <Flex height={"64px"} justifyContent={"center"} alignItems={"center"} marginTop={"64px"} flexDirection={"column"}>
                    <div style={{ textAlign: "center", fontStyle: "italic", fontSize: "12px" }}>This site contains unofficial Fan Content permitted under the <a href="https://company.wizards.com/en/legal/fancontentpolicy" style={{ textDecoration: "underline" }}>Fan Content Policy</a>. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.</div>
                </Flex>
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const linkItems = [...LinkItems];

    if (FF_IS_NEWS_ENABLED) {
        linkItems.splice(1, 0, { name: 'News', icon: FiRss, route: '/news' });
    }

    return (
        <Box
            transition='3s ease'
            borderRight='1px'
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos='fixed'
            h='full'
            {...rest}
        >
            <Flex h='20' align='center' mx='8' justify='space-between'>
                <Flex direction='column' justify='center' align='center'>
                    <Text
                        fontSize='20'
                        fontWeight='bold'
                        textTransform='uppercase'
                        color='gray.600'
                        noOfLines={1}
                    >
                        Project Toski
                    </Text>
                    <Text fontSize='10px' alignSelf={'flex-end'}>
                        Alpha
                    </Text>
                </Flex>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>
            <VStack spacing='24px' align='stretch' justify='flex-start'>
                {linkItems.map((link) => (
                    <NavItem
                        key={link.name}
                        icon={link.icon}
                        route={link.route}
                        onClose={onClose}
                        label={link.name}
                    ></NavItem>
                ))}
            </VStack>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    key: string;
    icon: IconType;
    label: string;
    route: string;
    onClose: () => void;
}

const NavItem = ({ icon, label, route, onClose }: NavItemProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSelected = () => {
        return location.pathname === route || (route !== "/" && location.pathname.indexOf(route) > -1);
    };

    const onClick = useCallback(() => {
        navigate(route);
        onClose();
    }, [route, navigate, onClose]);

    return (
        <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex direction='column'>
                <Button
                    leftIcon={<Icon as={icon}></Icon>}
                    onClick={onClick}
                    variant={isSelected() ? 'solid' : 'ghost'}
                    size='lg'
                    borderRadius='0'
                    justifyContent='flex-start'
                >
                    <Text>{label}</Text>
                </Button>
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height='20'
            align='center'
            borderBottomWidth='1px'
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justify={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant='outline'
                aria-label='open menu'
                icon={<FiMenu />}
            />

            <Box display={{ base: 'flex', md: 'none' }}>
                <Flex direction='column' justify='center' align='center'>
                    <Text
                        fontSize='2xl'
                        fontFamily='monospace'
                        fontWeight='bold'
                        textTransform='uppercase'
                        color='gray.600'
                    >
                        PROJECT TOSKI
                    </Text>
                    <Text fontSize='10px' alignSelf={'flex-end'}>
                        Alpha
                    </Text>
                </Flex>
            </Box>
        </Flex>
    );
};

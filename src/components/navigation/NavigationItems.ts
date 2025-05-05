import { FiBarChart, FiCalendar, FiHelpCircle, FiHome, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";
import { IconType } from "react-icons";

interface LinkItemProps {
    name: string;
    icon: IconType;
    route: string;
}

export const NavigationItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, route: "/" },
    { name: "Player Overview", icon: FiUsers, route: "/playerOverview" },
    { name: "Commander Overview", icon: FiShield, route: "/commanderOverview" },
    { name: "Commander Trends", icon: FiBarChart, route: "/commanderTrends" },
    { name: "Match History", icon: FiCalendar, route: "/matchHistory" },
    { name: "Match Trends", icon: FiTrendingUp, route: "/matchTrends" },
    { name: "About", icon: FiHelpCircle, route: "/about" }
];

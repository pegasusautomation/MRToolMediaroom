import React, { useContext } from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSidebar,
    STheme,
    SThemeLabel,
    SThemeToggler,
    SToggleThumb,
} from "./styles";
import {
    AiFillSafetyCertificate,
    AiOutlineHome,
    AiOutlineProfile,
} from "react-icons/ai";
import { MdDesignServices, MdHistoryEdu } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../App";  // Make sure the path is correct

const Sidebar = ({ userData }) => {
    const { pathname } = useLocation();
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <SSidebar>
            <SLogo>
                <h1><br></br>MR</h1>
            </SLogo>
            <SDivider />
            {linksArray.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        <>
                            <SLinkLabel>{label}</SLinkLabel>
                            {!!notification && (
                                <SLinkNotification>{notification}</SLinkNotification>
                            )}
                        </>
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            <STheme>
                <SThemeLabel>Dark Mode</SThemeLabel>
                <SThemeToggler onClick={toggleTheme} isActive={theme === "dark"}>
                    <SToggleThumb />
                </SThemeToggler>
            </STheme>
        </SSidebar>
    );
};

const linksArray = [
    {
        label: "Profile",
        icon: <AiOutlineProfile />,
        to: "/Profile",
    },
    {
        label: "Home",
        icon: <AiOutlineHome />,
        to: "/home",
    },
    {
        label: "Servers",
        icon: <MdDesignServices />,
        to: "/houstonservers",
    },
    {
        label: "Certificates",
        icon: <AiFillSafetyCertificate />,
        to: "/certificates",
    },
    {
        label: "History",
        icon: <MdHistoryEdu />,
        to: "/history",
    },
];

export default Sidebar;

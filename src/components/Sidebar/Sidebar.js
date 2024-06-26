import React, { useContext, useState } from "react";
// import { ThemeProvider } from 'styled-components';
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSidebar,
    // SSidebarButton,
    STheme,
    SThemeLabel,
    SThemeToggler,
    SToggleThumb,
} from "./styles";

import {
    AiFillSafetyCertificate,
    AiOutlineHome,
    AiOutlineLeft,
    AiOutlineProfile,
} from "react-icons/ai";
import { MdDesignServices, MdHistoryEdu } from "react-icons/md";

import { ThemeContext } from 'styled-components'
import { useLocation } from "react-router-dom";

const Sidebar = ({userData}) => {
    const { setTheme, theme } = useContext(ThemeContext);
    // const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

 
    return (
      
        <SSidebar>
            <>
                {/* <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton> */}
            </>
            <SLogo>
                <h1><br></br>MR</h1>
            </SLogo>
            <SDivider />
            {linksArray.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} >
                        <SLinkIcon>{icon}</SLinkIcon>
                      
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {/* if notifications are at 0 or null, do not display */}
                                {!!notification && (
                                    <SLinkNotification>{notification}</SLinkNotification>
                                )}
                            </>
                        
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            {/* {secondaryLinksArray.map(({ icon, label }) => (
                <SLinkContainer key={label}>
                    <SLink to="/loginhistory" style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                    </SLink>
                </SLinkContainer>
            ))} */}
            {/* <SDivider /> */}
            <STheme>
                
                <SThemeToggler
                    isActive={theme === "dark"}
                    onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
                >
                    <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
                </SThemeToggler>
            </STheme>
        </SSidebar>
    );
};

const linksArray = [
  {
    // {userData && (
            label: "Profile",
            icon: <AiOutlineProfile />,
            to: "/Profile",
    // )}
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
        icon: < MdHistoryEdu/>,
        to: "/history",
    },
];

// const secondaryLinksArray = [
//     {
//         label: "Login History",
//         icon: <MdHistory />,
//         to:"/loginhistory"
//     },
// ];

export default Sidebar;


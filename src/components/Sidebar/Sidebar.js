import React from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSidebar,
} from "./styles";

import {
    AiFillSafetyCertificate,
    AiOutlineHome,
    AiOutlineProfile,
} from "react-icons/ai";
import { MdDesignServices, MdHistoryEdu } from "react-icons/md";

import { useLocation } from "react-router-dom";

const Sidebar = ({userData}) => {
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
                            {!!notification && (
                                <SLinkNotification>{notification}</SLinkNotification>
                            )}
                        </>
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
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
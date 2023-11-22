import React from "react";
import cl from "./SideBlock.module.scss";

export const SideBlock = ({ title, children }) => {
    return (
        <div className={cl.root}>
            <div className={cl.title}>{title}</div>
            {children}
        </div>
    );
};
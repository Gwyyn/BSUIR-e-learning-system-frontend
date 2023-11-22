import React from "react";
import cl from "./TagsBlock.module.scss";

import {SideBlock} from "../SideBlock";
import {TagIcon} from "../icons/TagIcon";

export const TagsBlock = ({items, isLoading = true}) => {
    return (
        <SideBlock title="Тэги">
            <ul className={cl.tagsList}>
                {(isLoading ? [...Array(5)] : items).map((name, i) => (
                    <a
                        className={cl.tagLink}
                        href={`/tags/${name}`}
                    >
                        <li className={cl.tagItem} key={i}>
                            <div className={cl.tagIcon}>
                                <TagIcon/>
                            </div>
                            <span className={cl.tagName}>{name}</span>
                        </li>
                    </a>
                ))}
            </ul>
        </SideBlock>
    );
};
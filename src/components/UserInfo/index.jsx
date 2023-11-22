import React from 'react';
import styles from './UserInfo.module.scss';

import AvatarIcon from "./AvatarIcon.svg";


export const UserInfo = ({ avatarUrl, firstName, lastName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || AvatarIcon} alt="avatarIcon"/>
      <div className={styles.userDetails}>
          <div className={styles.userName}>
              <div>{firstName} {lastName}</div>
          </div>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};

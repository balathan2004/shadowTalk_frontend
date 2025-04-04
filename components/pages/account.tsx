import React, { Component } from "react";
import { useUserContext } from "../context/user_context";
import styles from "../../styles/account.module.css";
import { formatDistanceToNow } from "date-fns";
import { timeHandler } from "../utils/smallComponents";


export default function Account() {
  const { userCred } = useUserContext();


  return (
    <div className="home_container">
      <div className={styles.account}>
        <article>
          <h1>Your Profile</h1>
          <div className={styles.img_container}>
            <img src={userCred?.photoUrl} referrerPolicy="no-referrer" />
            <span>{userCred?.displayName}</span>
          </div>
          <p>{userCred?.email}</p>
          <span>{timeHandler(userCred?.createdAt)}</span>
        </article>
      </div>
    </div>
  );
}

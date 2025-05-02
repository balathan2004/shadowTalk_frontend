
import styles from "../../styles/account.module.css";
import { timeHandler } from "../utils/smallComponents";
import { useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const getUser = gql`
  query getUser($myId: ID!) {
    getUser(myId: $myId) {
      _id
      username
      photoUrl
      displayName
      email
      createdAt
    }
  }
`;

export default function Profile() {
  const { search } = useLocation();
  const userId = search.substring(1);

  const { data, loading, error } = useQuery(getUser, {
    variables: { myId: userId },
    skip: !userId,
    fetchPolicy: "network-only",
  });

  console.log(data);

  if (data) {
    return (
      <div className="home_container">
        <div className={styles.account}>
          <article>
            <h1>Your Profile</h1>
            <div className={styles.img_container}>
              <img src={data.getUser?.photoUrl} referrerPolicy="no-referrer" />
              <span>{data.getUser?.displayName}</span>
            </div>
            <p>{data.getUser?.email}</p>
            <span>{timeHandler(data.getUser?.createdAt)}</span>
          </article>
        </div>
      </div>
    );
  }
}

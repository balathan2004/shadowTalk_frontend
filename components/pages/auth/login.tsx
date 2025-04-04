import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../config";
import React from "react";
import AuthPost from "../../utils/authPost";
import { useUserContext } from "../../context/user_context";
import { useReplyContext } from "../../context/reply_context";
import { useLoadingContext } from "../../context/loading_context";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const provider = new GoogleAuthProvider();

  const { setIsLoading } = useLoadingContext();
  const { setReply } = useReplyContext();
  const { setUserCred } = useUserContext();
  const router = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const userData = (await signInWithPopup(auth, provider)).user;
      if (!userData) {
        return;
      }
      const userFields = {
        _id: userData.uid,
        displayName: userData.displayName || "",
        createdAt: userData.metadata?.creationTime
          ? Date.parse(userData.metadata.creationTime)
          : Date.now(),
        email: userData.email || "",
        photoUrl: userData.photoURL || "",
      };
      const response = await AuthPost({
        route: "http://localhost:4000/api/auth",
        data: userFields,
      });
      console.log(response);
      setReply(response.message);
      setIsLoading(false);
      if (response.status == 200) {
        setUserCred(response.userCred);
        router("/feeds");
      }
    } catch (err) {
      alert(err)
      console.log(err);
    }
  };

  return (
    <div className="home_container">
      <div>
        <h1>Welcome to Shadow Talk</h1>
        <h2> Create A Account</h2>
        <Button
          onClick={handleSubmit}
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<GoogleIcon />}
        >
          Continue with google
        </Button>
      </div>
    </div>
  );
}

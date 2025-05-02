import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InboxIcon from "@mui/icons-material/Inbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function BottomNav() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      className="bottom_nav"
      showLabels
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Feeds"
        icon={<RestoreIcon />}
        component={Link}
        to="/feeds"
      />
      <BottomNavigationAction
        label="Explore"
        icon={<FavoriteIcon />}
        component={Link}
        to="/explore"
      />
      <BottomNavigationAction
        label="Inbox"
        icon={<InboxIcon />}
        component={Link}
        to="/inbox"
      />
      <BottomNavigationAction
        label="Account"
        icon={<AccountCircleIcon />}
        component={Link}
        to="/account"
      />
    </BottomNavigation>
  );
}

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

interface NavBarProps {
  isAdmin: boolean;
  handleSwitch: () => void;
}

const NavBar = ({ isAdmin, handleSwitch }: NavBarProps) => {
  const LimeGreenSwitch = styled(Switch)({
    "& .MuiSwitch-switchBase": {
      color: "#AEC648",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#AEC648",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#AEC648",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#d3d3d3",
    },
  });

  return (
    <AppBar position="static" className="bg-gray-900 shadow-md">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginLeft: "auto",
          }}
          role="group"
          aria-labelledby="user-role-switch-label"
        >
          <Typography variant="body1">admin</Typography>
          <LimeGreenSwitch checked={!isAdmin} onChange={handleSwitch} />
          <Typography variant="body1">user</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

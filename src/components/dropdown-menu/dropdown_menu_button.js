import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { pink } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function DropdownMenuButton(props) {
  const {
    handleClickCallback,
    handleCloseCallback,
    openCallback,
    icons,
    texts,
    divStyle,
    handleBlockchainChange,buttonText,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (buttonIndex) => {
    setAnchorEl(null);
    if(buttonIndex === -1) return;
    console.log(buttonIndex);
    handleBlockchainChange(buttonIndex);
  };

  return (
    <div style={divStyle}>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        style={{ backgroundColor: pink[700] }}
        startIcon={<CloudUploadIcon />}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {buttonText}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={(_)=>handleClose(-1)}
      >
        {icons.map((icon, index) => (
          <div>
            <MenuItem
              key={index}
              onClick={(_) => handleClose(index)}
              disableRipple
            >
              {icon}
              <div style={{ marginLeft: "8px" }}> {texts[index]} </div>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
          </div>
        ))}
      </StyledMenu>
    </div>
  );
}

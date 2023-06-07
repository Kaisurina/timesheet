import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ThemeSwitch from "entities/theme/ui/ThemeSwitch/ThemeSwitch";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "shared/libs/redux";
import { removeActiveUser } from "entities/user/model";

const pages = [
  {
    name: "Табель",
    link: "timesheet",
    access: ["SUPERVISOR", "USER", "TEAMLEAD"],
  },
  // {
  //   name: "Отчётность",
  //   link: "accounting",
  //   access: ["SUPERVISOR", "TEAMLEAD"],
  // },
  // {
  //   name: "Операторы",
  //   link: "operators",
  //   access: ["SUPERVISOR", "TEAMLEAD"],
  // },
  {
    name: "Сотрудники",
    link: "employees",
    access: ["SUPERVISOR"],
  },
  {
    name: "Моя Команда",
    link: "teams",
    access: ["SUPERVISOR", "TEAMLEAD"],
  },
];
const settings = ["Выйти"];

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  if (!user.role) {
    return null;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        bgcolor: (theme) => (theme.palette.mode === "dark" ? "#121212" : ""),
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ height: 50 }} variant="dense" disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            САМОКАТ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(
                (page) =>
                  user.role &&
                  page.access.includes(user.role) && (
                    <MenuItem
                      key={page.name}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(`/${page.link}`);
                      }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          <AdbIcon
            sx={{ display: { xs: "none", mobile: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: { xs: "0.01rem", mobile: ".3rem" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            САМОКАТ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(
              (page) =>
                user.role &&
                page.access.includes(user.role) && (
                  <Button
                    key={page.name}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(`/${page.link}`);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                )
            )}
          </Box>

          <Box sx={{ flexGrow: 0, minWidth: 118 }}>
            <ThemeSwitch />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="R" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    setting === "Выйти" && dispatch(removeActiveUser());
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

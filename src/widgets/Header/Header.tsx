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
import SvgIcon from "@mui/material/SvgIcon";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
  {
    name: "Тренинги",
    link: "trainings",
    access: ["SUPERVISOR", "TEAMLEAD", "USER"],
  },
];

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  if (!user.token) {
    return null;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
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
          <SvgIcon
            inheritViewBox
            sx={{ display: { xs: "none", md: "flex" }, mr: 2, width: 153 }}
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M25.05 12.34C24.9 5.552 19.354.108 12.532.108 5.614.108 0 5.717 0 12.628h5.01c0 5.526 4.489 10.01 10.02 10.01 5.436 0 9.87-4.333 10.02-9.736v-.562Zm-10.02 5.293a5 5 0 0 1-5.01-5.005 5 5 0 0 1 5.01-5.005 5 5 0 0 1 5.01 5.005 5 5 0 0 1-5.01 5.005ZM96.371 4.77c-4.365 0-7.92 3.525-7.92 7.844 0 4.402 3.473 7.844 7.92 7.844 4.434 0 7.92-3.442 7.92-7.844-.014-4.32-3.555-7.843-7.92-7.843Zm0 12.41c-2.333 0-4.035-2.083-4.035-4.552 0-2.468 1.688-4.553 4.035-4.553 2.279 0 3.994 2.126 3.994 4.553 0 2.469-1.688 4.553-3.994 4.553ZM61.575 5.113l-.013 1.742s-.179-.22-.33-.384c-.74-.891-2.182-1.687-4.282-1.687-3.885 0-7.056 3.524-7.056 7.844 0 4.333 3.171 7.844 7.056 7.844 2.114 0 3.541-.795 4.282-1.687.151-.178.33-.384.33-.384l.014 1.742h3.843V5.113h-3.843Zm.234 7.515c0 2.564-1.579 4.553-3.967 4.553s-4.063-1.989-4.063-4.553 1.675-4.553 4.063-4.553c2.388-.013 3.967 1.975 3.967 4.553 0-.014 0-.014 0 0ZM133.446 5.113l-.014 1.742s-.179-.22-.33-.384c-.741-.891-2.182-1.687-4.282-1.687-3.885 0-7.055 3.524-7.055 7.844 0 4.333 3.17 7.844 7.055 7.844 2.114 0 3.541-.795 4.282-1.687.151-.178.33-.384.33-.384l.014 1.742h3.843V5.113h-3.843Zm.233 7.515c0 2.564-1.579 4.553-3.967 4.553s-4.063-1.989-4.063-4.553 1.675-4.553 4.063-4.553c2.388-.013 3.967 1.975 3.967 4.553 0-.014 0-.014 0 0ZM44.116 10.626h3.885c-.948-3.675-3.748-5.855-7.522-5.855-4.516 0-7.92 3.373-7.92 7.843s3.404 7.844 7.92 7.844c3.774 0 6.574-2.18 7.522-5.855h-3.899c-.7 1.577-1.949 2.564-3.623 2.564-2.375 0-4.036-1.975-4.036-4.553 0-2.591 1.661-4.552 4.036-4.552 1.674 0 2.937.987 3.637 2.564ZM72.159 5.113H68.85V20.13h3.857V10.9l4.612 5.897 4.584-5.897v9.23h3.857V5.112h-3.308l-5.16 6.596-5.134-6.596ZM120.818 5.113h-4.544l-5.477 6.596V5.113h-3.857V20.13h3.857v-6.486l6.109 6.486h4.927l-7.275-7.624 6.26-7.392ZM144.441 20.13h3.857V8.35h4.543V5.113h-12.93V8.35h4.53v11.78Z"
            />
          </SvgIcon>

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

          <SvgIcon
            inheritViewBox
            sx={{
              flexGrow: 1,
              display: { xs: "none", mobile: "flex", md: "none" },
              mr: 2,
              minWidth: 153,
            }}
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M25.05 12.34C24.9 5.552 19.354.108 12.532.108 5.614.108 0 5.717 0 12.628h5.01c0 5.526 4.489 10.01 10.02 10.01 5.436 0 9.87-4.333 10.02-9.736v-.562Zm-10.02 5.293a5 5 0 0 1-5.01-5.005 5 5 0 0 1 5.01-5.005 5 5 0 0 1 5.01 5.005 5 5 0 0 1-5.01 5.005ZM96.371 4.77c-4.365 0-7.92 3.525-7.92 7.844 0 4.402 3.473 7.844 7.92 7.844 4.434 0 7.92-3.442 7.92-7.844-.014-4.32-3.555-7.843-7.92-7.843Zm0 12.41c-2.333 0-4.035-2.083-4.035-4.552 0-2.468 1.688-4.553 4.035-4.553 2.279 0 3.994 2.126 3.994 4.553 0 2.469-1.688 4.553-3.994 4.553ZM61.575 5.113l-.013 1.742s-.179-.22-.33-.384c-.74-.891-2.182-1.687-4.282-1.687-3.885 0-7.056 3.524-7.056 7.844 0 4.333 3.171 7.844 7.056 7.844 2.114 0 3.541-.795 4.282-1.687.151-.178.33-.384.33-.384l.014 1.742h3.843V5.113h-3.843Zm.234 7.515c0 2.564-1.579 4.553-3.967 4.553s-4.063-1.989-4.063-4.553 1.675-4.553 4.063-4.553c2.388-.013 3.967 1.975 3.967 4.553 0-.014 0-.014 0 0ZM133.446 5.113l-.014 1.742s-.179-.22-.33-.384c-.741-.891-2.182-1.687-4.282-1.687-3.885 0-7.055 3.524-7.055 7.844 0 4.333 3.17 7.844 7.055 7.844 2.114 0 3.541-.795 4.282-1.687.151-.178.33-.384.33-.384l.014 1.742h3.843V5.113h-3.843Zm.233 7.515c0 2.564-1.579 4.553-3.967 4.553s-4.063-1.989-4.063-4.553 1.675-4.553 4.063-4.553c2.388-.013 3.967 1.975 3.967 4.553 0-.014 0-.014 0 0ZM44.116 10.626h3.885c-.948-3.675-3.748-5.855-7.522-5.855-4.516 0-7.92 3.373-7.92 7.843s3.404 7.844 7.92 7.844c3.774 0 6.574-2.18 7.522-5.855h-3.899c-.7 1.577-1.949 2.564-3.623 2.564-2.375 0-4.036-1.975-4.036-4.553 0-2.591 1.661-4.552 4.036-4.552 1.674 0 2.937.987 3.637 2.564ZM72.159 5.113H68.85V20.13h3.857V10.9l4.612 5.897 4.584-5.897v9.23h3.857V5.112h-3.308l-5.16 6.596-5.134-6.596ZM120.818 5.113h-4.544l-5.477 6.596V5.113h-3.857V20.13h3.857v-6.486l6.109 6.486h4.927l-7.275-7.624 6.26-7.392ZM144.441 20.13h3.857V8.35h4.543V5.113h-12.93V8.35h4.53v11.78Z"
            />
          </SvgIcon>
          {/* <SvgIcon sx={{ flexGrow: 1 }} inheritViewBox>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M25.05 12.34C24.9 5.552 19.354.108 12.532.108 5.614.108 0 5.717 0 12.628h5.01c0 5.526 4.489 10.01 10.02 10.01 5.436 0 9.87-4.333 10.02-9.736v-.562Zm-10.02 5.293a5 5 0 0 1-5.01-5.005 5 5 0 0 1 5.01-5.005 5 5 0 0 1 5.01 5.005 5 5 0 0 1-5.01 5.005ZM96.371"
            />
          </SvgIcon> */}
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
                    sx={{
                      mt: "18px",
                      mb: "16px",
                      color: "white",
                      display: "block",
                    }}
                  >
                    {page.name}
                  </Button>
                )
            )}
          </Box>

          <ThemeSwitch />
          <Box>
            <Box
              onClick={handleOpenUserMenu}
              display="flex"
              sx={{
                cursor: "pointer",
                px: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#404040" : "#ffaebfae",
                flexGrow: 0,

                gap: 1,
              }}
            >
              <Avatar
                sx={{
                  height: 30,
                  width: 30,
                  display: { mobile: "none", sm: "flex" },
                }}
                variant="rounded"
                alt="R"
              />

              <Box sx={{ minWidth: 70 }} display="block">
                <Typography
                  color={"text.disabled"}
                  component="span"
                  variant="caption"
                  sx={{}}
                >
                  Привет!
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: "-5px" }}>
                  {user.fullName.split(" ")[1]}
                </Typography>
              </Box>
              <Tooltip title="Open settings">
                <IconButton
                  sx={{
                    width: 24,
                    height: 24,
                    display: { mobile: "none", sm: "flex" },
                  }}
                  size="small"
                >
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Tooltip>
            </Box>
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
              <Box
                component="li"
                display="flex"
                sx={{
                  cursor: "pointer",
                  p: "6px",
                  pt: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1,
                  flexGrow: 0,
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{
                    height: 30,
                    width: 30,
                    display: { mobile: "none", sm: "flex" },
                  }}
                  variant="rounded"
                  alt="R"
                />

                <Box sx={{ minWidth: 70 }} display="block">
                  <Typography variant="subtitle2">{user.fullName}</Typography>
                  <Typography
                    color={"text.disabled"}
                    component="span"
                    variant="caption"
                    sx={{}}
                  >
                    {user.contract} - {user.role}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <MenuItem
                key="logout"
                onClick={() => {
                  handleCloseUserMenu();
                  dispatch(removeActiveUser());
                }}
              >
                <Typography textAlign="center">Выйти</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

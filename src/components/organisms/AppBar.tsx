import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Avatar,
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const hamburgerMenuItems = [
  { title: 'Home', link: '/', authRequired: false },
  { title: 'My Shelves', link: '/', authRequired: true },
  { title: 'My Books', link: '/', authRequired: true },
  { title: 'Public Shelves', link: '/', authRequired: false },
  { title: 'About', link: '/', authRequired: false },
];

export default function PrimarySearchAppBar() {
  const { user, logout } = useUser();

  const [hamburgerAnchorEl, setHamburgerAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isHamburgerMenuOpen = Boolean(hamburgerAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHamburgerMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHamburgerAnchorEl(event.currentTarget);
  };

  const handleHamburgerMenuClose = () => {
    setHamburgerAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user && <MenuItem onClick={handleMenuClose}>My Account</MenuItem>}
      {user ? (
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <Typography textAlign="center">
            <Link href="/login">
              <a style={{ textDecoration: 'none' }}>Sign In</a>
            </Link>
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );

  const hamburgerMenuId = 'primary-hamburger-menu';
  const renderHamburgerMenu = (
    <Menu
      anchorEl={hamburgerAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={hamburgerMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isHamburgerMenuOpen}
      onClose={handleHamburgerMenuClose}
    >
      {hamburgerMenuItems.map((menuItem) => {
        if (!user && menuItem.authRequired) {
          return null;
        }
        return (
          <MenuItem onClick={handleHamburgerMenuClose} key={menuItem.title}>
            <Typography textAlign="center">
              <Link href={menuItem.link}>
                <a style={{ textDecoration: 'none', color: 'inherit' }}>
                  {menuItem.title}
                </a>
              </Link>
            </Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            aria-controls={hamburgerMenuId}
            onClick={handleHamburgerMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Smart Reader
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                alt={user ? user.username : 'Guest'}
                src={user ? `/profile/${user.profileImage}` : null}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderHamburgerMenu}
    </Box>
  );
}

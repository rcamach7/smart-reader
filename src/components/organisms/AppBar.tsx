import * as React from 'react';
import Link from 'next/link';
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
  ToggleButton,
  ToggleButtonGroup,
  Switch,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(0),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1.5),
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

export default function PrimarySearchAppBar() {
  const { user, logout } = useUser();
  const router = useRouter();

  const [searchText, setSearchText] = React.useState('');
  const [searchType, setSearchType] = React.useState('books');

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

  const searchTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (!newAlignment) {
      return;
    }
    setSearchType(newAlignment);
  };

  const handleToggleChange = (event) => {
    setSearchType(event.target.checked ? 'shelves' : 'books');
  };

  const hamburgerMenuItems = [
    { title: 'Home', link: '/', authRequired: false },
    { title: 'Search', link: '/search', authRequired: false },
    { title: 'My Library', link: '/my-library', authRequired: true },
    { title: 'Public Shelves', link: '/shelves', authRequired: false },
  ];

  const accountMenuItems = [
    {
      title: 'My Account',
      link: '/account',
      authRequired: true,
      onClickFunction: handleMenuClose,
    },
    {
      title: 'My Library',
      link: '/my-library',
      authRequired: true,
      onClickFunction: handleMenuClose,
    },
    {
      title: 'Sign In',
      link: '/sign-in',
      authRequired: false,
      onClickFunction: handleMenuClose,
    },
    {
      title: 'Create Account',
      link: '/sign-up',
      authRequired: false,
      onClickFunction: handleMenuClose,
    },
  ];

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
      {accountMenuItems.map((item, i) => {
        if (!user && item.authRequired) {
          return;
        }
        if (user && !item.authRequired) {
          return;
        }
        return (
          <Link
            href={item.link}
            style={{ textDecoration: 'none', color: 'inherit' }}
            key={i}
          >
            <MenuItem onClick={item.onClickFunction}>{item.title}</MenuItem>
          </Link>
        );
      })}
      {user ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : null}
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
      {hamburgerMenuItems.map((menuItem, i) => {
        if (!user && menuItem.authRequired) {
          return null;
        }
        if (router.asPath === '/' && menuItem.link === '/') {
          return;
        }
        return (
          <Link key={i} href={menuItem.link}>
            <MenuItem onClick={handleHamburgerMenuClose} key={menuItem.title}>
              <Typography textAlign="center">
                <a style={{ textDecoration: 'none', color: 'inherit' }}>
                  {menuItem.title}
                </a>
              </Typography>
            </MenuItem>
          </Link>
        );
      })}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="app-bar-mui">
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
            sx={{
              display: {
                xs: router.pathname === '/search' ? 'block' : 'none',
                sm: 'block',
              },
            }}
          >
            BookSphere
          </Typography>
          {router.pathname !== '/search' ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={`Search ${searchType}`}
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    router.push({
                      pathname: '/search',
                      query: { query: searchText, type: searchType },
                    });
                    setSearchText('');
                  }
                }}
              />
              <ToggleButtonGroup
                color="primary"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                  height: '100%',
                  pr: 0.5,
                }}
                value={searchType}
                exclusive
                aria-label="search-type"
                onChange={searchTypeChange}
                size="small"
              >
                <ToggleButton
                  value="books"
                  sx={{
                    borderColor: '#6fa6b6',
                    '&.Mui-selected': {
                      color: 'white',
                    },
                    '&:not(.Mui-selected)': {
                      color: 'grey',
                    },
                    fontSize: 10,
                    padding: 0.5,
                  }}
                >
                  Books
                </ToggleButton>
                <ToggleButton
                  value="shelves"
                  sx={{
                    borderColor: '#6fa6b6',
                    '&.Mui-selected': {
                      color: 'white',
                    },
                    '&:not(.Mui-selected)': {
                      color: 'grey',
                    },
                    fontSize: 10,
                    padding: 0.5,
                    pr: 0.5,
                  }}
                >
                  Shelves
                </ToggleButton>
              </ToggleButtonGroup>
              <Switch
                size="small"
                checked={searchType === 'shelves'}
                onChange={handleToggleChange}
                sx={{
                  display: { xs: 'inline', sm: 'none', marginLeft: 'auto' },
                }}
              />
            </Search>
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
          {router.asPath !== '/account' ? (
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
                {user ? (
                  <Avatar
                    alt={user.username}
                    src={`/profile/${user.profileImage}`}
                  />
                ) : (
                  <PersonIcon />
                )}
              </IconButton>
            </Box>
          ) : (
            <IconButton
              aria-label="home"
              onClick={() => {
                router.push('/');
              }}
            >
              <HomeIcon fontSize="inherit" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderHamburgerMenu}
    </Box>
  );
}

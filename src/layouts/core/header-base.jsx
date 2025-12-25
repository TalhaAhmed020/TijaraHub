// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';

import { Box, Badge, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { allLangs } from 'src/locales';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';

import { HeaderSection } from './header-section';
import { MenuButton } from '../components/menu-button';
import { LanguagePopover } from '../components/language-popover';

// ----------------------------------------------------------------------

const StyledDivider = styled('span')(({ theme }) => ({
  width: 1,
  height: 10,
  flexShrink: 0,
  display: 'none',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  backgroundColor: 'currentColor',
  color: theme.vars.palette.divider,
  '&::before, &::after': {
    top: -5,
    width: 3,
    height: 3,
    content: '""',
    flexShrink: 0,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'currentColor',
  },
  '&::after': { bottom: -5, top: 'auto' },
}));

// ----------------------------------------------------------------------

export function HeaderBase({
  sx,
  data,
  slots,
  slotProps,
  onOpenNav,
  layoutQuery,

  slotsDisplay: {
    signIn = true,
    account = true,
    helpLink = true,
    settings = true,
    purchase = true,
    contacts = true,
    searchbar = true,
    workspaces = true,
    menuButton = true,
    localization = true,
    notifications = true,
  } = {},

  ...other
}) {
  const theme = useTheme();
  const cartItems = useSelector((state) => state.product.cartItems);

  const languageData = allLangs;

  return (
    <HeaderSection
      sx={sx}
      layoutQuery={layoutQuery}
      slots={{
        ...slots,
        leftAreaStart: slots?.leftAreaStart,
        leftArea: (
          <>
            {slots?.leftAreaStart}

            {/* -- Menu button -- */}
            {menuButton && (
              <MenuButton
                data-slot="menu-button"
                onClick={onOpenNav}
                sx={{
                  mr: 1,
                  ml: -1,
                  [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                }}
              />
            )}

            {/* -- Logo -- */}
            <Logo data-slot="logo" />

            {/* -- Divider -- */}
            <StyledDivider data-slot="divider" />

            {/* -- Workspace popover -- */}
            {/* {workspaces && <WorkspacesPopover data-slot="workspaces" data={data?.workspaces} />} */}

            {slots?.leftAreaEnd}
          </>
        ),
        rightArea: (
          <>

            {/* {slots?.rightAreaStart} */}

            <Box
              data-area="right"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
              }}
            >
              {/* -- Language popover -- */}
              {
                localization &&
                <LanguagePopover data-slot="localization" data={languageData} />
              }

              <Button
                data-slot="purchase"
                variant="contained"
                color="primary"
                rel="noopener"
                component={RouterLink}
                to={paths.addToCart}
                sx={{
                  display: 'none',
                  [theme.breakpoints.up(layoutQuery)]: {
                    display: 'inline-flex',
                  },
                }}
              >
                <Badge
                  badgeContent={cartItems.length}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      // backgroundColor: BRAND_COLORS.primary,
                      color: 'white',
                      fontWeight: 'bold',
                    }
                  }}
                >
                  <Iconify icon="eva:shopping-cart-fill" width={20} />
                </Badge>
              </Button>

              {/* <Button
                data-slot="purchase"
                variant="contained"
                color="primary"
                rel="noopener"
                component={RouterLink}
                to={paths.auth.jwt.signIn}
                sx={{
                  display: 'none',
                  [theme.breakpoints.up(layoutQuery)]: {
                    display: 'inline-flex',
                  },
                }}
              >
                Sign In
              </Button> */}


            </Box>


            {slots?.rightAreaEnd}
          </>
        ),
      }}
      slotProps={slotProps}
      {...other}
    />
  );
}

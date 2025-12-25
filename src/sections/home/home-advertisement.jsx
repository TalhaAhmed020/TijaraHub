import { m } from 'framer-motion';

// ... (existing imports)
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { useTranslate } from 'src/locales';
import { varAlpha, textGradient } from 'src/theme/styles'; // <-- Added
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { varFade, MotionViewport } from 'src/components/animate';

import { FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function ContactUsSection({ sx, ...other }) {
  const theme = useTheme();
  const { t } = useTranslate(); // <-- Destructure t

  const renderLines = (
    <>
      <FloatPlusIcon sx={{ left: 72, top: '50%', mt: -1 }} />
      <FloatLine vertical sx={{ top: 0, left: 80, height: 'calc(50% + 64px)' }} />
      <FloatLine sx={{ top: '50%', left: 0 }} />
    </>
  );

  const renderDescription = (
    <Stack spacing={3} sx={{ zIndex: 9, flexGrow: 1 }}>
      <Box
        component={m.h2}
        variants={varFade({ distance: 24 }).inDown}
        sx={{ m: 0, color: 'common.white', typography: { xs: 'h2', md: 'h1' } }}
      >
        {/* New Heading Text: Need to place a bulk order? */}
        {t('contact.bulkHeadingLine1')}
        <br /> {t('contact.bulkHeadingLine2')}
        <Box
          component="span"
          sx={{
            ...textGradient(
              `to right, ${theme.vars.palette.common.white}, ${varAlpha(
                theme.vars.palette.common.whiteChannel,
                0.4
              )}`
            ),
            ml: 1,
          }}
        >
          {/* New Heading Text: Contact us */}
          {t('contact.bulkHeadingAction')}
        </Box>
      </Box>

      <Typography variant="body1" sx={{ color: 'common.white', opacity: 0.72 }}>
        {/* New Paragraph Text */}
        {t('contact.bulkDescription')}
      </Typography>

      <Stack
        spacing={2}
        direction={{ xs: 'column', md: 'row' }}
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent={{ xs: 'center', md: 'flex-start' }}
      >
        <m.div variants={varFade({ distance: 24 }).inRight}>
          <Link
            href="mailto:sales@amsksa.com"
            color="inherit"
            underline="none"
            sx={{ display: 'flex', alignItems: 'center', color: 'common.white', typography: 'h6', mb: 1.5 }}
          >
            <Iconify icon="material-symbols:mail" sx={{ mr: 1, color: 'primary.main' }} />
            sales@amsksa.com
          </Link>
        </m.div>

        <m.div variants={varFade({ distance: 24 }).inRight}>
          <Link
            href="tel:+966 539286225"
            color="inherit"
            underline="none"
            sx={{ display: 'flex', alignItems: 'center', color: 'common.white', typography: 'h6' }}
          >
            <Iconify icon="material-symbols:phone" sx={{ mr: 1, color: 'primary.main' }} />
            +966 539286225
          </Link>
        </m.div>
      </Stack>
    </Stack>
  );

  // ... (renderImg, renderGridBg, renderBlur, and the final return remain unchanged)

  const renderImg = (
    <m.div variants={varFade().inUp}>
      <Box
        component={m.img}
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
        alt="sports equipment support"
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        sx={{ zIndex: 9, width: 360, aspectRatio: '1/1', borderRadius: 2, objectFit: 'cover' }}
      />
    </m.div>
  );

  const renderGridBg = (
    <m.div variants={varFade().in}>
      <SvgColor
        src={`${CONFIG.site.basePath}/assets/background/shape-grid.svg`}
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: 8,
          opacity: 0.08,
          color: 'grey.500',
          position: 'absolute',
          maskSize: 'auto 100%',
        }}
      />
    </m.div>
  );

  const renderBlur = (
    <Box
      sx={{
        top: 0,
        right: 0,
        zIndex: 7,
        width: 240,
        height: 240,
        bgcolor: 'grey.500',
        position: 'absolute',
        filter: 'blur(200px)',
      }}
    />
  );

  return (
    <Stack component="section" sx={{ position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container sx={{ position: 'relative', zIndex: 9 }}>
          <Stack
            spacing={5}
            alignItems="center"
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              py: 8,
              px: 5,
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'grey.900',
              position: 'relative',
              textAlign: { xs: 'center', md: 'left' },
              border: `solid 1px ${theme.vars.palette.grey[800]}`,
            }}
          >
            {renderImg}

            {renderDescription}

            {renderGridBg}

            {renderBlur}
          </Stack>
        </Container>
      </MotionViewport>
    </Stack>
  );
}
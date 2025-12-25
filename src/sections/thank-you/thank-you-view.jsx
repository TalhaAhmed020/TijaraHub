/* eslint-disable no-shadow */
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { textGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function ThankYou({ sx, ...other }) {
  const theme = useTheme();

  const { t } = useTranslate();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        
        {/* Success Icon Animation */}
        <m.div variants={varFade().inUp}>
          <Box
            sx={{
              mb: 5,
              mx: 'auto',
              width: 120,
              height: 120,
              display: 'flex',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: theme.vars.palette.success.lighter,
              color: theme.vars.palette.success.main,
            }}
          >
            <Iconify icon="solar:check-circle-bold-duotone" width={80} />
          </Box>
        </m.div>

        {/* Heading */}
        <m.div variants={varFade().inUp}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('thank_you.title')}{' '}
            <Box
              component="span"
              sx={{
                ...textGradient(
                  `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 100%`
                ),
              }}
            >
              {t('thank_you.title_gradient')}
            </Box>
          </Typography>
        </m.div>

        {/* Subtext */}
        <m.div variants={varFade().inUp}>
          <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>
            {t('thank_you.subtitle')}
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography
            sx={{
              mx: 'auto',
              maxWidth: 480,
              color: 'text.disabled',
              mb: 5,
            }}
          >
            {t('thank_you.description')}
          </Typography>
        </m.div>

        {/* Action Button */}
        <m.div variants={varFade().inUp}>
          <Button
            component={RouterLink}
            href="/"
            size="large"
            variant="contained"
            color="primary"
            startIcon={
              <Iconify 
                icon={theme.direction === 'rtl' ? 'eva:arrow-forward-fill' : 'eva:arrow-back-fill'} 
              />
            }
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 1.5,
              boxShadow: theme.customShadows.primary,
            }}
          >
            {t('thank_you.button')}
          </Button>
        </m.div>

        {/* Brand Decoration Background */}
        <Box
          sx={{
            zIndex: -1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 400,
            height: 400,
            opacity: 0.1,
            filter: 'blur(100px)',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme.vars.palette.primary.main,
            borderRadius: '50%',
          }}
        />
      </Container>
    </Box>
  );
}
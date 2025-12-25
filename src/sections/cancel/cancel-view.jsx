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

export function CancelView({ sx, ...other }) {
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
        
        {/* Cancel/Warning Icon Animation */}
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
              bgcolor: theme.vars.palette.error.lighter,
              color: theme.vars.palette.error.main,
            }}
          >
            <Iconify icon="solar:close-circle-bold-duotone" width={80} />
          </Box>
        </m.div>

        {/* Heading */}
        <m.div variants={varFade().inUp}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('cancel_view.title')}{' '}
            <Box
              component="span"
              sx={{
                ...textGradient(
                  `300deg, ${theme.vars.palette.error.main} 0%, ${theme.vars.palette.warning.main} 100%`
                ),
              }}
            >
              {t('cancel_view.title_gradient')}
            </Box>
          </Typography>
        </m.div>

        {/* Subtext */}
        <m.div variants={varFade().inUp}>
          <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>
            {t('cancel_view.subtitle')}
          </Typography>
        </m.div>

        {/* Description */}
        <m.div variants={varFade().inUp}>
          <Typography
            sx={{
              mx: 'auto',
              maxWidth: 480,
              color: 'text.disabled',
              mb: 5,
            }}
          >
            {t('cancel_view.description')}
          </Typography>
        </m.div>

        {/* Action Buttons */}
        <m.div variants={varFade().inUp}>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              component={RouterLink}
              href="/"
              size="large"
              variant="outlined"
              color="inherit"
              startIcon={<Iconify icon="eva:arrow-back-fill" />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 1.5,
              }}
            >
              {t('cancel_view.btn_home')}
            </Button>
          </Box>
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
            opacity: 0.08,
            filter: 'blur(100px)',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme.vars.palette.error.main,
            borderRadius: '50%',
          }}
        />
      </Container>
    </Box>
  );
}
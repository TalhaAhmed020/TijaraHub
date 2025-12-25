import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { _mock } from 'src/_mock';
import { useTranslate } from 'src/locales';
import { maxLine, varAlpha, textGradient } from 'src/theme/styles';

import { varFade, MotionViewport, AnimateCountUp } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function HomeTestimonials({ sx, ...other }) {
  const theme = useTheme();

  const { t, onChangeLang } = useTranslate();
  

  const renderLines = (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{ top: 64, left: 80, position: 'absolute', transform: 'translateX(-15px)' }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon sx={{ width: 30, height: 15, opacity: 0.24, position: 'static' }} />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '40px' },
      [carouselBreakpoints.lg]: { slideSpacing: '64px' },
    },
  });

  const renderDescription = (
    <SectionTitle
      caption={t("testimonials")}
      title={t("What our customers")}
      txtGradient={t("say...")}
      sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
    />
  );

  const horizontalDivider = (position) => (
    <Divider
      component="div"
      sx={{
        width: 1,
        opacity: 0.16,
        height: '1px',
        border: 'none',
        position: 'absolute',
        background: `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 100%)`,
        ...(position === 'top' && { top: 0 }),
        ...(position === 'bottom' && { bottom: 0 }),
      }}
    />
  );

  const verticalDivider = (
    <Divider
      component="div"
      orientation="vertical"
      flexItem
      sx={{
        opacity: 0.16,
        border: 'none',
        width: '1px',
        background: `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 100%)`,
        display: { xs: 'none', md: 'block' },
      }}
    />
  );

  const renderContent = (
    <Stack sx={{ position: 'relative', py: { xs: 5, md: 8 } }}>
      {horizontalDivider('top')}

      <Carousel carousel={carousel}>
        {TESTIMONIALS.map((item) => (
          <Stack key={item.id} component={m.div} variants={varFade().in}>
            <Stack spacing={1} sx={{ typography: 'subtitle2' }}>
              <Rating size="small" name="read-only" value={item.rating} precision={0.5} readOnly />
              {t(item.category)}
            </Stack>

            <Typography
              sx={{ ...maxLine({ line: 4, persistent: theme.typography.body1 }), mt: 2, mb: 3 }}
            >
              {t(item.content)}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar alt={item.name} src={item.avatar} sx={{ width: 48, height: 48 }} />
              <Stack sx={{ typography: 'subtitle1' }}>
                <Box component="span">{item.name}</Box>
                <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
                  {fToNow(new Date(item.postedAt))}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Carousel>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: { xs: 5, md: 8 } }}
      >
        <CarouselDotButtons
          fallback
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />

        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
      </Stack>
    </Stack>
  );

  const renderNumber = (
    <Stack sx={{ py: { xs: 5, md: 8 }, position: 'relative' }}>
      {horizontalDivider('top')}

      <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} divider={verticalDivider}>
        {[
          { label: t('Orders delivered'), value: 2.5 },
          { label: t('Happy athletes'), value: 850 },
          { label: t('Review rate'), value: 4.8 },
        ].map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade({ distance: 24 }).inUp}>
              <AnimateCountUp
                to={item.value}
                unit={item.label === 'Orders delivered' ? 'k+' : '+'}
                toFixed={item.label === 'Happy athletes' ? 0 : 1}
                sx={{
                  fontWeight: 'fontWeightBold',
                  fontSize: { xs: 40, md: 64 },
                  lineHeight: { xs: 50 / 40, md: 80 / 64 },
                  fontFamily: theme.typography.fontSecondaryFamily,
                }}
              />
            </m.div>

            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Box
                component="span"
                sx={{
                  ...textGradient(
                    `90deg, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
                  ),
                  opacity: 0.4,
                  typography: 'h6',
                }}
              >
                {item.label}
              </Box>
            </m.div>
          </Stack>
        ))}
      </Stack>

      {horizontalDivider('bottom')}
    </Stack>
  );

  return (
    <Stack component="section" sx={{ py: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container>
          {renderDescription}

          {renderContent}

          {renderNumber}
        </Container>
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const base = (index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatar: _mock.image.avatar(index),
  rating: 5,
});

const TESTIMONIALS = [
  {
    ...base(1),
    category: 'Product Quality',
    content: `Excellent quality footballs and equipment! Our team has been using their gear for the entire season. The footballs maintain their shape perfectly and the goalkeeper gloves provide amazing grip. Highly recommend for any serious team!`,
    postedAt: 'September 15, 2025 14:30:00',
  },
  {
    ...base(2),
    category: 'Custom Uniforms',
    content: `Amazing custom team uniforms! They perfectly matched our design requirements and the quality of the fabric is outstanding. The whole team looks professional and feels comfortable during matches.`,
    postedAt: 'September 10, 2025 16:45:00',
  },
  {
    ...base(3),
    category: 'Boxing Equipment',
    content: `Top-notch boxing gloves! Great padding, excellent durability, and comfortable fit. I've been training for months with these and they still look and feel brand new. Worth every penny!`,
    postedAt: 'September 5, 2025 10:20:00',
  },
  {
    ...base(4),
    category: 'Customer Service',
    content: `Outstanding customer service! They helped us customize our team tracksuits exactly as we wanted. Fast delivery and the quality exceeded our expectations. Will definitely order again!`,
    postedAt: 'August 28, 2025 18:15:00',
  },
  {
    ...base(5),
    category: 'Goalkeeper Equipment',
    content: 'The goalkeeper gloves are fantastic! Perfect grip in all weather conditions and excellent wrist support. My son feels much more confident in goal with these gloves.',
    postedAt: 'August 22, 2025 12:30:00',
  },
  {
    ...base(6),
    category: 'Team Accessories',
    content: 'Great variety of accessories! The head ribbons, wrist bands, and socks are all high quality. Perfect for our youth team and the kids love the bright colors.',
    postedAt: 'August 18, 2025 09:45:00',
  },
  {
    ...base(7),
    category: 'Sportswear Quality',
    content: 'The sports shirts and trousers are incredibly comfortable and durable. After dozens of training sessions and matches, they still look great. The breathable fabric is perfect for intense workouts.',
    postedAt: 'August 12, 2025 15:20:00',
  },
  {
    ...base(8),
    category: 'Custom Orders',
    content: 'Impressed with their customization service! They created exactly what our club needed - unique designs with our logo and colors. Professional quality at reasonable prices.',
    postedAt: 'August 8, 2025 11:10:00',
  },
];
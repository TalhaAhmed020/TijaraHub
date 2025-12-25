import { m } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import { useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { removeFromCart, updateQuantity } from 'src/features/product/slice';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const BRAND_COLORS = {
  primary: '#FF8C00',
  secondary: '#0288D1',
  navy: '#1B3A5C',
  orange: {
    lighter: '#FFE4CC',
    light: '#FFB366',
    main: '#FF8C00',
    dark: '#CC7000',
  },
  teal: {
    lighter: '#B3E5FC',
    light: '#4FC3F7',
    main: '#0288D1',
    dark: '#01579B',
  },
};

export function AddToCart({ sx, ...other }) {
  const { t, currentLang } = useTranslate();
  const cartItems = useSelector((state) => state.product?.cartItems || []);
  const dispatch = useDispatch();
  const router = useRouter();

  // --- Cart Calculations ---
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const total = calculateSubtotal();

  // --- Handlers ---
  const handleQuantityChange = (id, type) => {
    dispatch(updateQuantity({ id, type }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleProceedToCheckout = () => {
    router.push('/place-order');
  };

  // --- UI Elements ---

  const renderLines = (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{ top: 64, left: 80, position: 'absolute', transform: 'translateX(-15px)' }}
      >
        <FloatTriangleDownIcon
          sx={{ position: 'static', opacity: 0.12, color: BRAND_COLORS.orange.light }}
        />
        <FloatTriangleDownIcon
          sx={{
            width: 30,
            height: 15,
            opacity: 0.24,
            position: 'static',
            color: BRAND_COLORS.teal.light,
          }}
        />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80, bgcolor: BRAND_COLORS.orange.lighter }} />
    </>
  );

  const renderHeader = (
    <SectionTitle
      caption={t('cart.caption')}
      title={t('cart.title')}
      txtGradient={t('cart.title_gradient')}
      sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
    />
  );

  const renderCartItems = (
    <Stack spacing={3} component={m.div} variants={varFade({ distance: 24 }).inLeft}>
      {cartItems.length === 0 ? (
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Iconify
            icon="eva:shopping-cart-outline"
            sx={{ width: 80, height: 80, color: 'text.disabled', mb: 2 }}
          />
          <Typography variant="h5" sx={{ color: BRAND_COLORS.navy, mb: 1 }}>
            {t('cart.empty_title')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            {t('cart.empty_description')}
          </Typography>

          <Button
            variant="contained"
            onClick={() => router.push('/')}
            sx={{
              bgcolor: BRAND_COLORS.primary,
              '&:hover': { bgcolor: BRAND_COLORS.orange.dark },
            }}
          >
            {t('cart.continue_shopping')}
          </Button>
        </Card>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card
              key={item.id}
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
              sx={{
                border: `1px solid ${BRAND_COLORS.teal.lighter}`,
                '&:hover': {
                  boxShadow: `0 4px 12px ${BRAND_COLORS.orange.lighter}`,
                },
              }}
            >
              <CardContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: { xs: '100%', sm: 120 },
                      height: { xs: 200, sm: 120 },
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: `2px solid ${BRAND_COLORS.orange.light}`,
                    }}
                  />

                  <Stack spacing={1} sx={{ flex: 1, width: '100%' }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      {item.category}
                    </Typography>
                    <Typography variant="h6" sx={{ color: BRAND_COLORS.navy }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: BRAND_COLORS.primary, fontWeight: 'bold' }}
                    >
                      {t('cart.currency')} {item.price.toLocaleString()}
                    </Typography>
                  </Stack>

                  <Stack spacing={2} alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 'decrement')}
                        sx={{ border: `1px solid ${BRAND_COLORS.teal.main}`, color: BRAND_COLORS.navy }}
                      >
                        <Iconify icon="eva:minus-fill" />
                      </IconButton>

                      <Typography
                        variant="subtitle1"
                        sx={{ minWidth: 40, textAlign: 'center', fontWeight: 'bold', color: BRAND_COLORS.navy }}
                      >
                        {item.quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 'increment')}
                        sx={{ border: `1px solid ${BRAND_COLORS.teal.main}`, color: BRAND_COLORS.navy }}
                      >
                        <Iconify icon="eva:plus-fill" />
                      </IconButton>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h6" sx={{ color: BRAND_COLORS.primary }}>
                        {t('cart.currency')} {(item.price * item.quantity).toLocaleString()}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{ color: 'error.main', '&:hover': { bgcolor: 'error.lighter' } }}
                      >
                        <Iconify icon="eva:trash-2-outline" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Stack>
  );

  const renderSummary = (
    <Stack spacing={3} component={m.div} variants={varFade({ distance: 24 }).inRight}>
      <Card
        sx={{
          p: 3,
          border: `2px solid ${BRAND_COLORS.orange.light}`,
          boxShadow: `0 8px 24px ${BRAND_COLORS.teal.lighter}`,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: BRAND_COLORS.navy }}>
          {t('cart.order_summary')}
        </Typography>

        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">{t('cart.subtotal')}</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {t('cart.currency')} {calculateSubtotal().toLocaleString()}
            </Typography>
          </Stack>

          <Divider sx={{ my: 2, borderColor: BRAND_COLORS.teal.lighter }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" sx={{ color: BRAND_COLORS.navy }}>
              {t('cart.total')}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: BRAND_COLORS.primary }}>
              {t('cart.currency')} {total.toLocaleString()}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3, borderColor: BRAND_COLORS.orange.light }} />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleProceedToCheckout}
          disabled={cartItems.length === 0}
          startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          sx={{
            mt: 3,
            bgcolor: BRAND_COLORS.primary,
            color: 'white',
            '&:hover': { bgcolor: BRAND_COLORS.orange.dark },
          }}
        >
          {t('cart.checkout')}
        </Button>
      </Card>
    </Stack>
  );

  return (
    <Stack component="section" sx={{ py: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}
        <Container>
          {renderHeader}
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 5, md: 8 },
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            }}
          >
            {renderCartItems}
            {renderSummary}
          </Box>
        </Container>
      </MotionViewport>
    </Stack>
  );
}
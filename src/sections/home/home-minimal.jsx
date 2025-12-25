/* eslint-disable import/no-extraneous-dependencies */
import 'swiper/css';
import 'swiper/css/pagination';
import { toast } from 'sonner';
// ⭐️ FRAMER MOTION: Use 'motion' if 'm' gives an error
import { m } from 'framer-motion';
// ⭐️ REDUX IMPORTS
import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import { useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { useGetCategories } from 'src/actions/categories';
import { addToCart, setProduct } from 'src/features/product/slice';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon } from './components/svg-elements';


// TijaraHub Brand Colors
const BRAND_COLORS = {
  primary: '#FF8C00',
  secondary: '#0288D1',
  navy: '#1B3A5C',
  orange: {
    lighter: '#FFE4CC',
    light: '#FFB366',
    main: '#FF8C00',
    dark: '#CC7000',
    darker: '#995400',
  },
  teal: {
    lighter: '#B3E5FC',
    light: '#4FC3F7',
    main: '#0288D1',
    dark: '#01579B',
    darker: '#01396F',
  }
};

// ----------------------------------------------------------------------

/**
 * Product Card with local Quantity Selector logic.
 */
function ProductItem({ categoryName, product, handleAddToCart, brandColors }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslate();

  const handleQuantityChange = useCallback((event) => {
    const value = Number(event.target.value);
    setQuantity(Math.max(1, value));
  }, []);

  const handleIncreaseQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const handleDecreaseQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }, []);

  const handleCardClick = () => {
    dispatch(setProduct(product));
    router.push(`/product/${product.id}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    toast.success('Product added to cart');
    handleAddToCart(categoryName, product, quantity); // Dispatch Redux action via prop
  };

  return (
    <Card
      // Use 'm.div' if you imported 'motion as m' 
      component={m.div}
      variants={varFade({ distance: 24 }).inUp}
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        cursor: 'pointer',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        border: `1px solid ${brandColors.teal.lighter}`,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 24px ${brandColors.orange.lighter}`,
          borderColor: brandColors.orange.main,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.images ? product.images[0] : product.image}
        alt={product.title || product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ color: brandColors.navy }}
        >
          {product.title || product.name}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          {/* Price */}
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: brandColors.primary }}
          >
            SAR. {product.price ? product.price.toLocaleString() : 'N/A'}
          </Typography>

          {/* Quantity Selector */}
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${brandColors.teal.light}`,
              borderRadius: 1,
            }}
          >
            <IconButton size="small" onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
              <Iconify icon="eva:minus-fill" width={16} />
            </IconButton>

            <InputBase
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, style: { textAlign: 'center' } }}
              sx={{
                width: 30,
                textAlign: 'center',
                '& input': { p: 0.5, textAlign: 'center' },
              }}
            />

            <IconButton size="small" onClick={handleIncreaseQuantity}>
              <Iconify icon="eva:plus-fill" width={16} />
            </IconButton>
          </Box>
        </Stack>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<Iconify icon="eva:shopping-cart-fill" />}
          onClick={handleCartClick}
          disabled={quantity < 1}
          sx={{
            mt: 'auto',
            bgcolor: brandColors.primary,
            color: '#FFFFFF',
            '&:hover': {
              bgcolor: brandColors.orange.dark,
            },
          }}
        >
          {t('product_details.add_to_cart')}

        </Button>
      </CardContent>
    </Card>
  );
}
// ----------------------------------------------------------------------


export function ProductCategories({ sx, ...other }) {
  // ⭐️ 1. Initialize Redux Dispatch hook
  const dispatch = useDispatch();

  const { t, onChangeLang } = useTranslate();

  const { products: fetchedProducts, productsLoading } = useGetCategories(0);

  // ⭐️ 2. Update handleAddToCart to dispatch the Redux action
  const handleAddToCart = useCallback((categoryName, product, quantity) => {
    dispatch(
      addToCart({
        id: product.id,
        quantity,
        price: product.price,
        // Include UI fields for convenience
        title: product.title || product.name,
        image: product.images ? product.images[0] : product.image,
      })
    );

    console.log(`Dispatched: Added ${quantity} of ${product.title || product.name} to Redux Cart`);
  }, [dispatch]);

  // Fallback to empty array if data isn't ready
  const dataToRender = fetchedProducts || [];

  const renderLines = (
    <>
      <FloatPlusIcon sx={{ top: 72, left: 72, color: BRAND_COLORS.orange.light }} />
      <FloatPlusIcon sx={{ bottom: 72, left: 72, color: BRAND_COLORS.teal.light }} />
      <FloatLine sx={{ top: 80, left: 0, bgcolor: BRAND_COLORS.orange.lighter }} />
      <FloatLine sx={{ bottom: 80, left: 0, bgcolor: BRAND_COLORS.teal.lighter }} />
      <FloatLine vertical sx={{ top: 0, left: 80, bgcolor: BRAND_COLORS.orange.lighter }} />
    </>
  );

  return (
    <Stack
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        py: { xs: 10, md: 20 },
        ...sx,
      }}
      {...other}
    >
      <MotionViewport>
        {renderLines}

        <Container sx={{ position: 'relative' }}>
          <SectionTitle
            caption={t("Explore our sports range")}
            title={t("Shop by")}
            txtGradient={t("Categories")}
            sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
          />

          {productsLoading && (
            <Typography variant="h6" align="center" sx={{ color: BRAND_COLORS.navy }}>
              {t('Loading Categories...')}
            </Typography>
          )}

          <Stack spacing={10}>
            {dataToRender.map((category) => (
              <Box
                key={category.id}
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
              >
                {/* Category Header */}
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h3"
                      component="h2"
                      sx={{
                        mb: 1,
                        textAlign: { xs: 'center', sm: 'left' },
                        color: BRAND_COLORS.navy,
                      }}
                    >
                      {category.title || category.categoryName}
                    </Typography>
                    <Divider
                      sx={{
                        borderColor: BRAND_COLORS.orange.light,
                        borderWidth: 2,
                      }}
                    />
                  </Box>
                </Box>

                {/* Products Grid */}
                <Grid container spacing={3}>
                  {(category.products || []).map((product) => (
                    <Grid key={product.id} xs={12} sm={6} md={3}>
                      <ProductItem
                        categoryName={category.title || category.categoryName}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        brandColors={BRAND_COLORS}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Stack>
        </Container>
      </MotionViewport>
    </Stack>
  );
}
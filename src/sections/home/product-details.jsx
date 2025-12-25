import { toast } from 'sonner';
import { useState } from 'react';
import { m } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';
import { addToCart } from 'src/features/product/slice';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate'; // Import localization hook
import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function ProductDetailsByCategories({ sx, ...other }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslate(); // Destructure translation function

  const product = useSelector((state) => state.product.selectedProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Box sx={{ py: 20, textAlign: 'center' }}>
        <Typography variant="h4" color="text.secondary">
          {t('product_details.not_selected')}
        </Typography>
      </Box>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCartClick = () => {
    toast.success('Product added to cart');
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: Number(product.price),
        quantity,
        image: product.images?.[0] || '',
      })
    );
  };

  // --- Render Sections ---

  const renderLines = (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          position: 'absolute',
          transform: 'translateX(-15px)',
          [theme.breakpoints.down('md')]: { display: 'none' }
        }}
      >
        <FloatTriangleDownIcon sx={{
          position: 'static',
          opacity: 0.08,
          color: theme.palette.primary.light
        }} />
        <FloatTriangleDownIcon sx={{
          width: 30,
          height: 15,
          opacity: 0.16,
          position: 'static',
          color: theme.palette.primary.main
        }} />
      </Stack>
      <FloatLine vertical sx={{
        top: 0,
        left: 80,
        bgcolor: alpha(theme.palette.primary.light, 0.15),
        [theme.breakpoints.down('md')]: { display: 'none' }
      }} />
    </>
  );

  const renderProductImages = (
    <Stack spacing={2.5} component={m.div} variants={varFade({ distance: 24 }).inLeft}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
          boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
          }
        }}
      >
        <Box
          component="img"
          src={product.images?.[selectedImage]}
          alt={product.title}
          sx={{
            width: '100%',
            height: { xs: 300, sm: 400, md: 520 },
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            }
          }}
        />
        {product.isNew && (
          <Chip
            label={t('product_details.new')}
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: theme.palette.success.main,
              color: theme.palette.success.contrastText,
              fontWeight: 'bold',
              boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.3)}`
            }}
          />
        )}
      </Box>

      <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap">
        {product.images?.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            onClick={() => setSelectedImage(index)}
            sx={{
              width: 72,
              height: 72,
              objectFit: 'cover',
              borderRadius: 1.5,
              cursor: 'pointer',
              border: selectedImage === index
                ? `2px solid ${theme.palette.primary.main}`
                : `1px solid ${alpha(theme.palette.divider, 0.8)}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: alpha(theme.palette.primary.main, 0.5),
              },
            }}
          />
        ))}
      </Stack>
    </Stack>
  );

  const renderProductDetails = (
    <Stack spacing={3.5} component={m.div} variants={varFade({ distance: 24 }).inRight}>
      <Box>
        <Typography variant="overline" sx={{
          color: 'text.secondary',
          letterSpacing: 1,
          mb: 0.5
        }}>
          {product.category?.toUpperCase()}
        </Typography>
        <Typography variant="h3" sx={{
          color: 'text.primary',
          fontWeight: 700,
          lineHeight: 1.2,
          mb: 1
        }}>
          {product.title}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.warning.main
          }}>
            {[...Array(5)].map((_, i) => (
              <Iconify
                key={i}
                icon={i < 4 ? "eva:star-fill" : "eva:star-outline"}
                width={18}
              />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            (128 {t('product_details.reviews')})
          </Typography>
        </Stack>
      </Box>

      <Box sx={{
        bgcolor: alpha(theme.palette.primary.lighter, 0.3),
        borderRadius: 2,
        p: 2.5,
        borderLeft: `4px solid ${theme.palette.primary.main}`
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{
            color: theme.palette.primary.main,
            fontWeight: 800,
          }}>
            {t('common.currency')} {Number(product.price).toLocaleString()}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
            <Iconify icon="solar:delivery-bold" width={20} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {t('product_details.delivery')}: {product.deliveryDays}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.6), my: 1 }} />

      <Box>
        <Typography variant="h6" sx={{
          mb: 2, color: 'text.primary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1
        }}>
          <Iconify icon="solar:document-text-bold" width={20} />
          {t('product_details.description')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
          {product.description}
        </Typography>
      </Box>

      {/* Features */}
      {product.features?.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{
            mb: 2, color: 'text.primary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1
          }}>
            <Iconify icon="solar:verified-check-bold" width={20} />
            {t('product_details.key_features')}
          </Typography>
          <Stack spacing={1.5}>
            {product.features.map((feature, index) => (
              <Stack key={index} direction="row" spacing={1.5} alignItems="flex-start">
                <Box sx={{
                  width: 20, height: 20, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.25
                }}>
                  <Iconify icon="eva:checkmark-fill" width={12} sx={{ color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {/* Specifications */}
      {product.specifications?.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{
            mb: 2, color: 'text.primary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1
          }}>
            <Iconify icon="solar:settings-bold" width={20} />
            {t('product_details.specifications')}
          </Typography>
          <Box sx={{ bgcolor: alpha(theme.palette.background.neutral, 0.5), borderRadius: 2, p: 2.5 }}>
            <Stack spacing={1.5}>
              {product.specifications.map((spec, index) => (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    py: 1.5,
                    borderBottom: index < product.specifications.length - 1
                      ? `1px solid ${alpha(theme.palette.divider, 0.5)}`
                      : 'none'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {spec.key}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                    {spec.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      )}

      {/* Quantity & Action */}
      <Box sx={{ bgcolor: alpha(theme.palette.background.neutral, 0.3), borderRadius: 2, p: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 500 }}>
              {t('product_details.quantity')}
            </Typography>
            <ButtonGroup
              variant="outlined"
              size="large"
              sx={{
                borderColor: alpha(theme.palette.primary.main, 0.2),
                '& .MuiButton-root': {
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.04)
                  }
                }
              }}
            >
              <Button onClick={() => handleQuantityChange('decrement')} sx={{ px: 3 }}>
                <Iconify icon="eva:minus-fill" />
              </Button>
              <Button disabled sx={{
                minWidth: 60, fontWeight: 600, fontSize: '1.125rem',
                "&.Mui-disabled": { color: 'text.primary', opacity: 1 }
              }}>
                {quantity}
              </Button>
              <Button onClick={() => handleQuantityChange('increment')} sx={{ px: 3 }}>
                <Iconify icon="eva:plus-fill" />
              </Button>
            </ButtonGroup>
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<Iconify icon="eva:shopping-cart-fill" />}
            onClick={handleAddToCartClick}
            sx={{
              height: 56, bgcolor: 'primary.main', color: 'primary.contrastText', px: 6, fontWeight: 700, borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: 'primary.dark', transform: 'translateY(-2px)',
                boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
              }
            }}
          >
            {t('product_details.add_to_cart')}
          </Button>
        </Stack>

        {/* Tags */}
        {product.tags?.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1, alignSelf: 'center' }}>
              {t('product_details.tags')}:
            </Typography>
            {product.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.lighter, 0.5), color: 'text.primary', fontWeight: 500, borderRadius: 1,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.light, 0.2) }
                }}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}
        <Container maxWidth="lg">
          <SectionTitle
            caption={t('product_details.section_caption')}
            title={t('product_details.section_title')}
            txtGradient={t('product_details.section_gradient')}
            sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center', maxWidth: 600, mx: 'auto' }}
          />

          <Box sx={{ display: 'grid', gap: { xs: 6, md: 10 }, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, alignItems: 'start' }}>
            {renderProductImages}
            {renderProductDetails}
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}
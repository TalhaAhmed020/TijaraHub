import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { placeOrder } from 'src/actions/place-order';
import { clearCart } from 'src/features/product/slice';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const BRAND_COLORS = {
    primary: '#FF8C00',
    secondary: '#0288D1',
    navy: '#1B3A5C',
    orange: { lighter: '#FFE4CC', light: '#FFB366', main: '#FF8C00', dark: '#CC7000' },
    teal: { lighter: '#B3E5FC', light: '#4FC3F7', main: '#0288D1', dark: '#01579B' }
};

const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    return deliveryDate.toISOString().split('T')[0];
};

export function PlaceOrder({ sx, ...other }) {
    const { t } = useTranslate();
    const router = useRouter();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.product?.cartItems || []);
    
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        shippingAddress: '',
        notes: '',
        products: '',
        amount: cartTotal.toString(),
        deliveryDate: getDeliveryDate(),
    });

    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const productsList = cartItems
            .map(item => `${item.title || item.name} (Qty: ${item.quantity})`)
            .join(', ');

        setFormData(prev => ({
            ...prev,
            products: productsList,
            amount: cartTotal.toString(),
        }));
    }, [cartItems, cartTotal]);

    // Localized Validations
    const validateContactNumber = (value) => {
        if (!value) return t('order.errors.contact_req');
        if (!value.startsWith('5')) return t('order.errors.contact_start');
        if (value.length !== 9) return t('order.errors.contact_len');
        if (!/^\d+$/.test(value)) return t('order.errors.contact_digits');
        return '';
    };

    const validateEmail = (value) => {
        if (!value) return t('order.errors.email_req');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('order.errors.email');
        return '';
    };

    const handleChange = (field) => (event) => {
        const { value } = event.target;
        if (field === 'contactNumber') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 9);
            setFormData(prev => ({ ...prev, [field]: digitsOnly }));
            setErrors(prev => ({ ...prev, contactNumber: validateContactNumber(digitsOnly) }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
            if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = t('order.errors.name');
        const emailErr = validateEmail(formData.email);
        if (emailErr) newErrors.email = emailErr;
        const contactErr = validateContactNumber(formData.contactNumber);
        if (contactErr) newErrors.contactNumber = contactErr;
        if (!formData.shippingAddress.trim()) newErrors.shippingAddress = t('order.errors.address');

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const orderData = {
                fullName: formData.name,
                email: formData.email,
                contactNumber: formData.contactNumber,
                shippingAddress: formData.shippingAddress,
                notes: formData.notes,
                transactionAmount: parseFloat(formData.amount),
                orderDeliveryDate: formData.deliveryDate,
                products: cartItems.map(item => ({ id: item.id, quantity: item.quantity }))
            };

            const result = await placeOrder(orderData);
            window.open(result.data.transactionUrl, '_blank');
            setSubmitSuccess(true);

            setTimeout(() => {
                setSubmitSuccess(false);
                dispatch(clearCart());
                router.push('/');
            }, 3000);
        }
    };

    const renderLines = (
        <>
            <Stack spacing={8} alignItems="center" sx={{ top: 64, left: 80, position: 'absolute', transform: 'translateX(-15px)' }}>
                <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12, color: BRAND_COLORS.orange.light }} />
                <FloatTriangleDownIcon sx={{ width: 30, height: 15, opacity: 0.24, position: 'static', color: BRAND_COLORS.teal.light }} />
            </Stack>
            <FloatLine vertical sx={{ top: 0, left: 80, bgcolor: BRAND_COLORS.orange.lighter }} />
        </>
    );

    const renderHeader = (
        <SectionTitle
            caption={t('order.caption')}
            title={t('order.title')}
            txtGradient={t('order.title_gradient')}
            sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
        />
    );

    const renderOrderSummary = cartItems.length > 0 && (
        <Card component={m.div} variants={varFade({ distance: 24 }).inUp} sx={{ maxWidth: 800, mx: 'auto', mb: 4, p: 3, border: `2px solid ${BRAND_COLORS.teal.lighter}`, boxShadow: `0 8px 24px ${BRAND_COLORS.teal.lighter}` }}>
            <Typography variant="h5" sx={{ mb: 3, color: BRAND_COLORS.navy }}>{t('order.summary_title')}</Typography>
            <Stack spacing={2}>
                {cartItems.map((item) => (
                    <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, bgcolor: BRAND_COLORS.orange.lighter, borderRadius: 2 }}>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: BRAND_COLORS.navy }}>{item.title || item.name}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {t('order.quantity')}: {item.quantity} × {t('order.currency')} {item.price.toLocaleString()}
                            </Typography>
                        </Stack>
                        <Typography variant="h6" sx={{ color: BRAND_COLORS.primary, fontWeight: 'bold' }}>
                            {t('order.currency')} {(item.price * item.quantity).toLocaleString()}
                        </Typography>
                    </Stack>
                ))}
                <Divider sx={{ my: 2, borderColor: BRAND_COLORS.teal.main }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" sx={{ color: BRAND_COLORS.navy, fontWeight: 'bold' }}>{t('order.total_amount')}:</Typography>
                    <Typography variant="h4" sx={{ color: BRAND_COLORS.primary, fontWeight: 'bold' }}>
                        {t('order.currency')} {cartTotal.toLocaleString()}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );

    const renderEmptyCart = cartItems.length === 0 && (
        <Card component={m.div} variants={varFade({ distance: 24 }).inUp} sx={{ maxWidth: 800, mx: 'auto', mb: 4, p: 5, textAlign: 'center', border: `2px solid ${BRAND_COLORS.teal.lighter}` }}>
            <Iconify icon="eva:shopping-cart-outline" sx={{ width: 80, height: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" sx={{ color: BRAND_COLORS.navy, mb: 1 }}>{t('order.empty_cart')}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>{t('order.empty_desc')}</Typography>
            <Button variant="contained" onClick={() => router.push('/')} sx={{ bgcolor: BRAND_COLORS.primary, '&:hover': { bgcolor: BRAND_COLORS.orange.dark } }}>
                {t('order.continue_shopping')}
            </Button>
        </Card>
    );

    const renderForm = cartItems.length > 0 && (
        <Box component={m.div} variants={varFade({ distance: 24 }).inUp} sx={{ maxWidth: 800, mx: 'auto', p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: 'background.paper', boxShadow: `0 8px 24px ${BRAND_COLORS.teal.lighter}`, border: `2px solid ${BRAND_COLORS.orange.lighter}` }}>
            {submitSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {t('order.success_msg')} {formData.deliveryDate}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField label={t('order.full_name')} value={formData.name} onChange={handleChange('name')} error={!!errors.name} helperText={errors.name} fullWidth required
                        InputProps={{ startAdornment: <Iconify icon="eva:person-fill" sx={{ mr: 1, color: BRAND_COLORS.primary }} /> }}
                    />

                    <TextField label={t('order.email')} type="email" value={formData.email} onChange={handleChange('email')} error={!!errors.email} helperText={errors.email} fullWidth required
                        InputProps={{ startAdornment: <Iconify icon="eva:email-fill" sx={{ mr: 1, color: BRAND_COLORS.primary }} /> }}
                    />

                    <TextField label={t('order.contact')} value={formData.contactNumber} onChange={handleChange('contactNumber')} error={!!errors.contactNumber} helperText={errors.contactNumber || t('order.contact_helper')} fullWidth required placeholder="5XXXXXXXX"
                        InputProps={{ startAdornment: <Iconify icon="eva:phone-fill" sx={{ mr: 1, color: BRAND_COLORS.primary }} /> }}
                    />

                    <TextField label={t('order.address')} value={formData.shippingAddress} onChange={handleChange('shippingAddress')} error={!!errors.shippingAddress} helperText={errors.shippingAddress} fullWidth required multiline rows={3}
                        InputProps={{ startAdornment: <Iconify icon="eva:pin-fill" sx={{ mr: 1, color: BRAND_COLORS.primary, alignSelf: 'flex-start', mt: 1.5 }} /> }}
                    />

                    <TextField label={t('order.delivery_date')} type="date" value={formData.deliveryDate} fullWidth disabled helperText={t('order.delivery_helper')}
                        InputProps={{ startAdornment: <Iconify icon="eva:calendar-fill" sx={{ mr: 1, color: BRAND_COLORS.teal.main }} />, shrink: true }}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField label={t('order.notes')} value={formData.notes} onChange={handleChange('notes')} fullWidth multiline rows={3} placeholder={t('order.notes_placeholder')}
                        InputProps={{ startAdornment: <Iconify icon="eva:file-text-fill" sx={{ mr: 1, color: BRAND_COLORS.primary, alignSelf: 'flex-start', mt: 1.5 }} /> }}
                    />

                    <Button type="submit" variant="contained" size="large" fullWidth startIcon={<Iconify icon="eva:checkmark-circle-fill" />}
                        sx={{ bgcolor: BRAND_COLORS.primary, color: 'white', py: 1.5, fontSize: '1.1rem', '&:hover': { bgcolor: BRAND_COLORS.orange.dark } }}
                    >
                        {t('order.place_btn')}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );

    return (
        <Stack component="section" sx={{ py: 10, position: 'relative', ...sx }} {...other}>
            <MotionViewport>
                {renderLines}
                <Container>
                    {renderHeader}
                    {renderOrderSummary}
                    {renderEmptyCart}
                    {renderForm}
                </Container>
            </MotionViewport>
        </Stack>
    );
}
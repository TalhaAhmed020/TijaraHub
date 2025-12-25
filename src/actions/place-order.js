

import { api, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export async function placeOrder(data) {
    const url = endpoints.placeOrder.order;

    const body = {
        fullName: data.fullName,
        email: data.email,
        contactNumber: data.contactNumber,
        shippingAddress: data.shippingAddress,
        notes: data.notes,
        transactionAmount: data.transactionAmount,
        orderDeliveryDate: data.orderDeliveryDate,
        products: data.products.map(product => ({
            id: String(product.id),
            quantity: product.quantity
        })),
    };

    const config = {
        method: 'POST',
        data: body,
         headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'base64:mfjcG1NMo9FOM2bINcIhmwsUktk9QSfkWsPe7J6jSgU=',
        },
    };

    try {
        const res = await api({ url, ...config });
        return res;
    } catch (error) {
        console.error('Failed:', error);
        throw error;
    }
}
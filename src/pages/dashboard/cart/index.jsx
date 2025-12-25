import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetProduct } from 'src/actions/product';

import { AddToCart } from 'src/sections/home/add-to-cart';

// ----------------------------------------------------------------------

const metadata = { title: `Cart details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    const { id = '' } = useParams();

    const { product, productLoading, productError } = useGetProduct(id);

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <AddToCart />
        </>
    );
}

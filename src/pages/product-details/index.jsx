import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useGetProducts } from 'src/actions/product';

import { ProductDetailsByCategories } from 'src/sections/home/product-details';

// ----------------------------------------------------------------------

const metadata = { title: `Product shop - ${CONFIG.site.name}` };

export default function Page() {
    const { products, productsLoading } = useGetProducts();

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ProductDetailsByCategories products={products} loading={productsLoading} />
        </>
    );
}

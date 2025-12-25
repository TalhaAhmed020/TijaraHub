import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ThankYou } from 'src/sections/thank-you/thank-you-view';

// ----------------------------------------------------------------------

const metadata = { title: `Thank You - ${CONFIG.site.name}` };

export default function Page() {

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ThankYou />
        </>
    );
}

import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CancelView } from 'src/sections/cancel/cancel-view';

// ----------------------------------------------------------------------

const metadata = { title: `Cancel - ${CONFIG.site.name}` };

export default function Page() {

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <CancelView />
        </>
    );
}

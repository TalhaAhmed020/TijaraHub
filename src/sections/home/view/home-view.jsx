import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { ProductCategories } from '../home-minimal';
import { HomeTestimonials } from '../home-testimonials';
import { ContactUsSection } from '../home-advertisement';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <ProductCategories />

        {/* <HomeHugePackElements /> */}

        {/* <HomeForDesigner /> */}

        {/* <HomeHighlightFeatures /> */}

        {/* <HomeIntegrations /> */}

        {/* <HomePricing /> */}

        <HomeTestimonials />

        {/* <HomeFAQs /> */}

        {/* <HomeZoneUI /> */}

        <ContactUsSection />
      </Stack>
    </>
  );
}
// ----------------------------------------------------------------------
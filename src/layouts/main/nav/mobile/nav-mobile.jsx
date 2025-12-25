import { useEffect } from 'react';

import { usePathname } from 'src/routes/hooks';



// ----------------------------------------------------------------------

export function NavMobile({ data, open, onClose, slots, sx }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  );
}

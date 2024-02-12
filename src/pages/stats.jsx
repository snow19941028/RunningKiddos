import { Helmet } from 'react-helmet-async';

import  { StatsView }  from 'src/sections/stats/view';

// ----------------------------------------------------------------------

export default function QRCodePage() {
  return (
    <>
      <Helmet>
        <title> QRCode | Minimal UI </title>
      </Helmet>

      <StatsView />
    </>
  );
}

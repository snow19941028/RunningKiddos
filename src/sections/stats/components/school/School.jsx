import * as React from 'react';

import Average from './Average';
import Progress from './Progress';
import Participation from './Participation';

export function School() {

  return (
    <>
      <Progress />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '50%', height: '300px',marginLeft: '-45px', border: '1px solid #333333'}}>
          <Participation />
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '50%', height: '300px', marginLeft: '2.5%',border: '1px solid #333333' }}>
          <Average />
        </div>
      </div>
    </>
  );
}

import * as React from 'react';

import Average from './Average';
import Progress from './Progress';
import Participation from './Participation';

export function Class() {

  return (
    <>
      <Progress />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '50%', height: '300px', marginLeft: '-45px' }}>
          <Participation />
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', width: '50%', height: '300px', marginLeft: '2.5%' }}>
          <Average />
        </div>
      </div>
    </>
  );
}

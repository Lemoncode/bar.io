import { CenteredLayout } from 'layouts';
import { QrCodeContainer } from 'pods/qrcode';
import React from 'react';

export const QrCodeScene: React.FunctionComponent = () => {
    return(
        <>
        <CenteredLayout>
          <QrCodeContainer url={process.env.QR_URL}/>
        </CenteredLayout>
      </>        
    );
}
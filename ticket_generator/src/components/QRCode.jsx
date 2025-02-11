import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';  // Use QRCodeCanvas instead of QRCode

const QRCode = ({ value }) => {
  return (
    <div className="flex flex-col justify-center">
      <QRCodeCanvas 
        value={value} 
        size={150} 
        bgColor="#ffffff" 
        fgColor="#000000" 
        className="rounded-xl shadow-md"
      />
      {/* <h3 className="text-md font-bold mb-2">Scan the QR Code</h3> */}
    </div>
  );
};

export default QRCode;

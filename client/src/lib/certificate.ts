'use client';

import download from 'downloadjs';
import moment from 'moment';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import { toast } from 'react-toastify';

interface Data {
  courseName: string;
  studentName: string;
  issueDate: string;
  certNo: string;
  ident: string;
}

/**
 * This function will make changes in the PDF in public folder and download it
 * @param {Object} certificate, {number, name, issueDate, course}
 */
export async function printAndDownload(certificate: Data) {
  try {
    const existingPdfBytes = await fetch('/assets/certificate.pdf').then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const [firstPage] = pdfDoc.getPages();

    // Embed Times New Roman font
    const standardFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const standardFontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const color = rgb(0, 0.1, 0.4);
    // const color = (0, 0, 0.5);

    // Student Name
    firstPage.drawText(certificate.studentName, {
      x: 35,
      y: 445,
      size: 30,
      font: standardFontBold,
      color: color,
    });

    const issueDate = moment(certificate.issueDate, 'DD/MM/YYYY').format('DD MMMM YYYY') || certificate.issueDate;

    // issue date
    firstPage.drawText(issueDate, {
      x: 35,
      y: 360,
      size: 22,
      font: standardFont,
      color: color,
    });

    // certificate number
    firstPage.drawText(certificate.certNo, {
      x: 155,
      y: 135,
      size: 10,
      font: standardFont,
      color: color,
    });

    // create redirectable link
    const link = encodeURIComponent(`/verification-request/?ident=${certificate.ident}&type=scan-from-qr`);
    // Generate QR Code
    const qrCodeValue = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/services/redirect?link=${link}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeValue);
    const qrCodeImageBytes = await fetch(qrCodeImage).then((res) => res.arrayBuffer());

    // Embed QR Code Image
    const qrCodeImageObj = await pdfDoc.embedPng(qrCodeImageBytes);
    const qrCodeDims = qrCodeImageObj.scale(0.5);
    firstPage.drawImage(qrCodeImageObj, {
      x: 400,
      y: 100,
      width: qrCodeDims.width,
      height: qrCodeDims.height,
    });

    const modifiedPdfBytes = await pdfDoc.save();

    download(modifiedPdfBytes, `NEBOSH certificate ${certificate.studentName}.pdf`, 'application/pdf');
  } catch (e) {
    console.log(e);
    toast.error('something went wrong');
  }
}

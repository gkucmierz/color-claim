
import { jsPDF } from 'jspdf';
import convert from 'color-convert';

export const generate = (colorName, color, btcAddr) => {
  const doc = new jsPDF();
  const [r, g, b] = convert.hex.rgb(color);

  doc.setTextColor(0, 0, 0);
  doc.setFont('Helvetica');

  doc.setFontSize(30);
  doc.text('Color Ownership', 105, 35, { align: 'center' });
  doc.setFontSize(20);
  doc.text('Certificate', 105, 47, { align: 'center' });

  // ramka
  doc.setDrawColor(0);
  doc.setLineDash([2, 1], 0);
  doc.setLineWidth(0.1);
  doc.rect(10, 10, 190, 277, 'D');

  doc.setFillColor(255, 255, 255);
  doc.rect(90, 5, 30, 10, 'F');
  doc.setFontSize(10);
  doc.text('ColorClaim.org', 105, 11, { align: 'center' });

  doc.setLineDash();

  // Get the dimensions of the page
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Define the size of the square and the radius of the corners
  const squareSize = 60;
  const cornerRadius = 5; 

  // Calculate the starting x and y coordinates to center the square
  const startX = (pageWidth - squareSize) / 2;
  const startY = (pageHeight - squareSize) / 4;

  // Set the fill color to blue

  doc.setFillColor(r, g, b); // RGB values for blue

  // Draw a rounded rectangle and fill it with the set color
  doc.roundedRect(startX, startY, squareSize, squareSize, cornerRadius, cornerRadius, 'F');

  doc.setDrawColor(0, 0, 0); // RGB values for black
  doc.setLineWidth(0.28); // Approximate conversion of 1px to points, since 1pt = 1/72 inches
  doc.roundedRect(startX, startY, squareSize, squareSize, cornerRadius, cornerRadius);

  doc.setFontSize(10);
  doc.text('Color Name', 30, 135, { align: 'left' });
  doc.line(30, 150, 180, 150);

  doc.text('RGB', 30, 165, { align: 'left' });
  doc.line(30, 180, 90, 180);

  doc.text('HEX', 120, 165, { align: 'left' });
  doc.line(120, 180, 180, 180);

  doc.text('Owners address', 30, 195, { align: 'left' });
  doc.line(30, 210, 180, 210);

  // Define the size of the square and the radius of the corners
  doc.roundedRect(30, 230, 40, 40, 3, 3, 'S');

  doc.text('date', 80, 275, { align: 'left' });
  doc.line(80, 270, 110, 270);

  doc.text('signature', 120, 275, { align: 'left' });
  doc.line(120, 270, 180, 270);

  doc.save(`Color Certificate - ${colorName}.pdf`);
};

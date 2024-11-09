import jsPDF from 'jspdf';
import React from 'react';
import 'jspdf-autotable';
import './InvoiceComponent.css'
const InvoiceComponent = ({bookingData}) => {
    const tot=bookingData.carId.basePrice+bookingData.estimatedPrice
    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
        const padding = 15;

        const logo = '/assets/images/car_logo.png';
        const logoWidth = 40;
        const logoHeight = 40;
        const centerLogo = (doc.internal.pageSize.width / 2) - (logoWidth / 2);
        doc.addImage(logo, 'PNG', centerLogo, padding, logoWidth, logoHeight);

        
        const tagline = "The Automotive Design and Drive.";
        const taglineWidth = doc.getTextWidth(tagline);
        const centerTagline = (doc.internal.pageSize.width / 2) - (taglineWidth / 2);
        doc.text(tagline, centerTagline, padding + logoHeight + 10);

        doc.setFontSize(12);
        const userName = localStorage.getItem("name") || 'N/A';
        const lastName = localStorage.getItem("last_name") || 'N/A';
        const userEmail = localStorage.getItem("email") || 'N/A';
        const userAddress = localStorage.getItem("zip") || 'N/A';
        const phone = localStorage.getItem("phone") || 'N/A';
        const orderId=bookingData._id.slice(-10)
        const userText = `Name: ${userName} ${lastName}\nEmail: ${userEmail}\nRegistered Phone: ${phone}\nOrder ID: ${"#"+orderId}`;
        
        doc.text(userText, padding, padding + logoHeight + 20);
        
        const customization = bookingData.customization;
        console.log("customizartion",customization)
        const carData = [
            ['Exterior Color', customization.exteriorColor.value || 'No Color Selected', `₹${customization.exteriorColor.price || 0}`],
            ['Interior Color', customization.interiorColor.value || 'Black', `₹${customization.interiorColor.price || 0}`],
            ['Wheel Color', customization.wheelColor.value || 'Black', `₹${customization.wheelColor.price || 0}`],
            ['Glass', customization.glass.value || 'Tinted', `₹${customization.glass.price || 0}`],
            
        ];
        
        doc.autoTable({
            startY: padding + logoHeight + 60,
            head: [['Configuration', 'Value', 'Price']],
            body: carData,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 4,
                halign: 'middle',
                valign: 'middle'
            },
            headStyles: {
                fillColor: [0,0,0],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            margin: { top: 10 },
            showHead: 'firstPage',
            columnStyles: {
                0: { cellWidth: 60 },
                1: { cellWidth: 70 },
                2: { cellWidth: 30 }
            }
        });

       
        const totalPrice = '₹ '+ bookingData.estimatedPrice || 0;
        const totalPriceTextB = `Total Price Before Configuration: ${totalPrice}`;
        
        doc.setFontSize(12);
        doc.text(totalPriceTextB, padding, doc.previousAutoTable.finalY + 20);
        
        
        const totalPriceTextA = `Total Price After Configuration: ₹${tot}`;
        doc.setFontSize(12);
        doc.text(totalPriceTextA, padding, doc.previousAutoTable.finalY + 50);

        doc.save(`Auto 3D_invoice_${localStorage.getItem("name") || 'user'}.pdf`);
    };

    return (
        <div className='invoice-container'>
            <button onClick={handleDownloadInvoice}>Download Invoice</button>
        </div>
    );
};

export default InvoiceComponent;

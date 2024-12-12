import React from 'react';
import { jsPDF } from 'jspdf';
import { Chart } from 'chart.js';

const HealthAssessmentReport = () => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Set Background Color
    doc.setFillColor(245, 242, 236); // Light beige background
    doc.rect(0, 0, 210, 297, 'F'); // Full A4 page (210mm x 297mm)

    // Add Header Section
    doc.setFillColor(230, 230, 255); // Light purple background
    doc.roundedRect(10, 10, 190, 30, 5, 5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(33, 33, 33); // Dark gray
    doc.text('Health Assessment Report', 105, 25, { align: 'center' });

    // Add Sample Placeholder for Logo
    doc.setDrawColor(0, 0, 0); // Black border
    doc.rect(160, 12, 30, 25); // X, Y, Width, Height
    doc.setFontSize(10);
    doc.text('Logo', 175, 27, { align: 'center' });

    // Add Congratulations Section
    const userName = 'David'; // Replace with dynamic user name if applicable
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Congratulations, ${userName}! 🎉`, 10, 50);

    const descriptionText = `
      You've successfully completed the first level of your health assessment. Below, you’ll find detailed insights 
      into your current health metrics, along with tailored suggestions and action points to help you achieve your wellness goals.

      Take some time to go through the report carefully and start implementing the recommendations to see positive changes 
      in your health journey. Remember, small consistent efforts lead to significant results over time.

      Your next steps to a healthier, happier you start here! 💪
    `;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(descriptionText, 10, 60, { maxWidth: 190 });

    // Generate the Bar Graph and Pie Chart, and wait for them to complete
    await Promise.all([createBarGraph(doc), createPieChart(doc)]);

    // Footer Section
    const footerText = `
      123 Anywhere St., Any City, ST 12345
      www.dyadichealth.com
      +123 - 456 - 7890
    `;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.text(footerText, 105, 280, { align: 'center' });

    // Save the PDF after everything is ready
    doc.save('Health_Assessment_Report.pdf');
  };

  const createBarGraph = (doc) => {
    return new Promise((resolve) => {
      // Create canvas for Bar Graph
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Reduces Error Rates', 'Increases Machinery Efficiency', 'Increases Production Output', 'Reduces Energy Consumption'],
          datasets: [
            {
              label: 'Metrics Performance',
              data: [40, 15, 30, 20],
              backgroundColor: '#7A92A3',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          animation: {
            onComplete: function () {
              const imgData = canvas.toDataURL('image/png');
              doc.addImage(imgData, 'PNG', 10, 120, 190, 60);
              resolve();
            },
          },
        },
      });
    });
  };

  const createPieChart = (doc) => {
    return new Promise((resolve) => {
      // Create canvas for Pie Chart
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');

      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Reduces Error Rates', 'Increases Machinery Efficiency', 'Increases Production Output', 'Reduces Energy Consumption'],
          datasets: [
            {
              label: 'Metric Distribution',
              data: [40, 15, 30, 20],
              backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
            },
          ],
        },
        options: {
          animation: {
            onComplete: function () {
              const imgData = canvas.toDataURL('image/png');
              doc.addImage(imgData, 'PNG', 10, 180, 100, 100);
              resolve();
            },
          },
        },
      });
    });
  };

  return (
    <div>
      {/* Button triggers the PDF generation and download */}
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default HealthAssessmentReport;

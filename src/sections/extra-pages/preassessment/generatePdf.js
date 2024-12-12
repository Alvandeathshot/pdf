import jsPDF from 'jspdf';

export function generatePdf(bmiData, breathingData, postureData, dietData, workoutData, recoveryData, userDetails) {
  const doc = new jsPDF();

  // Add user details to the PDF
  doc.setFontSize(16);
  doc.text(`Full Name: ${userDetails.fullName}`, 10, 10);
  doc.text(`Email: ${userDetails.email}`, 10, 20);
  doc.text(`Phone Number: ${userDetails.phonenumber}`, 10, 30);

  // Add BMI data
  doc.text('BMI Data:', 10, 40);
  doc.text(`Height: ${bmiData.height} cm`, 10, 50);
  doc.text(`Weight: ${bmiData.weight} kg`, 10, 60);
  doc.text(`BMI: ${bmiData.bmi}`, 10, 70);

  // Add Breathing Data
  doc.text('Breathing Data:', 10, 80);
  doc.text(`Breath Hold Time: ${breathingData.breathHoldTime} seconds`, 10, 90);
  doc.text(`Breaths Per Minute: ${breathingData.breathsPerMinute}`, 10, 100);

  // Add Posture Data
  doc.text('Posture Data:', 10, 110);
  doc.text(`Selected Posture: ${postureData.selectedPosture}`, 10, 120);
  doc.text(`Report: ${postureData.report}`, 10, 130);

  // Add Diet Data
  doc.text('Diet Data:', 10, 140);
  doc.text(`Veggies: ${dietData.veggies}`, 10, 150);
  doc.text(`Protein: ${dietData.protein}`, 10, 160);
  doc.text(`Grains: ${dietData.grains}`, 10, 170);
  doc.text(`Nuts & Seeds: ${dietData.nutsSeeds}`, 10, 180);
  doc.text(`Dairy: ${dietData.dairy}`, 10, 190);
  doc.text(`Fruits: ${dietData.fruits}`, 10, 200);

  // Add Workout Data
  doc.text('Workout Data:', 10, 210);
  doc.text(`Cardio: ${workoutData.cardio}`, 10, 220);
  doc.text(`Stretching: ${workoutData.stretching}`, 10, 230);
  doc.text(`Resistance: ${workoutData.resistance}`, 10, 240);

  // Add Recovery Data
  doc.text('Recovery Data:', 10, 250);
  doc.text(`Sleep Time: ${recoveryData.sleepTime}`, 10, 260);
  doc.text(`Wake Time: ${recoveryData.wakeTime}`, 10, 270);
  doc.text(`Workout Recovery: ${recoveryData.workoutRecovery}`, 10, 280);
  doc.text(`Relaxation: ${recoveryData.relaxation}`, 10, 290);

  // Output the generated PDF as a blob
  const pdfBlob = doc.output('blob');
  return pdfBlob;
}

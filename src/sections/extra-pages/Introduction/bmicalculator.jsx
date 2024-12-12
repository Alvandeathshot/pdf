import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const BreathingExercise = ({ markComplete, bmiData, setBmiData }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiMessage, setBmiMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to calculate BMI
  const calculateBmi = async () => {
    if (!height || !weight) {
      setError('Please provide both height and weight.');
      return;
    }
  
    try {
      const response = await fetch('https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ height, weight }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Update BMI data in parent state
        setBmiData((prevData) => ({
          ...prevData,
          height,
          weight,
          bmi: data.bmi,
        }));
        setBmi(data.bmi);
        setBmiMessage(`Your BMI is ${data.bmi}. BMI calculation applies only for those above 20 years. It is a general metric and may not apply to specific situations such as bone density or higher muscle mass.`
        );
        markComplete(); // Notify parent that the section is complete
      } else {
        setError(data.error || 'An error occurred while calculating BMI.');
      }
    } catch (error) {
      console.error('Error fetching BMI:', error);
      setError('An error occurred while contacting the server.');
    }
  };

  // Trigger BMI calculation automatically when height and weight are filled
  useEffect(() => {
    if (height && weight) {
      calculateBmi(height, weight);
    }
  }, [height, weight]); // Runs whenever height or weight changes

  return (
    <HelmetProvider>
      <Helmet>
        <meta
          name="description"
          content="Use this tool to calculate your Body Mass Index (BMI) based on your height and weight. BMI is a general indicator of health and wellness."
        />
        <meta
          name="keywords"
          content="BMI calculator, Body Mass Index, health assessment, weight management, height, weight, breathing exercises"
        />
      </Helmet>

      <div style={styles.container}>
        <div style={styles.section}>
          <p>This section is designed to gather key information about your current health metrics. Start by entering your details to calculate your Body Mass Index (BMI), a foundational measure of your overall health.</p>
          <br/><p>Let’s take the first step towards better wellness together!</p>
          <h3 style={styles.subtitle}>Body Mass Index (BMI)</h3>
          <label style={styles.label}>Height (cm):</label>
          <input
            type="string"
            placeholder="Height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={styles.input}
          />
          <br />
          <label style={styles.label}>Weight (kg):</label>
          <input
            type="string"
            placeholder="Weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={styles.input}
          />
          {loading && <p style={styles.resultText}>Calculating...</p>}
          {error && <p style={styles.errorText}>{error}</p>}
          {bmi && <p style={styles.resultText}>{bmiMessage}</p>}
        </div>
      </div>
    </HelmetProvider>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '10px',
    width: '45vw',
    margin: '0 auto',
    backgroundColor: '#e6f7ff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      width: '100%', // More flexible for smaller screens
    },
  },
  section: {
    backgroundColor: '#e6f7ff',
    marginBottom: '20px',
    width: '100%',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#555',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  resultText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: '10px',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default BreathingExercise;

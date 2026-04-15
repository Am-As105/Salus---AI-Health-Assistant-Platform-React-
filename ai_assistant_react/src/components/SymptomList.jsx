import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SymptomList = () => {
  const [symptoms, setSymptoms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSymptoms = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/api/symptoms', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data.data || response.data;
        setSymptoms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setSymptoms([]);
      }
    };
    fetchSymptoms();
  }, []);

  const getSeverityStyles = (severity) => {
    const map = {
      'severe': { color: '#ef4444', label: 'HIGH' },
      'moderate': { color: '#f59e0b', label: 'MEDIUM' },
      'mild': { color: '#2dd4bf', label: 'LOW' }
    };
    return map[severity?.toLowerCase()] || { color: '#2dd4bf', label: 'LOW' };
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Symptoms</h1>
          <p style={styles.subtitle}>Track your well-being with AI-guided monitoring and expert oversight.</p>
        </div>

        <button 
          style={styles.addButton} 
          onClick={() => navigate('/add-symptom')}
        >
          <span style={{ fontSize: '24px' }}>+</span> Log New Symptom
        </button>

        <div style={styles.list}>
          {symptoms.length > 0 ? (
            symptoms.map((s) => {
              const style = getSeverityStyles(s.severity);
              return (
                <div key={s.id} style={styles.card}>
                  <div style={{ ...styles.severityBar, backgroundColor: style.color }}></div>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.symptomName}>{s.name}</h3>
                    <span style={{ ...styles.badge, color: style.color, borderColor: style.color, backgroundColor: `${style.color}10` }}>
                      {style.label}
                    </span>
                  </div>
                  <div style={styles.dateTime}>
                    <span>📅 {s.date_recorded || new Date(s.created_at).toLocaleDateString()}</span>
                  </div>
                  <p style={styles.description}>{s.description}</p>
                </div>
              );
            })
          ) : (
            <div style={styles.emptyState}>Aucun symptôme trouvé.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#fcfcfc', minHeight: '100vh', padding: '48px 16px', fontFamily: 'sans-serif' },
  container: { maxWidth: '768px', margin: '0 auto' },
  header: { marginBottom: '32px', textAlign: 'left' },
  title: { fontSize: '36px', fontWeight: '600', color: '#0d4d4d', marginBottom: '8px' },
  subtitle: { fontSize: '18px', color: '#6b7280' },
  addButton: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0d4d4d', color: '#fff', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '500', marginBottom: '48px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  list: { display: 'flex', flexDirection: 'column', gap: '24px' },
  card: { position: 'relative', backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden', textAlign: 'left' },
  severityBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  symptomName: { fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 },
  badge: { fontSize: '10px', fontWeight: '700', padding: '4px 12px', borderRadius: '999px', border: '1px solid' },
  dateTime: { color: '#9ca3af', fontSize: '14px', marginBottom: '16px' },
  description: { color: '#4b5563', lineHeight: '1.6', margin: 0 },
  emptyState: { textAlign: 'center', padding: '40px', color: '#9ca3af', border: '2px dashed #f3f4f6', borderRadius: '16px' }
};

export default SymptomList;
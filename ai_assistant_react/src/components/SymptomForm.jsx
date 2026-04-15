import React, { useState } from 'react';
import axios from 'axios';

const SymptomForm = () => {
    const [symptom, setSymptom] = useState({
        name: '',
        severity: 'mild',
        description: '',
        date_recorded: new Date().toISOString().split('T')[0], 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            await axios.post('http://localhost:8000/api/symptoms', symptom, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            alert('Symptôme enregistré avec succès !');
            setSymptom({
                name: '',
                severity: 'mild',
                description: '',
                date_recorded: new Date().toISOString().split('T')[0],
            });
        } catch (error) {
            console.error(error.response?.data);
            alert('Erreur : ' + JSON.stringify(error.response?.data?.errors || 'Server Error'));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Log New Symptom</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.group}>
                        <label style={styles.label}>Symptom Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Maux de tête" 
                            value={symptom.name}
                            onChange={(e) => setSymptom({...symptom, name: e.target.value})}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Severity Level</label>
                        <select 
                            value={symptom.severity}
                            onChange={(e) => setSymptom({...symptom, severity: e.target.value})}
                            style={styles.input}
                        >
                            <option value="mild">Mild (Léger)</option>
                            <option value="moderate">Moderate (Modéré)</option>
                            <option value="severe">Severe (Grave)</option>
                        </select>
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Date</label>
                        <input 
                            type="date" 
                            value={symptom.date_recorded}
                            onChange={(e) => setSymptom({...symptom, date_recorded: e.target.value})}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Description</label>
                        <textarea 
                            placeholder="Description détaillée..." 
                            value={symptom.description}
                            onChange={(e) => setSymptom({...symptom, description: e.target.value})}
                            style={styles.textarea}
                        />
                    </div>

                    <button type="submit" style={styles.button}>Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px 20px', display: 'flex', justifyContent: 'center' },
    card: { background: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid #f3f4f6', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', maxWidth: '500px', width: '100%' },
    title: { color: '#0d4d4d', fontSize: '24px', fontWeight: '600', marginBottom: '24px', textAlign: 'left' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    group: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '14px', fontWeight: '500', color: '#6b7280', textAlign: 'left' },
    input: { background: '#f9fafb', border: '1px solid #e5e7eb', color: '#1f2937', padding: '12px 16px', borderRadius: '12px', fontSize: '15px', outline: 'none' },
    textarea: { background: '#f9fafb', border: '1px solid #e5e7eb', color: '#1f2937', padding: '12px 16px', borderRadius: '12px', minHeight: '100px', fontSize: '15px', outline: 'none' },
    button: { background: '#0d4d4d', color: '#fff', fontWeight: '600', padding: '14px', borderRadius: '12px', cursor: 'pointer', border: 'none', marginTop: '10px' }
};

export default SymptomForm;
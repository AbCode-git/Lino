import { useState } from 'react';
import OptimizedImage from './OptimizedImage';

export default function AppointmentModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const services = [
    'Wedding Makeup',
    'Special Occasion',
    'Bridal Package',
    'Editorial Makeup'
  ];

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1 && !formData.service) {
      newErrors.service = 'Please select a service';
    }
    if (currentStep === 2 && !formData.date) {
      newErrors.date = 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Submit logic
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Book Appointment</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
            <h3>Select Service</h3>
            <div className="service-grid">
              {services.map((service) => (
                <label key={service} className="service-option">
                  <input
                    type="radio"
                    name="service"
                    value={service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  />
                  <div className="service-card">
                    <OptimizedImage src={`/images/${service.toLowerCase().replace(' ', '-')}.svg`} />
                    <span>{service}</span>
                  </div>
                </label>
              ))}
            </div>
            {errors.service && <p className="error-message">{errors.service}</p>}
          </div>

          {/* Add similar blocks for steps 2 and 3 */}
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </button>
            )}
            <button type="submit">
              {currentStep === 3 ? 'Confirm Booking' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
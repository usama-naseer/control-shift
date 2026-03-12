// SchedulerSection.jsx - Calendar and Quote section

import { motion } from 'framer-motion';
import { TIME_SLOTS } from '../data/mockData';
import './SchedulerSection.css';

const SchedulerSection = () => {
  return (
    <section className="scheduler-section">
      {/* Calendar Widget */}
      <div className="calendar-section">
        <div className="calendar-header">
          <h2 className="calendar-title">Schedule Concierge Call</h2>
          <span className="calendar-link">View full calendar</span>
        </div>
        
        <div className="calendar-widget">
          <div className="calendar-month-header">
            <h4 className="calendar-month-title">October 2023</h4>
            <div className="calendar-nav">
              <button className="calendar-nav-button">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="calendar-nav-button">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          
          <div className="calendar-weekdays">
            <span className="calendar-weekday">Sun</span>
            <span className="calendar-weekday">Mon</span>
            <span className="calendar-weekday">Tue</span>
            <span className="calendar-weekday">Wed</span>
            <span className="calendar-weekday">Thu</span>
            <span className="calendar-weekday">Fri</span>
            <span className="calendar-weekday">Sat</span>
          </div>
          
          <div className="calendar-days">
            {/* Previous month days */}
            <button className="calendar-day inactive">28</button>
            <button className="calendar-day inactive">29</button>
            <button className="calendar-day inactive">30</button>
            
            {/* Current month days */}
            <button className="calendar-day active">1</button>
            <button className="calendar-day active">2</button>
            <button className="calendar-day selected">3</button>
            <button className="calendar-day active">4</button>
            <button className="calendar-day active">5</button>
            <button className="calendar-day active">6</button>
            <button className="calendar-day active">7</button>
            <button className="calendar-day active">8</button>
            <button className="calendar-day available">9</button>
            <button className="calendar-day active">10</button>
            <button className="calendar-day active">11</button>
          </div>
          
          <div className="time-slots-section">
            <span className="time-slots-title">Available Times (Oct 3rd)</span>
            <div className="time-slots">
              {TIME_SLOTS.map((time, index) => (
                <button 
                  key={time}
                  className={`time-slot ${index === 1 ? 'selected' : ''}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quotation Summary Card */}
      <div className="quotation-section">
        <div className="quotation-card">
          <div className="quotation-header">
            <h3 className="quotation-title">Personalized Quotation</h3>
            <p className="quotation-id">Quote ID: #CS-9901-X</p>
          </div>
          
          <div className="quotation-content">
            <div className="quotation-items">
              <div className="quotation-item">
                <div className="quotation-item-info">
                  <span className="material-symbols-outlined quotation-item-icon">home</span>
                  <span className="quotation-item-label">Total Rooms</span>
                </div>
                <span className="quotation-item-value">4 Rooms</span>
              </div>
              
              <div className="quotation-item">
                <div className="quotation-item-info">
                  <span className="material-symbols-outlined quotation-item-icon">inventory_2</span>
                  <span className="quotation-item-label">Items Scanned</span>
                </div>
                <span className="quotation-item-value">42 Items</span>
              </div>
              
              <div className="quotation-item">
                <div className="quotation-item-info">
                  <span className="material-symbols-outlined quotation-item-icon">distance</span>
                  <span className="quotation-item-label">Distance</span>
                </div>
                <span className="quotation-item-value">12.5 Miles</span>
              </div>
              
              <div className="cost-summary">
                <div className="cost-summary-row">
                  <span className="cost-summary-label">Estimated Cost</span>
                  <div className="cost-summary-value">
                    <div className="cost-amount">$1,240.00</div>
                    <p className="cost-note">Includes Insurance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="lock-in-button">
              Lock-in This Price
            </button>
            
            <p className="price-guarantee">
              *Price guaranteed for 48 hours based on AI scan.
            </p>
          </div>
        </div>
        
        <div className="security-badge">
          <span className="material-symbols-outlined">shield</span>
          <span className="security-text">Secured by Smoove Protocol</span>
        </div>
      </div>
    </section>
  );
};

export default SchedulerSection;
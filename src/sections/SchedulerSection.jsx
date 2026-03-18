// SchedulerSection.jsx — Interactive Calendar & Quotation

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SchedulerSection.css';

// ── Cost calculation ──────────────────────────────────────────
// Base rate per room (covers labour + truck)
const RATE_PER_ROOM  = 120;   // $120 per room
// Per scanned item (packing complexity)
const RATE_PER_ITEM  = 8;     // $8 per item
// Per mile (fuel + driver)
const RATE_PER_MILE  = 3.5;   // $3.50 / mile
// Weekend surcharge (Sat/Sun)
const WEEKEND_FEE    = 75;
// Fixed distance (mock — no real geocoding)
const MOCK_DISTANCE  = 12.5;
// Insurance is always 8% of subtotal
const INSURANCE_RATE = 0.08;

function calculateCost({ totalRooms, scannedCount, distance, selectedDay, viewYear, viewMonth }) {
  const rooms = totalRooms  || 0;
  const items = scannedCount || 0;
  const miles = parseFloat(distance) || 0;

  const roomCost     = rooms * RATE_PER_ROOM;
  const itemCost     = items * RATE_PER_ITEM;
  const distanceCost = miles * RATE_PER_MILE;

  // Weekend surcharge
  let weekendFee = 0;
  if (selectedDay) {
    const dow = new Date(viewYear, viewMonth, selectedDay).getDay();
    if (dow === 0 || dow === 6) weekendFee = WEEKEND_FEE;
  }

  const subtotal  = roomCost + itemCost + distanceCost + weekendFee;
  const insurance = subtotal * INSURANCE_RATE;
  const total     = subtotal + insurance;

  return {
    roomCost,
    itemCost,
    distanceCost,
    weekendFee,
    insurance,
    total,
    isWeekend: weekendFee > 0,
  };
}

function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

const TIME_SLOTS = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

// Parse a time slot string into { hours, minutes } (24h)
function parseSlot(slot) {
  const [time, period] = slot.split(' ');
  let [h, m] = time.split(':').map(Number);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return { h, m };
}

// Returns true if a time slot is in the past for a given date
function isSlotPast(slot, day, month, year) {
  const now = new Date();
  const { h, m } = parseSlot(slot);
  const slotDate = new Date(year, month, day, h, m, 0);
  return slotDate <= now;
}

// Returns the first non-past time slot for today, or the first slot otherwise
function firstAvailableSlot(day, month, year) {
  return TIME_SLOTS.find(t => !isSlotPast(t, day, month, year)) ?? null;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells = [];
  // Trailing days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, current: false });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  // Leading days from next month to fill last row
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, current: false });
    }
  }
  return cells;
}

const SchedulerSection = ({ totalRooms, scannedCount, videoAnalysed, inventoryConfirmed }) => {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState(
    () => firstAvailableSlot(today.getDate(), today.getMonth(), today.getFullYear()) ?? TIME_SLOTS[0]
  );
  const [locked, setLocked] = useState(false);
  const [distance, setDistance]       = useState(String(MOCK_DISTANCE));
  const [editingDist, setEditingDist] = useState(false);
  const [distInput, setDistInput]     = useState(String(MOCK_DISTANCE));

  const selectDay = (day) => {
    setSelectedDay(day);
    // When picking a day, auto-select first available slot (handles today's past slots)
    const first = firstAvailableSlot(day, viewMonth, viewYear);
    setSelectedTime(first ?? TIME_SLOTS[0]);
    setLocked(false);
  };

  const cells = useMemo(() => buildCalendar(viewYear, viewMonth), [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
    setLocked(false);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
    setLocked(false);
  };

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const formattedDate = selectedDay
    ? `${MONTHS[viewMonth]} ${selectedDay}, ${viewYear}`
    : 'No date selected';

  const commitDistance = () => {
    const val = parseFloat(distInput);
    if (!isNaN(val) && val >= 0) { setDistance(String(val)); setLocked(false); }
    else setDistInput(distance); // revert bad input
    setEditingDist(false);
  };

  // Live cost — recalculates whenever any input changes
  const cost = useMemo(() => calculateCost({
    totalRooms, scannedCount, distance, selectedDay, viewYear, viewMonth
  }), [totalRooms, scannedCount, distance, selectedDay, viewYear, viewMonth]);

  return (
    <section className="scheduler-section">

      {/* ── Calendar ── */}
      <motion.div
        className="calendar-section"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="calendar-header">
          <div className="scheduler-section-badge">
            <span className="material-symbols-outlined">calendar_month</span>
            Schedule
          </div>
          <h2 className="calendar-title">Schedule Concierge Call</h2>
        </div>

        <div className="calendar-widget">
          {/* Month nav */}
          <div className="calendar-month-header">
            <h4 className="calendar-month-title">{MONTHS[viewMonth]} {viewYear}</h4>
            <div className="calendar-nav">
              <button className="calendar-nav-button" onClick={prevMonth} aria-label="Previous month">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="calendar-nav-button" onClick={nextMonth} aria-label="Next month">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="calendar-weekdays">
            {WEEKDAYS.map(d => <span key={d} className="calendar-weekday">{d}</span>)}
          </div>

          {/* Day grid */}
          <div className="calendar-days">
            {cells.map((cell, i) => {
              const past = cell.current && isPast(cell.day);
              const sel  = cell.current && selectedDay === cell.day;
              return (
                <button
                  key={i}
                  disabled={!cell.current || past}
                  onClick={() => cell.current && !past && selectDay(cell.day)}
                  className={[
                    'calendar-day',
                    !cell.current ? 'inactive' : '',
                    past          ? 'past'     : '',
                    sel           ? 'selected' : '',
                    cell.current && !past && !sel ? 'active' : ''
                  ].join(' ').trim()}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Time slots */}
          <div className="time-slots-section">
            <span className="time-slots-title">
              Available Times{selectedDay ? ` — ${MONTHS[viewMonth]} ${selectedDay}` : ''}
            </span>
            <div className="time-slots">
              {TIME_SLOTS.map(t => {
                const past = selectedDay
                  ? isSlotPast(t, selectedDay, viewMonth, viewYear)
                  : false;
                return (
                  <button
                    key={t}
                    disabled={past}
                    className={`time-slot ${selectedTime === t ? 'selected' : ''} ${past ? 'past' : ''}`}
                    onClick={() => { if (!past) { setSelectedTime(t); setLocked(false); } }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Quotation ── */}
      <motion.div
        className="quotation-section"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="quotation-card">

          {/* ── Header ── */}
          <div className="quotation-header">
            <div className="quotation-header-top">
              <div>
                <h3 className="quotation-title">Personalized Quote</h3>
                <p className="quotation-subtitle">AI-calculated based on your move profile</p>
              </div>
              <div className="quotation-id-chip">#CS-9901-X</div>
            </div>

            {/* Summary pills */}
            <div className="quotation-pills">
              <div className="q-pill">
                <span className="material-symbols-outlined">home</span>
                <span>{totalRooms > 0 ? `${totalRooms} Room${totalRooms !== 1 ? 's' : ''}` : 'No rooms'}</span>
              </div>
              <div className="q-pill">
                <span className="material-symbols-outlined">inventory_2</span>
                <span>{scannedCount > 0 ? `${scannedCount} Items` : 'No scan'}</span>
              </div>
              <div className="q-pill">
                <span className="material-symbols-outlined">distance</span>
                <span>{distance} mi</span>
              </div>
            </div>
          </div>

          <div className="quotation-content">

            {/* ── Scheduled date row ── */}
            <div className="q-date-row">
              <span className="material-symbols-outlined q-date-icon">event</span>
              <div className="q-date-text">
                <span className="q-date-label">Move Date</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={formattedDate + selectedTime}
                    className="q-date-value"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedDay ? `${formattedDate} · ${selectedTime}` : 'Not selected'}
                  </motion.span>
                </AnimatePresence>
              </div>
              {cost.isWeekend && (
                <span className="q-weekend-tag">Weekend</span>
              )}
            </div>

            {/* ── Cost breakdown bars ── */}
            <div className="cost-bars">
              {[
                { label: 'Labour & Truck', detail: `${totalRooms || 0} rooms × $${RATE_PER_ROOM}`, value: cost.roomCost, icon: 'local_shipping', color: '#0057FF' },
                { label: 'Packing Complexity', detail: `${scannedCount || 0} items × $${RATE_PER_ITEM}`, value: cost.itemCost, icon: 'inventory_2', color: '#6366f1' },
                { label: 'Distance', detail: null, value: cost.distanceCost, icon: 'route', color: '#0ea5e9', editable: true },
                ...(cost.isWeekend ? [{ label: 'Weekend Surcharge', detail: 'Sat/Sun rate', value: cost.weekendFee, icon: 'weekend', color: '#f59e0b' }] : []),
                { label: 'Insurance', detail: '8% of subtotal', value: cost.insurance, icon: 'shield', color: '#2DD4BF' },
              ].map((row) => {
                return (
                  <div className="cost-bar-row" key={row.label}>
                    <div className="cost-bar-left">
                      <span className="cost-bar-icon" style={{ color: row.color, background: `${row.color}18` }}>
                        <span className="material-symbols-outlined">{row.icon}</span>
                      </span>
                      <div className="cost-bar-info">
                        <span className="cost-bar-label">{row.label}</span>
                        {row.editable ? (
                          editingDist ? (
                            <div className="dist-edit-wrap">
                              <input
                                className="dist-edit-input"
                                type="number" min="0" step="0.1"
                                value={distInput} autoFocus
                                onChange={(e) => setDistInput(e.target.value)}
                                onBlur={commitDistance}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') commitDistance();
                                  if (e.key === 'Escape') { setDistInput(distance); setEditingDist(false); }
                                }}
                              />
                              <span className="dist-edit-unit">mi</span>
                            </div>
                          ) : (
                            <button className="dist-value-btn" onClick={() => { setDistInput(distance); setEditingDist(true); }}>
                              <span className="cost-bar-detail">{distance} mi × ${RATE_PER_MILE}</span>
                              <span className="material-symbols-outlined dist-edit-icon">edit</span>
                            </button>
                          )
                        ) : (
                          <span className="cost-bar-detail">{row.detail}</span>
                        )}
                      </div>
                    </div>
                    <motion.span
                      key={row.value}
                      className="cost-bar-amount"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {fmt(row.value)}
                    </motion.span>
                  </div>
                );
              })}
            </div>
            <div className="cost-total-block">
              <div className="cost-total-left">
                <span className="cost-total-label">Total Estimate</span>
                <span className="cost-total-note">Includes 8% insurance · 48h price lock</span>
              </div>
              <div className="cost-total-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cost.total.toFixed(0)}
                    className="cost-total-amount"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {fmt(cost.total)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Lock-in CTA ── */}
            <div className="lock-in-section">
              <button
                className={`lock-in-button ${locked ? 'locked' : ''} ${!inventoryConfirmed && !locked ? 'blocked' : ''}`}
                onClick={() => inventoryConfirmed && setLocked(true)}
                disabled={locked || !inventoryConfirmed || totalRooms === 0}
              >
                {locked ? (
                  <><span className="material-symbols-outlined">check_circle</span> Price Locked In</>
                ) : !inventoryConfirmed ? (
                  <><span className="material-symbols-outlined">lock</span> Confirm inventory to unlock</>
                ) : (
                  <><span className="material-symbols-outlined">lock_open</span> Lock-in This Price</>
                )}
              </button>

              {!locked && (totalRooms === 0 || !videoAnalysed || !inventoryConfirmed) && (
                <div className="lock-in-hint">
                  <span className="material-symbols-outlined">info</span>
                  {totalRooms === 0
                    ? 'Select your rooms in the section above first.'
                    : !videoAnalysed
                      ? 'Upload and analyse a video to enable price lock.'
                      : 'Confirm your detected items in the section above first.'
                  }
                </div>
              )}

              <div className="lock-in-trust">
                <div className="trust-item">
                  <span className="material-symbols-outlined">verified_user</span>
                  <span>No hidden fees</span>
                </div>
                <div className="trust-item">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>48h price lock</span>
                </div>
                <div className="trust-item">
                  <span className="material-symbols-outlined">cancel</span>
                  <span>Free cancellation</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="security-badge">
          <span className="material-symbols-outlined">shield</span>
          <span className="security-text">Secured by Smoove Protocol</span>
        </div>
      </motion.div>

    </section>
  );
};

export default SchedulerSection;

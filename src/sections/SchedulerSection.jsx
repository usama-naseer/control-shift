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
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
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
    if (!isNaN(val) && val >= 0) setDistance(String(val));
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
      <div className="calendar-section">
        <div className="calendar-header">
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
                    onClick={() => !past && setSelectedTime(t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quotation ── */}
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
                <motion.span
                  key={totalRooms}
                  className="quotation-item-value"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {totalRooms > 0 ? `${totalRooms} Room${totalRooms !== 1 ? 's' : ''}` : '—'}
                </motion.span>
              </div>

              <div className="quotation-item">
                <div className="quotation-item-info">
                  <span className="material-symbols-outlined quotation-item-icon">inventory_2</span>
                  <span className="quotation-item-label">Items Scanned</span>
                </div>
                <motion.span
                  key={scannedCount}
                  className="quotation-item-value"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {scannedCount > 0 ? `${scannedCount} Items` : '—'}
                </motion.span>
              </div>

              <div className="quotation-item">
                <div className="quotation-item-info">
                  <span className="material-symbols-outlined quotation-item-icon">calendar_today</span>
                  <span className="quotation-item-label">Scheduled</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={formattedDate + selectedTime}
                    className="quotation-item-value"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedDay ? `${formattedDate}, ${selectedTime}` : '—'}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="quotation-item">
                <div className="quotation-item-info">
                  <span className="material-symbols-outlined quotation-item-icon">distance</span>
                  <span className="quotation-item-label">Distance</span>
                </div>
                {editingDist ? (
                  <div className="dist-edit-wrap">
                    <input
                      className="dist-edit-input"
                      type="number"
                      min="0"
                      step="0.1"
                      value={distInput}
                      autoFocus
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
                    <span className="quotation-item-value">{distance} Miles</span>
                    <span className="material-symbols-outlined dist-edit-icon">edit</span>
                  </button>
                )}
              </div>

              <div className="cost-summary">
                {/* Cost breakdown */}
                <div className="cost-breakdown">
                  <div className="cost-line">
                    <span>Rooms ({totalRooms || 0} × ${RATE_PER_ROOM})</span>
                    <span>{fmt(cost.roomCost)}</span>
                  </div>
                  <div className="cost-line">
                    <span>Items ({scannedCount || 0} × ${RATE_PER_ITEM})</span>
                    <span>{fmt(cost.itemCost)}</span>
                  </div>
                  <div className="cost-line">
                    <span>Distance ({distance} mi × ${RATE_PER_MILE})</span>
                    <span>{fmt(cost.distanceCost)}</span>
                  </div>
                  {cost.isWeekend && (
                    <div className="cost-line weekend">
                      <span>Weekend surcharge</span>
                      <span>{fmt(cost.weekendFee)}</span>
                    </div>
                  )}
                  <div className="cost-line">
                    <span>Insurance (8%)</span>
                    <span>{fmt(cost.insurance)}</span>
                  </div>
                </div>

                <div className="cost-summary-row">
                  <span className="cost-summary-label">Estimated Cost</span>
                  <div className="cost-summary-value">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={cost.total.toFixed(0)}
                        className="cost-amount"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        {fmt(cost.total)}
                      </motion.div>
                    </AnimatePresence>
                    <p className="cost-note">Includes Insurance</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className={`lock-in-button ${locked ? 'locked' : ''} ${!inventoryConfirmed && !locked ? 'blocked' : ''}`}
              onClick={() => inventoryConfirmed && setLocked(true)}
              disabled={locked || !inventoryConfirmed || totalRooms === 0}
              title=""
            >
              {locked
                ? <><span className="material-symbols-outlined">check_circle</span> Price Locked In</>
                : !inventoryConfirmed
                  ? <><span className="material-symbols-outlined">lock</span> Confirm inventory to unlock</>
                  : 'Lock-in This Price'
              }
            </button>

            {!locked && (totalRooms === 0 || !videoAnalysed || !inventoryConfirmed) && (
              <p className="lock-in-hint">
                <span className="material-symbols-outlined">info</span>
                {totalRooms === 0
                  ? 'Select your rooms in the section above first.'
                  : !videoAnalysed
                    ? 'Upload and analyse a video to enable price lock.'
                    : 'Confirm your detected items in the section above first.'
                }
              </p>
            )}

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

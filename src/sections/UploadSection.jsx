// UploadSection.jsx - Phase III Smart Upload Logic

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './UploadSection.css';

const DETECTED_ITEMS = [
  { name: "Sofa",            confidence: 97 },
  { name: "Dining Table",    confidence: 94 },
  { name: "Refrigerator",    confidence: 91 },
  { name: "Bed Frame",       confidence: 89 },
  { name: "Wardrobe",        confidence: 88 },
  { name: "TV Stand",        confidence: 85 },
  { name: "Desk",            confidence: 83 },
  { name: "Washing Machine", confidence: 79 },
];

const STATE = { IDLE: 'idle', UPLOADING: 'uploading', PROCESSING: 'processing', RESULTS: 'results' };

const UploadSection = ({ onScanComplete, onInventoryConfirmed, onReset }) => {
  const [state, setState]             = useState(STATE.IDLE);
  const [progress, setProgress]       = useState(0);
  const [fileName, setFileName]       = useState('');
  const [error, setError]             = useState('');
  const [visibleItems, setVisibleItems] = useState([]);

  // Editable item list — each item has { id, name, confidence }
  const [items, setItems]         = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  // Add-item row
  const [addingItem, setAddingItem] = useState(false);
  const [addValue, setAddValue]     = useState('');
  const nextIdRef = useRef(100); // ids for manually added items start at 100

  const fileInputRef = useRef(null);
  const intervalRef  = useRef(null);

  // ── Upload simulation ──────────────────────────────────────
  const startUpload = useCallback((file) => {
    setError('');
    setFileName(file.name);
    setProgress(0);
    setConfirmed(false);
    setState(STATE.UPLOADING);

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(intervalRef.current);
        setState(STATE.PROCESSING);
        setTimeout(() => {
          // Seed editable items with unique ids
          const seeded = DETECTED_ITEMS.map((item, i) => ({ ...item, id: i }));
          setItems(seeded);
          setVisibleItems([]);
          setState(STATE.RESULTS);
          onScanComplete?.(seeded.length);
          seeded.forEach((_, i) => {
            setTimeout(() => setVisibleItems(prev => [...prev, i]), i * 150);
          });
        }, 2000);
      }
    }, 20);
  }, [onScanComplete]);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) { setError('Please upload a video file.'); return; }
    startUpload(file);
  }, [startUpload]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const onDragOver  = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
  const onDragLeave = (e) => { e.currentTarget.classList.remove('drag-over'); };

  // ── Edit actions ───────────────────────────────────────────
  const startEdit = (item) => {
    if (confirmed) return;
    setEditingId(item.id);
    setEditValue(item.name);
  };

  const commitEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      setItems(prev => prev.map(it => it.id === editingId ? { ...it, name: trimmed } : it));
    }
    setEditingId(null);
  };

  const deleteItem = (id) => {
    if (confirmed) return;
    const next = items.filter(it => it.id !== id);
    setItems(next);
    setVisibleItems(prev => prev.filter(i => next.some(it => it.id === i)));
    onScanComplete?.(next.length);
  };

  const confirmList = () => {
    setConfirmed(true);
    setEditingId(null);
    setAddingItem(false);
    onScanComplete?.(items.length);
    onInventoryConfirmed?.();
  };

  // ── Add item ───────────────────────────────────────────────
  const commitAdd = () => {
    const trimmed = addValue.trim();
    if (trimmed) {
      const newItem = { id: nextIdRef.current++, name: trimmed, confidence: null };
      const next = [...items, newItem];
      setItems(next);
      setVisibleItems(prev => [...prev, newItem.id]);
      onScanComplete?.(next.length);
    }
    setAddValue('');
    setAddingItem(false);
  };

  // ── Reset ──────────────────────────────────────────────────
  const reset = () => {
    clearInterval(intervalRef.current);
    setState(STATE.IDLE);
    setProgress(0);
    setFileName('');
    setError('');
    setVisibleItems([]);
    setItems([]);
    setEditingId(null);
    setConfirmed(false);
    setAddingItem(false);
    setAddValue('');
    onScanComplete?.(0);
    onReset?.();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="upload-section">
      <motion.div
        className="upload-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="upload-section-badge">
          <span className="material-symbols-outlined">smart_toy</span>
          AI Inventory
        </div>
        <h2 className="upload-title">Smart Video Inventory</h2>
        <p className="upload-description">
          Skip the manual entry. Record a quick walk-through of your home and our AI will automatically catalog every item and furniture piece.
        </p>
      </motion.div>

      <div className="upload-content">
        {/* Left — state machine panel */}
        <div className="upload-panel">
          <AnimatePresence mode="wait">

            {/* IDLE */}
            {state === STATE.IDLE && (
              <motion.div key="idle" className="upload-zone"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
                onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
              >
                <div className="upload-icon">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <h3 className="upload-zone-title">Drag your video here</h3>
                <p className="upload-zone-hint">MP4, MOV accepted</p>
                {error && <p className="upload-error">{error}</p>}
                <button className="browse-button" onClick={() => fileInputRef.current?.click()}>
                  Browse Files
                </button>
                <input ref={fileInputRef} type="file" accept="video/*" className="hidden-input"
                  onChange={(e) => handleFile(e.target.files[0])} />
              </motion.div>
            )}

            {/* UPLOADING */}
            {state === STATE.UPLOADING && (
              <motion.div key="uploading" className="upload-zone uploading"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              >
                <div className="upload-icon uploading-icon">
                  <span className="material-symbols-outlined">upload_file</span>
                </div>
                <p className="upload-filename">{fileName}</p>
                <div className="upload-progress-wrap">
                  <div className="upload-progress-bar">
                    <div className="upload-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="upload-progress-pct">{progress}%</span>
                </div>
                <p className="upload-status-text">Uploading...</p>
              </motion.div>
            )}

            {/* PROCESSING */}
            {state === STATE.PROCESSING && (
              <motion.div key="processing" className="upload-zone processing"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              >
                <div className="spinner" />
                <p className="processing-text">AI is analysing your space...</p>
              </motion.div>
            )}

            {/* RESULTS */}
            {state === STATE.RESULTS && (
              <motion.div key="results" className="upload-zone results"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              >
                <div className="results-header">
                  <span className="material-symbols-outlined results-icon">inventory_2</span>
                  <h3 className="results-title">
                    {confirmed ? `${items.length} Items Confirmed` : 'Review Detected Items'}
                  </h3>
                  <p className="results-subtitle">
                    {confirmed
                      ? 'Your inventory is locked in.'
                      : 'Tap a name to rename · × to remove'}
                  </p>
                </div>

                {/* Scrollable badge grid — caps at ~4 rows then scrolls */}
                <div className="results-grid-wrap">
                  <div className="results-grid">
                    <AnimatePresence>
                      {items.map((item) => (
                        visibleItems.includes(item.id) && (
                          <motion.div
                            key={item.id}
                            className={`result-badge${confirmed ? ' confirmed' : ''}${item.confidence === null ? ' manual' : ''}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            layout
                          >
                            {editingId === item.id ? (
                              <input
                                className="badge-edit-input"
                                value={editValue}
                                autoFocus
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={commitEdit}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') commitEdit();
                                  if (e.key === 'Escape') setEditingId(null);
                                }}
                              />
                            ) : (
                              <span
                                className="badge-name"
                                onClick={() => startEdit(item)}
                                title={confirmed ? '' : 'Click to rename'}
                              >
                                {item.name}
                              </span>
                            )}

                            <div className="badge-actions">
                              {item.confidence !== null
                                ? <span className="badge-confidence">{item.confidence}%</span>
                                : <span className="badge-manual">added</span>
                              }
                              {!confirmed && (
                                <button
                                  className="badge-delete"
                                  onClick={() => deleteItem(item.id)}
                                  aria-label={`Remove ${item.name}`}
                                >×</button>
                              )}
                            </div>
                          </motion.div>
                        )
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Add item row — only when not confirmed */}
                  {!confirmed && (
                    <div className="add-item-row">
                      {addingItem ? (
                        <div className="add-item-input-wrap">
                          <input
                            className="add-item-input"
                            placeholder="Item name..."
                            value={addValue}
                            autoFocus
                            onChange={(e) => setAddValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') commitAdd();
                              if (e.key === 'Escape') { setAddingItem(false); setAddValue(''); }
                            }}
                          />
                          <button className="add-item-confirm" onClick={commitAdd}>Add</button>
                          <button className="add-item-cancel" onClick={() => { setAddingItem(false); setAddValue(''); }}>
                            ×
                          </button>
                        </div>
                      ) : (
                        <button className="add-item-btn" onClick={() => setAddingItem(true)}>
                          <span className="material-symbols-outlined">add</span>
                          Add missed item
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Item count pill */}
                <div className="results-count">
                  {items.length} item{items.length !== 1 ? 's' : ''} total
                </div>

                {/* Action row */}
                <div className="results-actions">
                  {!confirmed ? (
                    <button className="confirm-button" onClick={confirmList}>
                      <span className="material-symbols-outlined">check_circle</span>
                      Confirm List ({items.length} items)
                    </button>
                  ) : (
                    <div className="confirmed-badge">
                      <span className="material-symbols-outlined">verified</span>
                      Inventory confirmed
                    </div>
                  )}
                  <button className="reset-button" onClick={reset}>
                    <span className="material-symbols-outlined">refresh</span>
                    Upload another
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right — info panel with stagger */}
        <motion.div
          className="upload-info-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
        >
          {[
            { num: '1', title: 'Record a walkthrough', body: 'Walk through each room slowly for 15–20 seconds per room.' },
            { num: '2', title: 'AI scans your items',  body: 'Our model detects furniture, appliances, and fragile items automatically.' },
            { num: '3', title: 'Confirm or edit the list', body: 'Rename or remove any item before your move is scheduled.' },
          ].map((step) => (
            <motion.div
              key={step.num}
              className="info-step"
              variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <div className="info-step-num">{step.num}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;

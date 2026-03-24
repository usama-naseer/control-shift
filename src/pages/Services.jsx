import { motion } from 'framer-motion';
import './Page.css';

const services = [
  {
    icon: 'local_shipping',
    title: 'Full-Service Move',
    desc: 'We handle everything — packing, loading, transport, unloading, and unpacking. You just show up at your new place.',
    features: ['Professional packing crew', 'Furniture disassembly & reassembly', 'Fragile item wrapping', 'Same-day delivery'],
    color: '#0057FF',
    tag: 'Most Popular',
  },
  {
    icon: 'inventory_2',
    title: 'AI Inventory Scan',
    desc: 'Record a walkthrough video and let our AI build your complete inventory list. No manual counting, no forgotten items.',
    features: ['Instant item detection', 'Editable results', 'Confidence scoring', 'Export to PDF'],
    color: '#6366f1',
    tag: null,
  },
  {
    icon: 'warehouse',
    title: 'Storage Solutions',
    desc: 'Need a few days between moves? We offer secure, climate-controlled storage with flexible durations.',
    features: ['Climate controlled', 'CCTV monitored 24/7', 'Flexible duration', 'Easy access'],
    color: '#0ea5e9',
    tag: null,
  },
  {
    icon: 'package_2',
    title: 'Packing Only',
    desc: 'Our crew comes to you, packs everything professionally, and leaves it ready for moving day.',
    features: ['Premium packing materials', 'Room-by-room labelling', 'Fragile item care', 'Same-day available'],
    color: '#2DD4BF',
    tag: null,
  },
  {
    icon: 'directions_car',
    title: 'Vehicle Transport',
    desc: 'Moving your car too? We coordinate enclosed or open transport for any vehicle type.',
    features: ['Door-to-door delivery', 'Enclosed & open options', 'Real-time tracking', 'Insured transport'],
    color: '#f59e0b',
    tag: null,
  },
  {
    icon: 'support_agent',
    title: 'Move Concierge',
    desc: 'A dedicated coordinator manages your entire move — from first quote to final box unpacked.',
    features: ['Single point of contact', 'Timeline management', 'Vendor coordination', 'Post-move support'],
    color: '#ec4899',
    tag: 'Premium',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Services() {
  return (
    <div className="page-wrapper">
      <div className="page-container">

        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="page-badge">
            <span className="material-symbols-outlined">local_shipping</span>
            Services
          </span>
          <h1 className="page-title">Everything your move <span className="page-title-accent">needs.</span></h1>
          <p className="page-subtitle">From a single room to a full estate — we have a service that fits.</p>
        </motion.div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="service-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              {s.tag && <span className="service-tag" style={{ color: s.color, background: `${s.color}18`, borderColor: `${s.color}30` }}>{s.tag}</span>}
              <div className="service-icon" style={{ color: s.color, background: `${s.color}18` }}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-features">
                {s.features.map(f => (
                  <li key={f}>
                    <span className="material-symbols-outlined" style={{ color: s.color }}>check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import './Page.css';

const steps = [
  {
    num: '01',
    icon: 'home',
    title: 'Select Your Rooms',
    desc: 'Tell us how many bedrooms, bathrooms, and home offices you have. Our AI instantly calculates the right truck size and crew for your move.',
    color: '#0057FF',
  },
  {
    num: '02',
    icon: 'videocam',
    title: 'Record Your Inventory',
    desc: 'Walk through your home with your phone. Our AI vision model scans the footage and builds a complete inventory list in seconds — no manual entry needed.',
    color: '#6366f1',
  },
  {
    num: '03',
    icon: 'fact_check',
    title: 'Confirm & Edit',
    desc: 'Review the detected items, rename or delete anything the AI got wrong, and add anything it missed. You stay in full control.',
    color: '#0ea5e9',
  },
  {
    num: '04',
    icon: 'calendar_month',
    title: 'Schedule & Get a Quote',
    desc: 'Pick your move date and time. Your personalised quote is calculated live based on rooms, items, distance, and date — no hidden fees.',
    color: '#2DD4BF',
  },
  {
    num: '05',
    icon: 'lock',
    title: 'Lock In Your Price',
    desc: 'Happy with the quote? Lock it in. Your price is guaranteed for 48 hours. A dedicated move coordinator will reach out to confirm the details.',
    color: '#f59e0b',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

export default function HowItWorks() {
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
            <span className="material-symbols-outlined">info</span>
            How It Works
          </span>
          <h1 className="page-title">Moving made <span className="page-title-accent">simple.</span></h1>
          <p className="page-subtitle">Five steps from chaos to keys-in-hand. No spreadsheets, no surprises.</p>
        </motion.div>

        <div className="steps-list">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="step-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              <div className="step-num-col">
                <span className="step-big-num">{step.num}</span>
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
              <div className="step-body">
                <div className="step-icon" style={{ color: step.color, background: `${step.color}18` }}>
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <div className="step-text">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

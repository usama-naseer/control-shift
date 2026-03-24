import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Page.css';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 199, annual: 169 },
    desc: 'Perfect for studio or 1-bedroom moves within the city.',
    color: '#0ea5e9',
    features: [
      'Up to 2 rooms',
      'AI inventory scan',
      'Same-day quote',
      '2 movers',
      'Up to 20 miles',
      'Basic insurance',
    ],
    highlight: false,
  },
  {
    name: 'Standard',
    price: { monthly: 399, annual: 339 },
    desc: 'Our most popular plan for 2–3 bedroom homes.',
    color: '#0057FF',
    features: [
      'Up to 5 rooms',
      'AI inventory scan',
      'Same-day quote',
      '3 movers',
      'Up to 50 miles',
      'Full insurance',
      'Packing materials included',
      'Move concierge',
    ],
    highlight: true,
  },
  {
    name: 'Premium',
    price: { monthly: 699, annual: 589 },
    desc: 'Full-service for large homes or long-distance moves.',
    color: '#6366f1',
    features: [
      'Unlimited rooms',
      'AI inventory scan',
      'Priority scheduling',
      '5+ movers',
      'Unlimited distance',
      'Premium insurance',
      'Full packing & unpacking',
      'Dedicated concierge',
      'Vehicle transport add-on',
      '48h price guarantee',
    ],
    highlight: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const navigate = useNavigate();

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
            <span className="material-symbols-outlined">payments</span>
            Pricing
          </span>
          <h1 className="page-title">Transparent pricing, <span className="page-title-accent">no surprises.</span></h1>
          <p className="page-subtitle">All plans include AI inventory scanning and a live quote. No hidden fees.</p>

          <div className="pricing-toggle">
            <span className={!annual ? 'toggle-active' : ''}>Monthly</span>
            <button
              className={`toggle-switch ${annual ? 'on' : ''}`}
              onClick={() => setAnnual(a => !a)}
              aria-label="Toggle annual billing"
            >
              <span className="toggle-knob" />
            </button>
            <span className={annual ? 'toggle-active' : ''}>
              Annual
              <span className="toggle-save">Save 15%</span>
            </span>
          </div>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`pricing-card ${plan.highlight ? 'pricing-card-highlight' : ''}`}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              {plan.highlight && <div className="pricing-popular-badge">Most Popular</div>}
              <div className="pricing-card-header">
                <h3 className="pricing-plan-name" style={{ color: plan.color }}>{plan.name}</h3>
                <p className="pricing-plan-desc">{plan.desc}</p>
                <div className="pricing-price">
                  <span className="pricing-currency">$</span>
                  <span className="pricing-amount">{annual ? plan.price.annual : plan.price.monthly}</span>
                  <span className="pricing-period">/move</span>
                </div>
              </div>
              <ul className="pricing-features">
                {plan.features.map(f => (
                  <li key={f}>
                    <span className="material-symbols-outlined" style={{ color: plan.color }}>check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="pricing-cta"
                style={plan.highlight
                  ? { background: plan.color, color: 'white', borderColor: plan.color }
                  : { borderColor: plan.color, color: plan.color }
                }
                onClick={() => navigate('/')}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="pricing-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          All prices are estimates. Final quote is generated by our AI based on your actual inventory and distance.
        </motion.p>

      </div>
    </div>
  );
}

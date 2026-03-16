// SectionWrapper.jsx - Reusable section container with consistent spacing

const SectionWrapper = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SectionWrapper;
// SectionWrapper.jsx - Reusable section container with consistent spacing

const SectionWrapper = ({ 
  children, 
  className = '', 
  maxWidth = 'max-w-7xl',
  padding = 'px-8 lg:px-10',
  spacing = 'py-12 lg:py-20'
}) => {
  return (
    <section className={`mx-auto ${maxWidth} ${padding} ${spacing} ${className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
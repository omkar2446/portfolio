interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => {
  return (
    <div className={`text-center mb-12 ${className || ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-100 max-w-2xl mx-auto drop-shadow-md">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-white/60 to-white/80 rounded-full shadow-lg" />
    </div>
  );
};

export default SectionTitle;

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${className || ''}`}>
      <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-lg text-foreground/60 max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="mt-6 w-20 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
    </div>
  );
};

export default SectionTitle;

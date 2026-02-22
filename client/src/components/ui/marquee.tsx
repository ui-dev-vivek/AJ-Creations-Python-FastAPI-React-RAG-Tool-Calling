export const Marquee = ({
  items,
  speed = 30,
}: {
  items: string[];
  speed?: number;
}) => {
  return (
    <div className="relative flex overflow-x-hidden bg-primary py-8 group">
      <div
        className="marquee-content whitespace-nowrap flex"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center">
          {items.map((item, i) => (
            <span
              key={i}
              className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mx-8 flex items-center gap-6"
            >
              {item}
              <span className="w-3 h-3 bg-secondary rounded-full" />
            </span>
          ))}
        </div>
        <div className="flex items-center">
          {items.map((item, i) => (
            <span
              key={i + items.length}
              className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mx-8 flex items-center gap-6"
            >
              {item}
              <span className="w-3 h-3 bg-secondary rounded-full" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

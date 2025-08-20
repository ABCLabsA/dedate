interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string;
  height?: string;
  lines?: number;
}

const Skeleton = ({ 
  className = "", 
  variant = "text", 
  width = "100%", 
  height = "1rem",
  lines = 1 
}: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded";

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${className}`}
            style={{ 
              width: index === lines - 1 ? `${Math.random() * 40 + 60}%` : width,
              height 
            }}
          />
        ))}
      </div>
    );
  }

  const shapeClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg"
  };

  return (
    <div
      className={`${baseClasses} ${shapeClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};

// 项目卡片骨架屏
export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-4">
      {/* 头部 */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <Skeleton variant="circular" width="3rem" height="3rem" />
          <div className="flex-1 space-y-2">
            <Skeleton width="70%" height="1.25rem" />
            <Skeleton width="40%" height="0.875rem" />
          </div>
        </div>
        <Skeleton width="4rem" height="2rem" />
      </div>

      {/* 描述 */}
      <div className="space-y-2">
        <Skeleton width="100%" height="0.875rem" />
        <Skeleton width="90%" height="0.875rem" />
        <Skeleton width="60%" height="0.875rem" />
      </div>

      {/* 标签 */}
      <div className="flex flex-wrap gap-2">
        <Skeleton width="4rem" height="1.5rem" />
        <Skeleton width="5rem" height="1.5rem" />
        <Skeleton width="3.5rem" height="1.5rem" />
      </div>

      {/* 底部 */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-zinc-100 dark:border-zinc-800">
        <Skeleton width="6rem" height="0.75rem" />
        <Skeleton width="3rem" height="0.75rem" />
      </div>
    </div>
  );
};

// 项目列表骨架屏
export const ProjectListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-12 mb-8 px-4 md:px-8 lg:px-16">
      {Array.from({ length: 9 }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default Skeleton; 
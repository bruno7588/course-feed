import React from 'react';
import { cn } from '../../lib/utils';

/**
 * AssessmentCard component displays an assessment or situational test
 *
 * @param {Object} props
 * @param {string} props.title - Assessment title
 * @param {string} props.type - Assessment type (e.g., "Situational test", "Multiple choice")
 * @param {string} props.className - Additional CSS classes
 */
export const AssessmentCard = ({
  title,
  type = 'Situational test',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-neutral-700 rounded-sm flex items-center gap-m p-m',
        'hover:bg-neutral-600 transition-colors cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Icon/Illustration */}
      <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src="https://www.figma.com/api/mcp/asset/37ba6b55-1154-4045-a3c2-48ac79c2d8d7"
          alt="Assessment"
          className="w-16 h-16"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-xs overflow-hidden">
        <h4 className="font-bold text-base text-neutral-25 truncate leading-6">
          {title}
        </h4>
        <p className="text-sm text-neutral-200">
          {type}
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowLeft } from 'iconsax-react';
import { cn } from '../../lib/utils';

/**
 * GlobalHeader - Persistent header with course name, progress, and sidebar toggle
 *
 * @param {Object} props
 * @param {string} props.courseTitle - Course title
 * @param {number} props.progress - Course progress percentage (0-100)
 * @param {Function} props.onBack - Callback for back button
 * @param {Function} props.onToggleSidebar - Callback for sidebar toggle
 * @param {boolean} props.showSidebarToggle - Whether to show sidebar toggle button
 * @param {string} props.className - Additional CSS classes
 */
export const GlobalHeader = ({
  courseTitle = 'Cybersecurity Essentials for Employees (UK)',
  progress = 0,
  onBack,
  onToggleSidebar,
  showSidebarToggle = true,
  className,
  ...props
}) => {
  return (
    <header
      className={cn(
        'bg-neutral-800 border-b border-neutral-600',
        'flex items-center gap-m px-8 py-5 sticky top-0 z-50',
        className
      )}
      {...props}
    >
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="p-1 hover:bg-neutral-700 rounded transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} color="#F9F9FA" />
        </button>
      )}

      {/* Course Title */}
      <h1 className="flex-1 font-bold text-base text-neutral-25 truncate">
        {courseTitle}
      </h1>

      {/* Progress Indicator */}
      <div className="flex items-center gap-xs">
        <p className="text-xs text-neutral-200">Course Progress</p>
        <div className="relative w-10 h-10">
          {/* Track */}
          <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#383D4C"
              strokeWidth="3"
            />
            {/* Progress */}
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#FFBB38"
              strokeWidth="3"
              strokeDasharray={`${(progress / 100) * 100.53} 100.53`}
              strokeLinecap="round"
            />
          </svg>
          {/* Percentage */}
          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-200">
            {progress}%
          </span>
        </div>
      </div>
    </header>
  );
};

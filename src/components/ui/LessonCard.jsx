import React from 'react';
import { PlayCircle, Lock } from 'iconsax-react';
import { cn } from '../../lib/utils';

/**
 * LessonCard component displays a single lesson with thumbnail, title, and metadata
 *
 * @param {Object} props
 * @param {string} props.thumbnail - URL to lesson thumbnail image
 * @param {string} props.title - Lesson title
 * @param {string} props.instructor - Instructor name
 * @param {string} props.duration - Lesson duration (e.g., "3m 45s")
 * @param {boolean} props.isLocked - Whether the lesson is locked
 * @param {string} props.className - Additional CSS classes
 */
export const LessonCard = ({
  thumbnail,
  title,
  instructor,
  duration,
  isLocked = false,
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
      {/* Thumbnail */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-s overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover mix-blend-luminosity"
        />
        {/* Play icon overlay */}
        <div className="absolute top-0 left-0 bg-neutral-600 rounded-br-s p-1">
          <PlayCircle size={16} color="#F9F9FA" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-xs overflow-hidden">
        <h4 className="font-bold text-base text-neutral-400 line-clamp-2 leading-6">
          {title}
        </h4>
        <p className="text-sm text-neutral-400">
          {instructor} · {duration}
        </p>
      </div>

      {/* Lock icon */}
      {isLocked && (
        <div className="flex-shrink-0">
          <Lock size={24} color="#656B7C" variant="Bold" />
        </div>
      )}
    </div>
  );
};

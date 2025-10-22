import React from 'react';
import { PlayCircle, Clock, ArchiveAdd, Share, Diamonds, Medal, InfoCircle } from 'iconsax-react';
import { cn } from '../../lib/utils';

/**
 * CourseHeader component displays the course title, metadata, badges, and progress
 *
 * @param {Object} props
 * @param {string} props.title - Course title
 * @param {number} props.lessonCount - Number of lessons
 * @param {string} props.duration - Course duration
 * @param {number} props.jewels - Number of jewels to earn
 * @param {boolean} props.hasCertificate - Whether course offers certificate
 * @param {number} props.passScore - Pass score percentage
 * @param {number} props.progress - Current progress percentage (0-100)
 * @param {string} props.className - Additional CSS classes
 */
export const CourseHeader = ({
  title,
  lessonCount = 17,
  duration = '20 min',
  jewels = 100,
  hasCertificate = true,
  passScore = 80,
  progress = 0,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-neutral-800 rounded-m p-8 flex flex-col gap-ml',
        className
      )}
      {...props}
    >
      {/* Top row: Metadata and Actions */}
      <div className="flex items-center justify-between w-full">
        {/* Info */}
        <div className="flex items-center gap-m">
          {/* Lessons */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <PlayCircle size={16} color="#BFC2CC" />
            </div>
            <p className="text-sm text-neutral-200">{lessonCount} lessons</p>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <Clock size={16} color="#BFC2CC" />
            </div>
            <p className="text-sm text-neutral-200">{duration}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-xs">
          <button className="p-1 hover:bg-neutral-700 rounded transition-colors">
            <div className="w-5 h-5 flex items-center justify-center">
              <ArchiveAdd size={20} color="#BFC2CC" />
            </div>
          </button>
          <button className="p-1 hover:bg-neutral-700 rounded transition-colors">
            <div className="w-6 h-6 flex items-center justify-center">
              <Share size={24} color="#BFC2CC" />
            </div>
          </button>
        </div>
      </div>

      {/* Title and Badges */}
      <div className="flex flex-col gap-m w-full">
        <h1 className="font-bold text-2xl text-neutral-25 leading-9">
          {title}
        </h1>

        {/* Badges */}
        <div className="flex items-center gap-3 w-full flex-wrap">
          {/* Jewels Badge */}
          <div className="flex items-center gap-1 rounded-xxl">
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <Diamonds size={20} color="#9EA4B3" variant="Bold" />
            </div>
            <p className="text-sm text-neutral-300">Earn {jewels} jewels</p>
          </div>

          {/* Certificate Badge */}
          {hasCertificate && (
            <div className="flex items-center gap-1 rounded-xxl">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <Medal size={16} color="#9EA4B3" />
              </div>
              <p className="text-sm text-neutral-300">Certificate of completion</p>
            </div>
          )}

          {/* Pass Score Badge */}
          <div className="flex items-center gap-1 rounded-xxl">
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <InfoCircle size={20} color="#9EA4B3" />
            </div>
            <p className="text-sm text-neutral-300">Pass score: {passScore}%</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-xs w-full">
        <div className="flex-1 h-2 bg-neutral-600 rounded-l relative overflow-hidden">
          {progress > 0 && (
            <div
              className="absolute left-0 top-0 h-full bg-primary-500 rounded-l transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
        <p className="text-sm text-neutral-200 w-10 text-right">{progress}%</p>
      </div>
    </div>
  );
};

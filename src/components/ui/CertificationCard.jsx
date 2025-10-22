import React from 'react';
import { Award, Lock } from 'iconsax-react';
import { cn } from '../../lib/utils';

/**
 * CertificationCard component displays certification information
 *
 * @param {Object} props
 * @param {string} props.title - Certification title
 * @param {string} props.description - Certification description
 * @param {string} props.className - Additional CSS classes
 */
export const CertificationCard = ({
  title = 'Certificate of completion',
  description = 'Finish all lessons and complete the assessments to unlock your certification.',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-neutral-700 rounded-sm flex items-center gap-m p-m',
        'hover:bg-neutral-600 transition-colors',
        className
      )}
      {...props}
    >
      {/* Medal/Badge Icon */}
      <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center relative">
        <Award size={64} color="#FFBB38" variant="Bold" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-2">
        <h4 className="font-bold text-base text-neutral-25 leading-6">
          {title}
        </h4>
        <p className="text-sm text-neutral-200 leading-6">
          {description}
        </p>
      </div>

      {/* Lock icon */}
      <div className="flex-shrink-0">
        <Lock size={24} color="#656B7C" variant="Bold" />
      </div>
    </div>
  );
};

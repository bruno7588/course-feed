import React from 'react';
import { Calendar, Clock, Location, Lock } from 'iconsax-react';
import { cn } from '../../lib/utils';

/**
 * EventCard component displays an upcoming event with date, time, and location
 *
 * @param {Object} props
 * @param {string} props.title - Event title
 * @param {string} props.day - Day of the month (e.g., "30")
 * @param {string} props.month - Month abbreviation (e.g., "Aug")
 * @param {string} props.date - Full date string (e.g., "Monday, 13 November 2024, +2 dates")
 * @param {string} props.time - Event time (e.g., "10:00 - 11:00 GMT, +2 sessions")
 * @param {string} props.location - Event location (e.g., "Woly Office, Room 0A +2 locations")
 * @param {string} props.className - Additional CSS classes
 */
export const EventCard = ({
  title = 'Laws of Data Privacy',
  day = '30',
  month = 'Aug',
  date = 'Monday, 13 November 2024, +2 dates',
  time = '10:00 - 11:00 GMT, +2 sessions',
  location = 'Woly Office, Room 0A +2 locations',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-neutral-700 rounded-sm flex items-start gap-m p-m relative',
        'hover:bg-neutral-600 transition-colors cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Date */}
      <div className="w-20 h-20 flex-shrink-0 flex flex-col items-center justify-center bg-neutral-600 rounded-s">
        <div className="text-center">
          <div className="text-[32px] font-bold text-neutral-25 leading-tight">
            {day}
          </div>
          <div className="text-sm text-neutral-200 mt-1">
            {month}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col gap-2">
        <h4 className="font-bold text-base text-neutral-25 leading-6">
          {title}
        </h4>
        <div className="flex flex-col gap-2 text-sm text-neutral-200">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar size={20} color="#BFC2CC" />
            <span>{date}</span>
          </div>
          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock size={20} color="#BFC2CC" />
            <span>{time}</span>
          </div>
          {/* Location */}
          <div className="flex items-center gap-2">
            <Location size={20} color="#BFC2CC" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Lock icon */}
      <div className="flex-shrink-0 absolute top-6 right-4">
        <Lock size={24} color="#656B7C" variant="Bold" />
      </div>
    </div>
  );
};

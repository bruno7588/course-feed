import React, { useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * Tabs component for navigation between different course sections
 *
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects with { label, badge, value }
 * @param {string} props.activeTab - Currently active tab value
 * @param {Function} props.onTabChange - Callback when tab is changed
 * @param {string} props.className - Additional CSS classes
 */
export const Tabs = ({
  tabs = [
    { label: 'Course', value: 'course' },
    { label: 'Score', value: 'score' },
    { label: 'Overview', value: 'overview' },
    { label: 'Resources', value: 'resources', badge: 3 }
  ],
  activeTab = 'course',
  onTabChange,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('flex items-start gap-6', className)}
      {...props}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange?.(tab.value)}
          className={cn(
            'flex flex-col gap-1 items-center transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-800'
          )}
        >
          <div className="flex items-center gap-1 h-5">
            <span
              className={cn(
                'text-sm leading-6 text-center',
                activeTab === tab.value
                  ? 'font-bold text-neutral-25'
                  : 'font-medium text-neutral-200'
              )}
            >
              {tab.label}
            </span>
            {tab.badge && (
              <span className="bg-neutral-400/16 px-2 py-0.5 rounded-xxl text-sm text-neutral-200">
                {tab.badge}
              </span>
            )}
          </div>
          {activeTab === tab.value && (
            <div className="h-0.5 w-full bg-secondary-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

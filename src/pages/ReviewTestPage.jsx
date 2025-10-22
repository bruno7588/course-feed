import React, { useState } from 'react';
import { SidebarLeft, ArrowUp, ArrowDown } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { cn } from '../lib/utils';

/**
 * ReviewTestPage - Displays the review page with option to review situational test
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onReviewTest - Callback for reviewing the test
 * @param {Function} props.onNextLesson - Callback for navigating to next lesson
 */
export const ReviewTestPage = ({ onBack, onReviewTest, onNextLesson }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col">
      {/* Global Header */}
      <GlobalHeader
        courseTitle="Cybersecurity Essentials for Employees (UK)"
        progress={0}
        onBack={onBack}
        onToggleSidebar={toggleSidebar}
        showSidebarToggle={true}
      />

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Feed Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-[720px] mx-auto py-16">
            {/* Brief Card */}
            <div className="bg-neutral-700 rounded-m p-8 flex flex-col gap-6">
              {/* Section Header */}
              <div className="flex flex-col gap-xs w-full">
                <div className="flex items-center gap-2 w-full">
                  {/* Assessment Icon */}
                  <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://www.figma.com/api/mcp/asset/3b9efe6d-556a-45c8-bec5-5b1b5416e754"
                      alt="Brief"
                      className="w-8 h-8"
                    />
                  </div>
                  <h2 className="font-bold text-xl text-neutral-25">Brief</h2>
                </div>
                {/* Divider */}
                <div className="h-px w-full bg-neutral-600 rounded" />
              </div>

              {/* Body */}
              <div className="flex flex-col gap-2 w-full">
                <h3 className="font-bold text-xl text-neutral-25 leading-6">
                  Refining Feedback Techniques: Strength-Based and SBI Models
                </h3>
                <p className="text-base text-neutral-200 leading-6">
                  Master essential cyber skills to safeguard your workplace. Learn to spot phishing, secure devices, handle data under UK GDPR, and respond to incidents. Covers NCSC guidance, insider threats, password security, and building cyber-aware culture. This course equips employees to reduce risks and ensure compliance with UK regulations.
                </p>
              </div>

              {/* Button */}
              <button
                onClick={onReviewTest}
                className="bg-primary-500 hover:bg-primary-600 text-neutral-900 font-bold text-base px-6 py-3 rounded-s transition-colors self-start"
              >
                Review Situational Test
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Actions */}
        <div className="flex flex-col items-center gap-3 py-4 px-4">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center hover:bg-neutral-700 rounded-full transition-colors"
            aria-label="Toggle sidebar"
          >
            <SidebarLeft size={24} color="#BFC2CC" />
          </button>

          {/* Navigation Arrows */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {/* Previous Arrow */}
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600"
              aria-label="Previous"
            >
              <ArrowUp size={20} color="#BFC2CC" />
            </button>

            {/* Next Arrow with Tooltip */}
            <div className="relative">
              <button
                onClick={onNextLesson}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600"
                aria-label="Next lesson"
              >
                <ArrowDown size={20} color="#BFC2CC" />
              </button>

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-50">
                  <div className="bg-neutral-900 px-4 py-2 rounded-s shadow-lg whitespace-nowrap">
                    <p className="text-sm text-neutral-25">Next lesson</p>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-neutral-900 -ml-1.5" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel (Placeholder for future implementation) */}
        {sidebarOpen && (
          <div className="w-80 bg-neutral-800 border-l border-neutral-600 p-4 overflow-y-auto">
            <h3 className="font-bold text-lg text-neutral-25 mb-4">Course Navigation</h3>
            <p className="text-sm text-neutral-200">Sidebar content will go here</p>
          </div>
        )}
      </div>
    </div>
  );
};

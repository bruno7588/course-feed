import React from 'react';
import { SidebarLeft, ArrowUp, ArrowDown, More } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';

/**
 * WellDonePage - Displays success message after completing quiz correctly
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onKeepLearning - Callback for "Keep Learning" button
 * @param {number} props.pointsEarned - Number of points earned
 */
export const WellDonePage = ({ onBack, onKeepLearning, pointsEarned = 4 }) => {
  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col">
      {/* Global Header */}
      <GlobalHeader
        courseTitle="Cybersecurity Essentials for Employees (UK)"
        progress={20}
        onBack={onBack}
        showSidebarToggle={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Centered Content */}
        <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center">
          <div className="flex flex-col gap-8 items-center max-w-[496px]">
            {/* Success Content */}
            <div className="flex flex-col gap-6 items-center">
              {/* Points Display */}
              <div className="flex flex-col gap-4 items-center">
                {/* Green Circle Icon */}
                <div className="w-24 h-24">
                  <img
                    src="https://www.figma.com/api/mcp/asset/aed85515-b1e0-4197-9761-9606c25a804f"
                    alt="Success"
                    className="w-full h-full"
                  />
                </div>
                {/* Points */}
                <h1 className="font-bold text-[32px] text-neutral-25 leading-[1.5] text-center">
                  {pointsEarned} pts
                </h1>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 items-center text-center">
                <h2 className="font-bold text-xl text-neutral-25 leading-[1.5]">
                  Well done!
                </h2>
                <p className="text-base text-neutral-200 leading-[1.5]">
                  You answered all questions{' '}
                  <span className="font-bold text-success-500">correctly</span>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 items-center justify-center w-full">
              <button className="border border-primary-500 px-6 py-3 rounded-s w-[160px]">
                <p className="font-bold text-sm text-primary-500">Share Lesson</p>
              </button>
              <button
                onClick={onKeepLearning}
                className="bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-s w-[160px] transition-colors"
              >
                <p className="font-bold text-sm text-neutral-900">Keep Learning</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Actions */}
        <div className="flex flex-col items-center gap-3 py-4 px-4">
          {/* Sidebar Toggle */}
          <button
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

            {/* Next Arrow */}
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600"
              aria-label="Next"
            >
              <ArrowDown size={20} color="#BFC2CC" />
            </button>
          </div>

          {/* More Options */}
          <button
            className="w-10 h-10 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors"
            aria-label="More options"
          >
            <More size={24} color="#BFC2CC" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SidebarLeft, SidebarRight, ArrowUp, ArrowDown, ArrowUp2, ArrowDown2, Lock, TickCircle, PlayCircle, DocumentText, Link2 } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { cn } from '../lib/utils';

// Course outline icons and thumbnails
const iconAssessment = "https://www.figma.com/api/mcp/asset/df6b3073-390e-449d-a7c0-199369142902";
const imgThumb = "https://www.figma.com/api/mcp/asset/6b7d62e3-0198-4130-a564-dc11d5aa155e";
const imgThumb1 = "https://www.figma.com/api/mcp/asset/415b337b-8384-4e82-a281-1a5339f81f3c";
const imgThumb2 = "https://www.figma.com/api/mcp/asset/99318fde-c639-443d-b9e3-c51e5a33ef76";
const imgDate = "https://www.figma.com/api/mcp/asset/d5c6f5eb-aa64-4f6d-9db6-fa2d43c6542a";
const iconBrief = "https://www.figma.com/api/mcp/asset/384f10ba-bdea-418e-87a8-e83b66ab82c5";

/**
 * ReviewTestPage - Displays the review page with option to review situational test
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onReviewTest - Callback for reviewing the test
 * @param {Function} props.onNextLesson - Callback for navigating to next lesson
 * @param {boolean} props.sidebarOpen - Global sidebar state
 * @param {Function} props.onToggleSidebar - Callback to toggle sidebar
 */
export const ReviewTestPage = ({ onBack, onReviewTest, onNextLesson, sidebarOpen, onToggleSidebar }) => {
  const [showDownArrowTooltip, setShowDownArrowTooltip] = useState(false);
  const [showSidebarTooltip, setShowSidebarTooltip] = useState(false);
  const [courseOutlineExpanded, setCourseOutlineExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col">
      {/* Global Header */}
      <GlobalHeader
        courseTitle="Cybersecurity Essentials for Employees (UK)"
        progress={12}
        onBack={onBack}
        showSidebarToggle={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Feed Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-[720px] mx-auto py-16">
            {/* Brief Card */}
            <div className="bg-neutral-700 rounded-m p-8 flex flex-col gap-6">
              {/* Section Header */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 w-full">
                  {/* Brief Icon */}
                  <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img
                      src={iconBrief}
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
        <div className={cn(
          "absolute top-0 bottom-0 flex flex-col items-center gap-3 py-4 z-10 transition-all duration-200 ease-in-out",
          sidebarOpen ? "right-[556px]" : "right-4"
        )}>
          {/* Sidebar Toggle */}
          <div className="relative">
            <button
              onClick={onToggleSidebar}
              onMouseEnter={() => setShowSidebarTooltip(true)}
              onMouseLeave={() => setShowSidebarTooltip(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-700 rounded-full transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <SidebarRight size={24} color="#BFC2CC" />
              ) : (
                <SidebarLeft size={24} color="#BFC2CC" />
              )}
            </button>

            {/* Sidebar Tooltip */}
            {showSidebarTooltip && !sidebarOpen && (
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-50">
                {/* Tooltip arrow */}
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-neutral-900" />
                <div className="bg-neutral-900 px-4 py-3 rounded-s shadow-lg whitespace-nowrap">
                  <p className="text-sm text-neutral-25">Course outline</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {/* Previous Arrow - Disabled */}
            <button
              disabled
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 opacity-50 cursor-not-allowed"
              aria-label="Previous"
            >
              <ArrowUp size={20} color="#BFC2CC" />
            </button>

            {/* Next Arrow with Tooltip */}
            <div className="relative">
              <button
                onClick={onNextLesson}
                onMouseEnter={() => setShowDownArrowTooltip(true)}
                onMouseLeave={() => setShowDownArrowTooltip(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600"
                aria-label="Next lesson"
              >
                <ArrowDown size={20} color="#BFC2CC" />
              </button>

              {/* Tooltip */}
              {showDownArrowTooltip && (
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-50">
                  {/* Tooltip arrow */}
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-neutral-900" />
                  <div className="bg-neutral-900 px-4 py-3 rounded-s shadow-lg whitespace-nowrap">
                    <p className="text-sm text-neutral-25">Next lesson</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel - Animated slide in/out */}
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-[540px] bg-neutral-800 border-l border-neutral-600 overflow-y-auto",
          "transition-transform duration-200 ease-in-out will-change-transform",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col gap-5 pb-8">
            {/* Course Outline Section */}
            <div className="bg-[rgba(69,76,94,0.16)] flex flex-col gap-4 px-6 py-4 w-full">
              {/* Header */}
              <button
                onClick={() => setCourseOutlineExpanded(!courseOutlineExpanded)}
                className="flex items-center justify-between w-full"
              >
                <p className="font-bold text-sm text-neutral-25">Course outline</p>
                {courseOutlineExpanded ? (
                  <ArrowUp2 size={20} color="#BFC2CC" />
                ) : (
                  <ArrowDown2 size={20} color="#BFC2CC" />
                )}
              </button>

              {/* Expandable Content */}
              {courseOutlineExpanded && (
                <div className="flex flex-col gap-4">
                  {/* Situational Test Card - Completed (Yellow background) */}
                  <div className="bg-[rgba(255,187,56,0.12)] rounded-sm p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={iconAssessment}
                        alt="Assessment"
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <p className="font-bold text-sm text-neutral-25 truncate">
                        50 free Tools and resources that everyone should know
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200">Situational test</p>
                        <TickCircle size={16} color="#18A957" variant="Bold" />
                      </div>
                    </div>
                  </div>

                  {/* Video Lesson Card - Not Started */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 rounded-s overflow-hidden relative flex-shrink-0">
                      <img
                        src={imgThumb}
                        alt="Lesson"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-neutral-600 p-0.5 rounded-br">
                        <PlayCircle size={10} color="#BFC2CC" variant="Bold" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <p className="font-bold text-sm text-neutral-25 truncate">
                        50 free Tools and resources that everyone should know
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200">Instructor name · 3m 45s</p>
                        {/* Progress bar - all gray (not started) */}
                        <div className="flex gap-0.5 h-1 w-[72px]">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "flex-1 bg-neutral-600",
                                i === 0 && "rounded-l-full",
                                i === 7 && "rounded-r-full"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PDF Lesson Card - Disabled */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 rounded-s overflow-hidden relative flex-shrink-0 mix-blend-luminosity">
                      <img
                        src={imgThumb1}
                        alt="PDF Lesson"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-neutral-600 p-0.5 rounded-br">
                        <DocumentText size={10} color="#BFC2CC" variant="Bold" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <p className="font-bold text-sm text-neutral-500 truncate">
                        50 free Tools and resources that everyone should know
                      </p>
                      <p className="text-xs text-neutral-500">Instructor name · 3m 45s</p>
                    </div>
                    <Lock size={20} color="#656B7C" variant="Bold" />
                  </div>

                  {/* External Link Lesson Card - Disabled */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 rounded-s overflow-hidden relative flex-shrink-0 mix-blend-luminosity">
                      <img
                        src={imgThumb2}
                        alt="External Link"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-neutral-600 p-0.5 rounded-br flex items-center justify-center size-4">
                        <Link2 size={10} color="#BFC2CC" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <p className="font-bold text-sm text-neutral-500 truncate">
                        50 free Tools and resources that everyone should know
                      </p>
                      <p className="text-xs text-neutral-500">Instructor name · 3m 45s</p>
                    </div>
                    <Lock size={20} color="#656B7C" variant="Bold" />
                  </div>

                  {/* Event Card - Disabled */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex gap-2 items-start">
                    <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0 mix-blend-luminosity flex items-center justify-center">
                      <div className="relative w-full h-full flex flex-col items-center justify-end rounded-lg overflow-hidden">
                        <img src={imgDate} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-[rgba(15,16,20,0.2)] rounded-lg" />
                        <div className="relative flex-1 flex items-center justify-center px-1.5 py-0.5 w-full">
                          <p className="font-bold text-base text-neutral-25">30</p>
                        </div>
                        <div className="relative bg-[rgba(15,16,20,0.32)] py-1 text-center w-full rounded-bl-[4px] rounded-br-[4px]">
                          <p className="text-[10px] text-neutral-25">Aug</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <p className="font-bold text-sm text-neutral-500 truncate">
                        Title of the event
                      </p>
                      <div className="flex flex-wrap gap-2 items-start">
                        <div className="flex items-center gap-1">
                          <img
                            src="https://www.figma.com/api/mcp/asset/3551ccc4-c07e-4cdc-8a92-60fa0bf15d79"
                            alt="Calendar"
                            className="w-4 h-4 mix-blend-luminosity"
                          />
                          <p className="text-xs text-neutral-500">Monday, 13 Nov 2025</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <img
                            src="https://www.figma.com/api/mcp/asset/5d3ad3da-468b-4df7-a4a4-99903940195a"
                            alt="Clock"
                            className="w-4 h-4 mix-blend-luminosity"
                          />
                          <p className="text-xs text-neutral-500">11h00 - 12h00 GMT</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <img
                            src="https://www.figma.com/api/mcp/asset/050f97d1-748a-470e-ab14-3b092fff4c86"
                            alt="Location"
                            className="w-4 h-4 mix-blend-luminosity"
                          />
                          <p className="text-xs text-neutral-500">Main office, room 101</p>
                        </div>
                      </div>
                    </div>
                    <Lock size={20} color="#656B7C" variant="Bold" />
                  </div>

                  {/* Short Text Assessment - Disabled */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden flex-shrink-0 mix-blend-luminosity">
                      <div className="w-10 h-10 bg-neutral-600 rounded" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <p className="font-bold text-sm text-neutral-500 truncate">
                        Sales pitch
                      </p>
                      <p className="text-xs text-neutral-500">Short text</p>
                    </div>
                    <Lock size={20} color="#656B7C" variant="Bold" />
                  </div>

                  {/* Multiple Choice Assessment - Disabled */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden flex-shrink-0 mix-blend-luminosity">
                      <div className="w-10 h-10 bg-neutral-600 rounded" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <p className="font-bold text-sm text-neutral-500 truncate">
                        50 free Tools and resources that everyone should know
                      </p>
                      <p className="text-xs text-neutral-500">Multiple choice</p>
                    </div>
                    <Lock size={20} color="#656B7C" variant="Bold" />
                  </div>
                </div>
              )}
            </div>

            {/* Assessment Info */}
            <div className="flex flex-col gap-2 px-6 py-0">
              <p className="font-bold text-base text-neutral-25">Assessment</p>
              <p className="text-sm text-neutral-200">Situational test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

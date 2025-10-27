import React, { useState } from 'react';
import { SidebarLeft, ArrowUp, ArrowDown, ArrowUp2, ArrowDown2, Lock } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { cn } from '../lib/utils';

// Course outline icons and thumbnails
const iconAssessment = "https://www.figma.com/api/mcp/asset/ec2cd2c8-baf5-4dad-bfa6-754e4162669c";
const imgThumb = "https://www.figma.com/api/mcp/asset/4d5147c3-a865-4738-9b94-7f1d79ef3dd6";
const imgThumb1 = "https://www.figma.com/api/mcp/asset/1133f1f3-9c65-4f8d-9b3a-3cebda897821";
const imgThumb2 = "https://www.figma.com/api/mcp/asset/7270764b-ddf3-4f28-9bae-7e5cd5138941";
const imgDate = "https://www.figma.com/api/mcp/asset/9a2da51f-9b30-4d1a-8c67-814cacb4635d";
const iconPlayCircle = "https://www.figma.com/api/mcp/asset/0fc1f3ab-46ff-45c0-927c-233f7f087bde";
const iconDocumentText = "https://www.figma.com/api/mcp/asset/bd398a11-f06e-42d3-a7fd-4cbf9a84aab6";
const iconLink = "https://www.figma.com/api/mcp/asset/9b5b5c06-e67b-4fca-86d1-f8319c5299a9";

/**
 * CourseFeedPage - Displays the course content feed with brief cards
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onStartTest - Callback for starting the situational test
 * @param {boolean} props.sidebarOpen - Global sidebar state
 * @param {Function} props.onToggleSidebar - Callback to toggle sidebar
 */
export const CourseFeedPage = ({ onBack, onStartTest, sidebarOpen, onToggleSidebar }) => {
  const [courseOutlineExpanded, setCourseOutlineExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col">
      {/* Global Header */}
      <GlobalHeader
        courseTitle="Cybersecurity Essentials for Employees (UK)"
        progress={0}
        onBack={onBack}
        onToggleSidebar={onToggleSidebar}
        showSidebarToggle={true}
      />

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Feed Content */}
        <div className={cn(
          "flex-1 p-4 overflow-y-auto transition-transform duration-200 ease-in-out",
          sidebarOpen ? "-translate-x-[270px]" : "translate-x-0"
        )}>
          <div className="max-w-[720px] mx-auto py-16">
            {/* Brief Card */}
            <div className="bg-neutral-700 rounded-m p-8 flex flex-col gap-6">
              {/* Section Header */}
              <div className="flex flex-col gap-xs w-full">
                <div className="flex items-center gap-2 w-full">
                  {/* Assessment Icon */}
                  <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://www.figma.com/api/mcp/asset/a2fba8a4-be36-45e1-ad1b-9951d28a1f9a"
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
                onClick={onStartTest}
                className="bg-primary-500 hover:bg-primary-600 text-neutral-900 font-bold text-base px-6 py-3 rounded-s transition-colors self-start"
              >
                Start Situational Test
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button (Right Edge) */}
        <div className={cn(
          "absolute top-0 flex flex-col items-center gap-2 py-4 z-10 transition-all duration-200 ease-in-out",
          sidebarOpen ? "right-[556px]" : "right-4"
        )}>
          <button
            onClick={onToggleSidebar}
            className="w-8 h-8 flex items-center justify-center hover:bg-neutral-700 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <SidebarLeft size={24} color="#BFC2CC" />
          </button>
        </div>

        {/* Side Panel - Animated slide in/out */}
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-[540px] bg-neutral-800 border-l border-neutral-600 overflow-y-auto",
          "transition-transform duration-200 ease-in-out will-change-transform",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col w-full">
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
                  {/* Assessment - In Progress */}
                  <div className="bg-[rgba(255,187,56,0.12)] rounded-xl p-3 flex gap-2 items-center">
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
                      <p className="text-xs text-neutral-200">Situational test</p>
                    </div>
                  </div>

                  {/* Video Lesson - Disabled */}
                  <div className="bg-neutral-700 rounded-xl p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative mix-blend-luminosity">
                      <img
                        src={imgThumb}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute left-0 top-0 bg-neutral-600 p-0.5 rounded-br-[4px]">
                        <img src={iconPlayCircle} alt="" className="w-[10.67px] h-[10.67px]" />
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

                  {/* PDF Lesson - Disabled */}
                  <div className="bg-neutral-700 rounded-xl p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative mix-blend-luminosity">
                      <img
                        src={imgThumb1}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute left-0 top-0 bg-neutral-600 p-0.5 rounded-br-[4px]">
                        <img src={iconDocumentText} alt="" className="w-[10.67px] h-[10.67px]" />
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

                  {/* External Link Lesson - Disabled */}
                  <div className="bg-neutral-700 rounded-xl p-3 flex gap-2 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative mix-blend-luminosity">
                      <img
                        src={imgThumb2}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute left-0 top-0 bg-neutral-600 p-0.5 rounded-br-[4px] flex items-center justify-center size-4">
                        <img src={iconLink} alt="" className="w-[10.67px] h-[10.67px]" />
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

                  {/* Event - Disabled */}
                  <div className="bg-neutral-700 rounded-xl p-3 flex gap-2 items-start">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative mix-blend-luminosity flex items-center justify-center">
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
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-neutral-500">Monday, 13 Nov 2025</p>
                        <p className="text-xs text-neutral-500">11h00 - 12h00 GMT</p>
                        <p className="text-xs text-neutral-500">Main office, room 101</p>
                      </div>
                    </div>
                    <Lock size={20} color="#656B7C" variant="Bold" />
                  </div>

                  {/* Short Text Assessment - Disabled */}
                  <div className="bg-neutral-700 rounded-xl p-3 flex gap-2 items-center">
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
                  <div className="bg-neutral-700 rounded-xl p-3 flex gap-2 items-center">
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
            <div className="flex flex-col gap-2 px-6 py-4">
              <p className="font-bold text-base text-neutral-25">Assessment</p>
              <p className="text-sm text-neutral-200">Situational test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

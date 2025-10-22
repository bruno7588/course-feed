import React, { useState } from 'react';
import { SidebarLeft } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { cn } from '../lib/utils';

/**
 * CourseFeedPage - Displays the course content feed with brief cards
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onStartTest - Callback for starting the situational test
 */
export const CourseFeedPage = ({ onBack, onStartTest }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                onClick={onStartTest}
                className="bg-primary-500 hover:bg-primary-600 text-neutral-900 font-bold text-base px-6 py-3 rounded-s transition-colors self-start"
              >
                Start Situational Test
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button (Right Edge) */}
        <div className="absolute right-4 top-0 flex flex-col items-center gap-2 py-4">
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center hover:bg-neutral-700 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <SidebarLeft size={24} color="#BFC2CC" />
          </button>
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

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, SidebarLeft, SidebarRight, Maximize4, More, TickCircle, Discover, ArchiveAdd, Share, Message, Lock } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { cn } from '../lib/utils';

/**
 * PDFLessonPage - Displays PDF lesson with page navigation and animated footer
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onPrevious - Callback for previous lesson navigation
 * @param {Function} props.onNext - Callback for next lesson navigation
 * @param {Function} props.onTakeQuiz - Callback for "Take Quiz" button
 * @param {Function} props.onGoToTest - Callback to navigate to test
 * @param {Function} props.onGoToLesson - Callback to navigate to video lesson
 * @param {Function} props.onGoToEvent - Callback to navigate to event
 * @param {boolean} props.sidebarOpen - Global sidebar state
 * @param {Function} props.onToggleSidebar - Callback to toggle sidebar
 */
export const PDFLessonPage = ({ onBack, onPrevious, onNext, onTakeQuiz, onGoToTest, onGoToLesson, onGoToEvent, sidebarOpen, onToggleSidebar }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [showSidebarTooltip, setShowSidebarTooltip] = useState(false);

  const totalPages = 3;

  // Mock PDF pages - in real implementation, these would be actual PDF page images
  const pdfPages = [
    {
      title: "THE BACKSTABBER",
      subtitle: "Understanding workplace dynamics",
      image: "https://www.figma.com/api/mcp/asset/placeholder-pdf-1"
    },
    {
      title: "IDENTIFYING PATTERNS",
      subtitle: "Recognizing behavioral indicators",
      image: "https://www.figma.com/api/mcp/asset/placeholder-pdf-2"
    },
    // Add more pages as needed
  ];

  // Show footer when reaching the last page
  useEffect(() => {
    if (currentPage === totalPages - 1) {
      // Delay to animate the footer in
      const timer = setTimeout(() => setShowFooter(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowFooter(false);
    }
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const canNavigatePrevious = currentPage > 0;
  const canNavigateNext = currentPage < totalPages - 1;

  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col">
      {/* Global Header */}
      <GlobalHeader
        courseTitle="Cybersecurity Essentials for Employees (UK)"
        progress={40}
        onBack={onBack}
        showSidebarToggle={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* PDF Viewer */}
        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          {/* PDF Content Area - Full Width */}
          <div className={cn(
            "flex-1 flex items-center justify-center w-full p-8 transition-all duration-200 ease-in-out",
            sidebarOpen ? "pr-[540px]" : "pr-0"
          )}>
            {/* PDF Page Display - Full Width */}
            <div className="w-full h-full flex items-center justify-center">
              {/* Mock PDF Page - Replace with actual PDF rendering */}
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex flex-col items-center justify-center gap-8 p-12 shadow-2xl">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-48 h-48 bg-purple-400/30 rounded-full flex items-center justify-center">
                    <div className="text-6xl">🎭</div>
                  </div>
                  <h1 className="font-bold text-4xl text-white text-center">
                    THE BACKSTABBER
                  </h1>
                  <p className="text-lg text-purple-200 text-center">
                    Understanding workplace dynamics
                  </p>
                </div>
                <p className="text-sm text-purple-200 text-center max-w-md leading-relaxed">
                  Learn to identify and navigate complex interpersonal relationships in professional settings.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="pb-6 px-6 flex items-center justify-center gap-4">
            {/* Previous Page Button */}
            <button
              onClick={handlePreviousPage}
              disabled={!canNavigatePrevious}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0",
                canNavigatePrevious
                  ? "bg-white hover:bg-neutral-100 cursor-pointer"
                  : "bg-white/50 cursor-not-allowed"
              )}
              aria-label="Previous page"
            >
              <ArrowLeft
                size={16}
                color={canNavigatePrevious ? "#0F1014" : "#656B7C"}
              />
            </button>

            {/* Progress Bar and Counter */}
            <div className="flex-1 flex items-center gap-2">
              {/* Progress Bar */}
              <div className="flex-1 flex items-center gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const isCompleted = index < currentPage;
                  const isCurrent = index === currentPage;
                  const progressPercent = isCurrent ? 37 : 0; // Current page shows 37% progress

                  return (
                    <div
                      key={index}
                      className="flex-1 h-0.5 flex items-start rounded-full overflow-hidden bg-neutral-600"
                    >
                      {isCompleted ? (
                        // Completed pages - 100% green
                        <div className="flex flex-1 h-full">
                          <div className="flex-1 h-full bg-success-500 rounded-l-full" />
                          <div className="flex-1 h-full bg-success-500" />
                          <div className="flex-1 h-full bg-success-500" />
                          <div className="flex-1 h-full bg-success-500 rounded-r-full" />
                        </div>
                      ) : isCurrent ? (
                        // Current page - 37% yellow (3 out of 8 segments)
                        <div className="flex flex-1 h-full">
                          <div className="flex-1 h-full bg-secondary-500 rounded-l-full" />
                          <div className="flex-1 h-full bg-secondary-500" />
                          <div className="flex-1 h-full bg-secondary-500 rounded-r-full" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600 rounded-r-full" />
                        </div>
                      ) : (
                        // Upcoming pages - 0% (empty)
                        <div className="flex flex-1 h-full">
                          <div className="flex-1 h-full bg-neutral-600 rounded-l-full" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600" />
                          <div className="flex-1 h-full bg-neutral-600 rounded-r-full" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Page Counter */}
              <p className="text-sm text-white shrink-0 leading-6">
                {currentPage + 1} / {totalPages}
              </p>
            </div>

            {/* Next Page Button */}
            <button
              onClick={handleNextPage}
              disabled={!canNavigateNext}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0",
                canNavigateNext
                  ? "bg-white hover:bg-neutral-100 cursor-pointer"
                  : "bg-white/50 cursor-not-allowed"
              )}
              aria-label="Next page"
            >
              <ArrowRight
                size={16}
                color={canNavigateNext ? "#0F1014" : "#656B7C"}
              />
            </button>
          </div>
        </div>

        {/* Right Sidebar Actions */}
        <div className={cn(
          "absolute top-0 bottom-0 flex flex-col items-center gap-3 py-4 px-4 z-10 transition-all duration-200 ease-in-out",
          sidebarOpen ? "right-[540px]" : "right-0"
        )}>
          {/* Sidebar Toggle */}
          <div className="relative">
            <button
              onClick={onToggleSidebar}
              onMouseEnter={() => setShowSidebarTooltip(true)}
              onMouseLeave={() => setShowSidebarTooltip(false)}
              className="w-10 h-10 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <SidebarRight size={24} color="#BFC2CC" />
              ) : (
                <SidebarLeft size={24} color="#BFC2CC" />
              )}
            </button>

            {/* Sidebar Tooltip */}
            {showSidebarTooltip && (
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-50">
                {/* Tooltip arrow */}
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-neutral-900 -mr-1.5" />
                <div className="bg-neutral-900 px-4 py-2 rounded-s shadow-lg whitespace-nowrap">
                  <p className="text-sm text-neutral-25">
                    {sidebarOpen ? 'Close details' : 'Open details'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {/* Previous Lesson Arrow */}
            <button
              onClick={onPrevious}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600 cursor-pointer"
              aria-label="Previous lesson"
            >
              <ArrowUp size={20} color="#BFC2CC" />
            </button>

            {/* Next Lesson Arrow */}
            <button
              onClick={onNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600 cursor-pointer"
              aria-label="Next lesson"
            >
              <ArrowDown size={20} color="#BFC2CC" />
            </button>
          </div>

          {/* Expand Button */}
          <button
            className="w-10 h-10 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors"
            aria-label="Expand"
          >
            <Maximize4 size={24} color="#BFC2CC" />
          </button>

          {/* More Options */}
          <button
            className="w-10 h-10 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors"
            aria-label="More options"
          >
            <More size={24} color="#BFC2CC" />
          </button>
        </div>

        {/* Side Panel - Course Outline - Animated slide in/out */}
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-[540px] bg-neutral-800 border-l border-neutral-600 overflow-y-auto",
          "transition-transform duration-200 ease-in-out will-change-transform",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}>
            <div className="flex flex-col">
              {/* Course Outline Section */}
              <div className="flex flex-col gap-4 border-b border-neutral-600 py-6 px-6">
                <h3 className="font-bold text-base text-neutral-25 leading-6">Course outline</h3>

                <div className="flex flex-col gap-3">
                  {/* Completed Assessment Card - Clickable */}
                  <button
                    onClick={onGoToTest}
                    className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-3 flex items-center gap-2 w-full transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://www.figma.com/api/mcp/asset/3b9efe6d-556a-45c8-bec5-5b1b5416e754"
                        alt="Assessment"
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="font-bold text-sm text-neutral-25 leading-6 text-left">
                        50 free Tools and resources that everyone should know
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200">Situational test</p>
                        <TickCircle size={16} color="#18A957" variant="Bold" />
                      </div>
                    </div>
                  </button>

                  {/* Completed Reading Card - Clickable */}
                  <button className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-3 flex items-center gap-2 w-full transition-colors cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://www.figma.com/api/mcp/asset/5b6da549-00ea-43d6-bc94-0a1dd4a1d38a"
                        alt="Reading"
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="font-bold text-sm text-neutral-25 leading-6 text-left">
                        Empowering your future with green energy
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200">Reading · 3m 45s</p>
                        <TickCircle size={16} color="#18A957" variant="Bold" />
                      </div>
                    </div>
                  </button>

                  {/* Completed Link Card - Clickable */}
                  <button className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-3 flex items-center gap-2 w-full transition-colors cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://www.figma.com/api/mcp/asset/19bbc0a7-17c5-49ee-b03f-bcba13f2e4b0"
                        alt="Link"
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="font-bold text-sm text-neutral-25 leading-6 text-left">
                        Empowering your future with green energy
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200">External resource</p>
                        <TickCircle size={16} color="#18A957" variant="Bold" />
                      </div>
                    </div>
                  </button>

                  {/* Event Card - Completed */}
                  <button
                    onClick={onGoToEvent}
                    className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-3 flex items-start gap-2 w-full transition-colors cursor-pointer"
                  >
                    {/* Date Display */}
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden shrink-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                        <img
                          src="https://www.figma.com/api/mcp/asset/98e60c93-0fe6-46a3-9f23-2be5b4902fbe"
                          alt="Event date background"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-neutral-900/20" />
                        <div className="relative flex flex-col h-full">
                          <div className="flex-1 flex items-center justify-center">
                            <p className="font-bold text-base text-neutral-25 leading-6">30</p>
                          </div>
                          <div className="bg-neutral-900/32 px-1.5 py-0.5 rounded-bl-sm rounded-br-sm">
                            <p className="text-[10px] text-neutral-25 text-center leading-tight">Aug</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Event Info */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <p className="font-bold text-sm text-neutral-25 leading-6 truncate">
                        Title of the event
                      </p>
                      <div className="flex flex-wrap gap-2 items-start">
                        {/* Date */}
                        <div className="flex items-center gap-1">
                          <img
                            src="https://www.figma.com/api/mcp/asset/3551ccc4-c07e-4cdc-8a92-60fa0bf15d79"
                            alt="Calendar"
                            className="w-4 h-4"
                          />
                          <p className="text-xs text-neutral-200 leading-tight">Monday, 13 Nov 2025</p>
                        </div>
                        {/* Time */}
                        <div className="flex items-center gap-1">
                          <img
                            src="https://www.figma.com/api/mcp/asset/5d3ad3da-468b-4df7-a4a4-99903940195a"
                            alt="Clock"
                            className="w-4 h-4"
                          />
                          <p className="text-xs text-neutral-200 leading-tight">11h00 - 12h00 GMT</p>
                        </div>
                        {/* Location */}
                        <div className="flex items-center gap-1">
                          <img
                            src="https://www.figma.com/api/mcp/asset/050f97d1-748a-470e-ab14-3b092fff4c86"
                            alt="Location"
                            className="w-4 h-4"
                          />
                          <p className="text-xs text-neutral-200 leading-tight">Main office, room 101</p>
                        </div>
                      </div>
                    </div>
                    <TickCircle size={16} color="#18A957" variant="Bold" />
                  </button>

                  {/* PDF Lesson Card - Current/In Progress */}
                  <div className="rounded-sm p-3 flex items-center gap-2" style={{ backgroundColor: 'rgba(255, 187, 56, 0.12)' }}>
                    <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0">
                      <img
                        src="https://www.figma.com/api/mcp/asset/6d7d2c24-f4e8-4b97-bfa0-74856c72c5ba"
                        alt="PDF thumbnail"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      {/* Document Icon Tag */}
                      <div className="absolute left-0 top-0 bg-neutral-600 p-0.5 rounded-br flex items-center justify-center">
                        <img
                          src="https://www.figma.com/api/mcp/asset/c0ab2411-3e90-4d47-94e3-1185c71dadb2"
                          alt="Document"
                          className="w-[10.667px] h-[10.667px]"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <p className="font-bold text-sm text-neutral-25 leading-6 truncate">
                        50 free Tools and resources that everyone should know
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200 leading-tight">Instructor name · 3m 45s</p>
                        {/* Progress Bar - 4 segments */}
                        <div className="flex items-center h-1 w-[72px] bg-neutral-600 rounded-full overflow-hidden">
                          <div className="flex-1 h-full bg-secondary-500" />
                          <div className="flex-1 h-full bg-secondary-500" />
                          <div className="flex-1 h-full bg-secondary-500" />
                          <div className="flex-1 h-full bg-secondary-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assessment Card - Multiple choice - Disabled */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex items-center gap-2">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden mix-blend-luminosity">
                      <img
                        src="https://www.figma.com/api/mcp/asset/3b9efe6d-556a-45c8-bec5-5b1b5416e754"
                        alt="Assessment"
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="font-bold text-sm text-neutral-500 leading-6">
                        50 free Tools and resources that everyone should know
                      </p>
                      <p className="text-xs text-neutral-500">Multiple choice</p>
                    </div>
                    <Lock size={20} color="#656B7C" variant="Bold" />
                  </div>
                </div>
              </div>

              {/* Lesson Info */}
              <div className="flex flex-col gap-4 py-6 px-6">
                {/* Lesson Title */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-base text-neutral-25 leading-6">
                    Tearing Down Zendesk's Pricing. What is behind our Unconscious Bias? (Episode 1/4)
                  </h3>
                  <a href="#" className="text-sm text-primary-500 underline">
                    Take a deep dive
                  </a>
                </div>

                {/* Skills */}
                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <img
                        src="https://www.figma.com/api/mcp/asset/7d14a771-6092-4bd9-a5da-9830b1eb7343"
                        alt="Skill"
                        className="w-4 h-4"
                      />
                    </div>
                    <p className="text-sm text-neutral-300">Software Development Principles</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <img
                        src="https://www.figma.com/api/mcp/asset/f7404f3d-5645-4376-9b86-5a80883a61fc"
                        alt="Skill"
                        className="w-4 h-4"
                      />
                    </div>
                    <p className="text-sm text-neutral-300">Critical & Analytical Thinking</p>
                  </div>
                </div>

                {/* Actions Menu */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1">
                    <p className="text-sm font-bold text-neutral-25">Learnings</p>
                    <Discover size={16} color="#F9F9FA" />
                  </button>
                  <button className="flex items-center gap-1">
                    <p className="text-sm font-bold text-neutral-25">Bookmark</p>
                    <ArchiveAdd size={16} color="#F9F9FA" />
                  </button>
                  <button className="flex items-center gap-1">
                    <p className="text-sm font-bold text-neutral-25">Share</p>
                    <Share size={16} color="#F9F9FA" />
                  </button>
                  <button className="flex items-center gap-1">
                    <p className="text-sm font-bold text-neutral-25">Comments</p>
                    <Message size={16} color="#F9F9FA" />
                  </button>
                </div>

                {/* Instructor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src="https://www.figma.com/api/mcp/asset/6a6d2a06-a075-4d8a-904c-e255931ecb14"
                        alt="Michaela Scott"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-25 font-medium">Michaela Scott</p>
                      <p className="text-xs text-neutral-200">Instructor</p>
                    </div>
                  </div>
                  <button className="border border-primary-500 px-4 py-2 rounded-s">
                    <p className="text-xs font-bold text-primary-500">Follow</p>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Animated Footer - Shows on last page */}
      <div
        className={cn(
          "bg-neutral-800 border-t border-neutral-600 px-8 py-6 flex items-center justify-center transition-all duration-300 ease-in-out",
          showFooter
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-[900px] w-full flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="font-bold text-base text-primary-500 hover:text-primary-400 transition-colors"
          >
            Back
          </button>

          {/* Take Quiz Button */}
          <button
            onClick={onTakeQuiz}
            className="px-6 py-3 rounded-s font-bold text-base transition-colors bg-primary-500 text-neutral-900 hover:bg-primary-600"
          >
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

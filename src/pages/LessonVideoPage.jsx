import React, { useState } from 'react';
import { SidebarLeft, SidebarRight, ArrowUp, ArrowDown, Maximize4, More, ArrowDown2, ArrowUp2, Discover, ArchiveAdd, Share, Message, TickCircle, Lock, PlayCircle, DocumentText, Link2, Calendar, Clock, Location } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { cn } from '../lib/utils';

/**
 * LessonVideoPage - Displays a lesson video player
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onStartTest - Callback to navigate to situational test
 * @param {Function} props.onNextPage - Callback to navigate to next page (Event)
 */
export const LessonVideoPage = ({ onBack, onStartTest, onNextPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSidebarTooltip, setShowSidebarTooltip] = useState(false);
  const [courseOutlineOpen, setCourseOutlineOpen] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Mock lessons data
  const lessons = [
    {
      title: "Tearing Down Zendesk's Pricing. What is behind our Unconscious Bias? (Episode 1/4)",
      videoUrl: "https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2",
    },
    {
      title: "Understanding User Psychology and Behavioral Patterns (Episode 2/4)",
      videoUrl: "https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2",
    },
    {
      title: "Data-Driven Decision Making in Product Design (Episode 3/4)",
      videoUrl: "https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2",
    },
    {
      title: "Implementing Effective Pricing Strategies (Episode 4/4)",
      videoUrl: "https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2",
    },
  ];

  const currentLesson = lessons[currentLessonIndex];
  const hasPrevious = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < lessons.length - 1;
  const canNavigatePrevious = hasPrevious || !!onStartTest; // Can go previous if there's a previous lesson OR can go to test
  const canNavigateNext = hasNext || !!onNextPage; // Can go next if there's another lesson OR next page

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePreviousLesson = () => {
    if (hasPrevious) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (onStartTest) {
      // If on first lesson and no previous lesson, go to situational test
      onStartTest();
    }
  };

  const handleNextLesson = () => {
    if (hasNext) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (onNextPage) {
      // If on last lesson and no next lesson, go to next page (Event)
      onNextPage();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col">
      {/* Global Header */}
      <GlobalHeader
        courseTitle="Cybersecurity Essentials for Employees (UK)"
        progress={0}
        onBack={onBack}
        showSidebarToggle={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Video Player Area */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className={cn(
            "relative rounded-m overflow-hidden h-full transition-all duration-200 ease-in-out",
            sidebarOpen ? "mr-[540px]" : "mr-0"
          )} style={{ aspectRatio: '9/16' }}>
            {/* Video Thumbnail/Player */}
            <img
              src={currentLesson.videoUrl}
              alt="Lesson video"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(15,16,20,0.5)] pointer-events-none" />

            {/* Progress Bar at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-2">
              {/* Progress segments */}
              <div className="flex-1 flex items-center gap-1">
                {/* Segment 1 - Filled sections */}
                <div className="flex-1 h-0.5 bg-neutral-600 rounded-full flex gap-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex-1 bg-neutral-600 first:rounded-l-full last:rounded-r-full" />
                  ))}
                </div>
                {/* Segment 2 - Empty sections */}
                <div className="flex-1 h-0.5 bg-neutral-600 rounded-full flex gap-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex-1 bg-neutral-600 first:rounded-l-full last:rounded-r-full" />
                  ))}
                </div>
              </div>
              {/* Time */}
              <p className="text-sm text-neutral-25">1:42</p>
            </div>
          </div>
        </div>

        {/* Sliding Container: Actions + Side Panel */}
        <div
          className={cn(
            "flex transition-transform duration-200 ease-in-out",
            sidebarOpen ? "translate-x-0" : "translate-x-[540px]"
          )}
        >
          {/* Right Sidebar Actions */}
          <div className="flex flex-col items-center gap-3 py-4 px-4 bg-neutral-800">
            {/* Sidebar Toggle */}
            <div className="relative">
              <button
                onClick={toggleSidebar}
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
              {/* Previous Arrow */}
              <button
                onClick={handlePreviousLesson}
                disabled={!canNavigatePrevious}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  canNavigatePrevious
                    ? "bg-neutral-700 hover:bg-neutral-600 cursor-pointer"
                    : "bg-neutral-700 opacity-50 cursor-not-allowed"
                )}
                aria-label={hasPrevious ? "Previous lesson" : "Go to test"}
              >
                <ArrowUp size={20} color={canNavigatePrevious ? "#BFC2CC" : "#656B7C"} />
              </button>

              {/* Next Arrow with Tooltip */}
              <div className="relative">
                <button
                  onClick={handleNextLesson}
                  disabled={!canNavigateNext}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    canNavigateNext
                      ? "bg-neutral-700 hover:bg-neutral-600 cursor-pointer"
                      : "bg-neutral-700 opacity-50 cursor-not-allowed"
                  )}
                  aria-label={hasNext ? "Next lesson" : "Next page"}
                >
                  <ArrowDown size={20} color={canNavigateNext ? "#BFC2CC" : "#656B7C"} />
                </button>

                {/* Tooltip */}
                {showTooltip && canNavigateNext && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-50">
                    <div className="bg-neutral-900 px-4 py-2 rounded-s shadow-lg whitespace-nowrap">
                      <p className="text-sm text-neutral-25">{hasNext ? "Next lesson" : "Next page"}</p>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-neutral-900 -ml-1.5" />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Actions */}
            <button
              className="w-10 h-10 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize4 size={20} color="#BFC2CC" />
            </button>

            <button
              className="w-10 h-10 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors"
              aria-label="More options"
            >
              <More size={24} color="#BFC2CC" />
            </button>
          </div>

          {/* Animated Side Panel with Lesson Details */}
          <div className="w-[540px] bg-neutral-800 border-l border-neutral-600 overflow-y-auto">
          <div className="flex flex-col gap-5 pb-8">
            {/* Course Outline */}
            <div className="bg-[rgba(69,76,94,0.16)] flex flex-col overflow-hidden">
              <button
                onClick={() => setCourseOutlineOpen(!courseOutlineOpen)}
                className="hover:bg-[#2d313d] px-6 py-4 flex items-center justify-between w-full transition-colors"
              >
                <p className="font-bold text-sm text-neutral-25">Course outline</p>
                {courseOutlineOpen ? (
                  <ArrowUp2 size={20} color="#BFC2CC" />
                ) : (
                  <ArrowDown2 size={20} color="#BFC2CC" />
                )}
              </button>

              {/* Expandable Content */}
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out overflow-hidden",
                  courseOutlineOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="flex flex-col gap-4 px-6 pb-4">
                  {/* Assessment Card - Completed */}
                  <button
                    onClick={onStartTest}
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

                  {/* Video Lesson Card - In Progress */}
                  <div className="bg-[rgba(255,187,56,0.12)] rounded-sm p-3 flex items-center gap-2">
                    <div className="w-12 h-12 rounded-s overflow-hidden relative">
                      <img
                        src="https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2"
                        alt="Lesson"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-neutral-600 p-0.5 rounded-br">
                        <PlayCircle size={10} color="#BFC2CC" variant="Bold" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <p className="font-bold text-sm text-neutral-25 leading-6">
                        50 free Tools and resources that everyone should know
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200">Instructor name · 3m 45s</p>
                        <div className="flex-1 max-w-[72px] h-1 bg-neutral-600 rounded-full flex gap-0.5">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex-1 bg-secondary-500 first:rounded-l-full last:rounded-r-full" />
                          ))}
                          {[...Array(5)].map((_, i) => (
                            <div key={i + 3} className="flex-1 bg-neutral-600 first:rounded-l-full last:rounded-r-full" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reading/Document Lesson Card - Completed */}
                  <button className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-3 flex items-center gap-2 w-full transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-s overflow-hidden relative">
                      <img
                        src="https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2"
                        alt="Reading"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-neutral-600 p-0.5 rounded-br">
                        <DocumentText size={10} color="#BFC2CC" variant="Bold" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <p className="font-bold text-sm text-neutral-25 leading-6 text-left">
                        50 free Tools and resources that everyone should know
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200">Instructor name · 3m 45s</p>
                        <TickCircle size={16} color="#18A957" variant="Bold" />
                      </div>
                    </div>
                  </button>

                  {/* Link/External Resource Card - Completed */}
                  <button className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-3 flex items-center gap-2 w-full transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-s overflow-hidden relative">
                      <img
                        src="https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2"
                        alt="Link"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-neutral-600 p-0.5 rounded-br">
                        <Link2 size={10} color="#BFC2CC" variant="Bold" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <p className="font-bold text-sm text-neutral-25 leading-6 text-left">
                        50 free Tools and resources that everyone should know
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-200">Instructor name · 3m 45s</p>
                        <TickCircle size={16} color="#18A957" variant="Bold" />
                      </div>
                    </div>
                  </button>


                  {/* Event Card */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex items-start gap-2">
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
                  </div>

                  {/* PDF Lesson Card - Not Started */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex items-center gap-2">
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
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <p className="font-bold text-sm text-neutral-25 leading-6 truncate">
                        50 free Tools and resources that everyone should know
                      </p>
                      <p className="text-xs text-neutral-200">Instructor name · 3m 45s</p>
                    </div>
                  </div>

                  {/* Assessment Card - Multiple choice */}
                  <div className="bg-neutral-700 rounded-sm p-3 flex items-center gap-2">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://www.figma.com/api/mcp/asset/3b9efe6d-556a-45c8-bec5-5b1b5416e754"
                        alt="Assessment"
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="font-bold text-sm text-neutral-25 leading-6">
                        50 free Tools and resources that everyone should know
                      </p>
                      <p className="text-xs text-neutral-200">Multiple choice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Info */}
            <div className="flex flex-col gap-4 px-6">
              {/* Lesson Title */}
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-base text-neutral-25 leading-6">
                  {currentLesson.title}
                </h3>
                <a href="#" className="text-sm text-primary-500 underline">
                  Take a deep dive
                </a>
              </div>

              {/* Episodes */}
              <div className="flex gap-4 overflow-x-auto">
                {/* Episode 1 */}
                <div className="bg-neutral-700 rounded-sm p-4 flex flex-col gap-6 min-w-[180px]">
                  <p className="text-xs text-neutral-300">Episode 1</p>
                  <p className="text-sm text-neutral-25 leading-6 font-medium h-[63px] overflow-hidden">
                    How to Disagree with Your Boss - Disagreeing Is Not Bad With The Best Practices (Episode 1)
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-neutral-600 rounded-full flex gap-0.5">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex-1 bg-neutral-500 first:rounded-l-full last:rounded-r-full" />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-25">1:42</p>
                  </div>
                </div>

                {/* Episode 2 */}
                <div className="bg-neutral-700 rounded-sm p-4 flex flex-col gap-6 min-w-[180px]">
                  <p className="text-xs text-neutral-300">Episode 2</p>
                  <p className="text-sm text-neutral-200 leading-6 font-medium h-[63px]">
                    Timeline, Data and Goals
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-neutral-600 rounded-full flex gap-0.5">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex-1 bg-neutral-500 first:rounded-l-full last:rounded-r-full" />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-200">1:42</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="flex gap-2 px-6 flex-wrap">
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

            {/* Instructor */}
            <div className="flex items-center justify-between px-6">
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

            {/* Actions Menu */}
            <div className="flex items-center justify-between px-6">
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

            {/* Answer Quiz */}
            <div className="px-6">
              <button
                onClick={onStartTest}
                className="border border-[#FA715F] hover:bg-[rgba(250,113,95,0.08)] rounded-sm px-6 py-4 flex items-center gap-3 w-full transition-colors"
              >
                <div className="w-7 h-10 flex-shrink-0">
                  <img
                    src="https://www.figma.com/api/mcp/asset/99fe1cff-3945-471e-b767-c0cea464d14b"
                    alt="Quiz"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-neutral-200 leading-6 text-left">
                  Answer the Quiz at the end of this lesson and earn 4 Skill Points
                </p>
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

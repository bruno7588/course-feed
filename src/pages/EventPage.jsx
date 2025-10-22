import React, { useState, useRef, useEffect } from 'react';
import { SidebarLeft, SidebarRight, ArrowUp, ArrowDown, ArrowDown2, ArrowUp2, Calendar, Clock, Location, People, TickCircle, PlayCircle, DocumentText, Link2, CloseCircle } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { cn } from '../lib/utils';

/**
 * EventPage - Displays an in-person event with session details
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onPrevious - Callback for previous navigation
 * @param {Function} props.onNext - Callback for next navigation
 */
export const EventPage = ({ onBack, onPrevious, onNext }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSidebarTooltip, setShowSidebarTooltip] = useState(false);
  const [courseOutlineOpen, setCourseOutlineOpen] = useState(false);
  const [attendanceDropdownOpen, setAttendanceDropdownOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleAttendanceDropdown = () => {
    setAttendanceDropdownOpen(!attendanceDropdownOpen);
  };

  const handleAttendanceSelect = (option) => {
    if (option === 'attended') {
      setShowConfirmDialog(true);
    } else {
      setSelectedAttendance(option);
    }
    setAttendanceDropdownOpen(false);
  };

  const handleCancelDialog = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmAttendance = () => {
    setSelectedAttendance('attended');
    setShowConfirmDialog(false);
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAttendanceDropdownOpen(false);
      }
    };

    if (attendanceDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [attendanceDropdownOpen]);

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
        {/* Event Content */}
        <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center">
          <div className={cn(
            "max-w-[720px] w-full transition-transform duration-200 ease-in-out",
            sidebarOpen ? "-translate-x-[270px]" : "translate-x-0"
          )}>
            {/* Event Modal */}
            <div
              className="rounded-m p-8 flex flex-col gap-6"
              style={{
                background: 'linear-gradient(120.52deg, rgba(99, 179, 144, 0.08) 0%, rgba(255, 173, 136, 0.08) 100%), #20222A'
              }}
            >
              {/* Section Header */}
              <div className="flex flex-col gap-3 w-full">
                <h1 className="font-bold text-xl text-neutral-25 leading-6">
                  Title of the in-person event
                </h1>
                <div className="h-px w-full bg-neutral-600 rounded" />
              </div>

              {/* Sessions */}
              <div className="flex flex-col gap-4 w-full">
                {/* Session Card */}
                <div className="rounded-m overflow-hidden flex flex-col w-full">
                  {/* Header */}
                  <div className="border-b border-[#4ba987] px-6 py-5 flex items-center gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                      <h2 className="font-bold text-xl text-neutral-25 leading-6">
                        Session 1
                      </h2>
                      <p className="text-sm text-neutral-200 leading-6">
                        Instructor Martina Rossi
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="w-5 h-5 flex items-center justify-center">
                        <Calendar size={20} color="#BFC2CC" />
                      </button>

                      {selectedAttendance === 'attended' ? (
                        /* Attended Badge */
                        <div className="bg-success-500 flex items-center gap-1 px-4 py-2 rounded-m">
                          <TickCircle size={20} color="#FFFFFF" variant="Linear" />
                          <p className="text-sm text-white leading-6">Attended</p>
                        </div>
                      ) : (
                        /* Mark Attendance Button + Dropdown */
                        <div className="relative" ref={dropdownRef}>
                          <button
                            onClick={toggleAttendanceDropdown}
                            className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-s transition-colors"
                          >
                            <p className="font-bold text-sm text-neutral-900">Mark Attendance</p>
                          </button>

                          {/* Attendance Dropdown */}
                          {attendanceDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-neutral-700 border border-neutral-600 rounded-m p-2 flex flex-col gap-0 w-[180px] shadow-lg z-50">
                              {/* Attended Option */}
                              <button
                                onClick={() => handleAttendanceSelect('attended')}
                                className="flex items-center gap-2 px-4 py-3 rounded-s hover:bg-neutral-600 transition-colors w-full text-left"
                              >
                                <TickCircle size={16} color="#BFC2CC" variant="Linear" />
                                <p className="text-sm text-neutral-25 leading-6">Attended</p>
                              </button>

                              {/* Didn't Attend Option */}
                              <button
                                onClick={() => handleAttendanceSelect('not-attended')}
                                className="flex items-center gap-2 px-4 py-3 rounded-s hover:bg-neutral-600 transition-colors w-full text-left"
                              >
                                <CloseCircle size={16} color="#BFC2CC" variant="Linear" />
                                <p className="text-sm text-neutral-25 leading-6">Didn't Attend</p>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="px-6 py-5 flex items-center gap-4">
                    {/* Date Calendar */}
                    <div className="w-[72px] h-[72px] rounded-sm overflow-hidden relative flex-shrink-0">
                      <img
                        src="https://www.figma.com/api/mcp/asset/6530973e-2648-48f5-ade8-c76774b9eae1"
                        alt="Calendar"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[rgba(15,16,20,0.2)]" />
                      <div className="relative h-full flex flex-col">
                        <div className="flex-1 flex items-center justify-center">
                          <p className="font-bold text-[32px] text-neutral-25 leading-[1.5]">30</p>
                        </div>
                        <div className="bg-[rgba(15,16,20,0.32)] px-2 py-1 rounded-b-sm">
                          <p className="text-sm text-neutral-25 leading-6 text-center">Aug</p>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 flex flex-col gap-3">
                      {/* Time & Location */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock size={20} color="#BFC2CC" />
                          <p className="text-sm text-neutral-25 leading-6">12:00 - 16:00 GMT</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Location size={20} color="#BFC2CC" />
                          <p className="text-sm text-neutral-25 leading-6">Where: Main office, room 101</p>
                        </div>
                      </div>
                      {/* Learners */}
                      <div className="flex items-center gap-2">
                        <People size={20} color="#BFC2CC" />
                        <p className="text-sm text-neutral-25 leading-6">0 learners</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              {showSidebarTooltip && (
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-50">
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
              <button
                onClick={onPrevious}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600"
                aria-label="Previous"
              >
                <ArrowUp size={20} color="#BFC2CC" />
              </button>

              <button
                onClick={onNext}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600"
                aria-label="Next"
              >
                <ArrowDown size={20} color="#BFC2CC" />
              </button>
            </div>
          </div>

          {/* Animated Side Panel */}
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
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-neutral-200">Situational test</p>
                          <TickCircle size={16} color="#18A957" variant="Bold" />
                        </div>
                      </div>
                    </div>

                    {/* Video Lesson Card - Completed */}
                    <div className="bg-neutral-700 rounded-sm p-3 flex items-center gap-2">
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
                          <TickCircle size={16} color="#18A957" variant="Bold" />
                        </div>
                      </div>
                    </div>

                    {/* Reading/Document Lesson Card - Completed */}
                    <div className="bg-neutral-700 rounded-sm p-3 flex items-center gap-2">
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
                        <p className="font-bold text-sm text-neutral-25 leading-6">
                          50 free Tools and resources that everyone should know
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-neutral-200">Instructor name · 3m 45s</p>
                          <TickCircle size={16} color="#18A957" variant="Bold" />
                        </div>
                      </div>
                    </div>

                    {/* Link/External Resource Card - Completed */}
                    <div className="bg-neutral-700 rounded-sm p-3 flex items-center gap-2">
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
                        <p className="font-bold text-sm text-neutral-25 leading-6">
                          50 free Tools and resources that everyone should know
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-neutral-200">Instructor name · 3m 45s</p>
                          <TickCircle size={16} color="#18A957" variant="Bold" />
                        </div>
                      </div>
                    </div>

                    {/* Event Card - In Progress */}
                    <div className="bg-[rgba(255,187,56,0.12)] rounded-sm p-3 flex items-start gap-2">
                      <div className="w-12 h-12 rounded-s overflow-hidden relative flex-shrink-0">
                        <img
                          src="https://www.figma.com/api/mcp/asset/6530973e-2648-48f5-ade8-c76774b9eae1"
                          alt="Calendar"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[rgba(15,16,20,0.2)]" />
                        <div className="relative h-full flex flex-col">
                          <div className="flex-1 flex items-center justify-center">
                            <p className="font-bold text-base text-neutral-25 leading-[1.5]">30</p>
                          </div>
                          <div className="bg-[rgba(15,16,20,0.32)] px-1.5 py-0.5 rounded-b-sm">
                            <p className="text-[10px] text-neutral-25 leading-[1.4] text-center">Aug</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <p className="font-bold text-sm text-neutral-25 leading-6">
                          Title of the event
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} color="#BFC2CC" />
                            <p className="text-xs text-neutral-200">Monday, 13 Nov 2025</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} color="#BFC2CC" />
                            <p className="text-xs text-neutral-200">11h00 - 12h00 GMT</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Location size={16} color="#BFC2CC" />
                            <p className="text-xs text-neutral-200">Main office, room 101</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Assessment Card - Sales pitch */}
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
                          Sales pitch
                        </p>
                        <p className="text-xs text-neutral-200">Short text</p>
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

              {/* About Event */}
              <div className="flex flex-col gap-4 px-6">
                <h3 className="font-bold text-base text-neutral-25 leading-6">
                  Title of the event
                </h3>
                <p className="text-sm text-neutral-200 leading-6">
                  Prepare for a thrilling, spine-tingling competition with 5Mins.ai that will put your soft skills to the test—Halloween-style! This isn't your average challenge—it's a haunting battle of wits and (soft) skills.
                  <br /><br />
                  Step into the spotlight and showcase your talents in this fast-paced showdown. Compete against fellow 5Mins.ai'ers for your chance to take home terrifying treats:
                  <br /><br />
                  Limited spots available—don't miss this ghoulish opportunity to prove your skills, conquer the competition, and win big!
                </p>

                {/* Who's Attending */}
                <div className="flex items-center gap-3">
                  <p className="font-bold text-base text-neutral-25 leading-6">Who's attending</p>
                  <div className="flex items-center pr-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-neutral-700 border border-neutral-800 -mr-2 flex items-center justify-center"
                      >
                        <span className="text-xs">😊</span>
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-800 -mr-2 flex items-center justify-center">
                      <p className="text-[8px] text-neutral-200">+30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-neutral-900 opacity-[0.64] z-40" onClick={handleCancelDialog} />

          {/* Dialog */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-m p-8 flex flex-col gap-6 max-w-[900px] shadow-lg z-50">
            {/* Body */}
            <div className="flex flex-col gap-4 items-center">
              {/* Success Icon */}
              <div className="w-[72px] h-[72px]">
                <img
                  src="https://www.figma.com/api/mcp/asset/67be993b-fe83-495d-863e-e0045453d418"
                  alt="Success"
                  className="w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 items-center text-center">
                <h2 className="font-bold text-xl text-neutral-25 leading-6">
                  Mark as Attended
                </h2>
                <p className="text-base text-neutral-200 leading-6">
                  By continuing, you confirm that you attended a session on the event.
                </p>
              </div>
            </div>

            {/* Event Details Card */}
            <div className="bg-[rgba(69,76,94,0.16)] rounded-m p-4 flex flex-col gap-4">
              {/* Event Name */}
              <div className="flex gap-8 items-center">
                <p className="text-sm text-neutral-300 leading-6 w-[53px]">Event</p>
                <p className="font-medium text-sm text-neutral-25 leading-6">
                  Spooky Skill Battle Royale: The Ultimate Halloween Soft Skills Showdown!
                </p>
              </div>

              {/* Session Date/Time */}
              <div className="flex gap-8 items-center">
                <p className="text-sm text-neutral-300 leading-6">Session</p>
                <p className="font-medium text-sm text-neutral-25 leading-6">
                  Monday 30 August 12:00 - 16:00 GMT
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 items-center justify-center w-full">
              <button
                onClick={handleCancelDialog}
                className="border border-neutral-25 px-6 py-3 rounded-s w-[116px] transition-colors hover:bg-neutral-700"
              >
                <p className="font-bold text-sm text-neutral-25">Cancel</p>
              </button>
              <button
                onClick={handleConfirmAttendance}
                className="bg-success-500 hover:bg-success-600 px-6 py-3 rounded-s transition-colors"
              >
                <p className="font-bold text-base text-neutral-25">Attended</p>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-success-500 flex items-center gap-2 px-6 py-3 rounded-m shadow-lg z-50">
          <TickCircle size={24} color="#FFFFFF" variant="Bold" />
          <p className="font-bold text-base text-white leading-6">
            You're marked as attended — thanks for joining!
          </p>
        </div>
      )}
    </div>
  );
};

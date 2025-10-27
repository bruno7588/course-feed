import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowUp2, ArrowDown2, SidebarLeft, SidebarRight, Heart, TickCircle, Lock } from 'iconsax-react';
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
 * SituationalTestPage - Displays quiz questions with multiple choice options
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onFinish - Callback when finishing the test
 * @param {Function} props.onWellDone - Callback when answering correctly
 * @param {boolean} props.sidebarOpen - Global sidebar state
 * @param {Function} props.onToggleSidebar - Callback to toggle sidebar
 */
export const SituationalTestPage = ({ onBack, onFinish, onWellDone, sidebarOpen, onToggleSidebar }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lives, setLives] = useState(3);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSidebarTooltip, setShowSidebarTooltip] = useState(false);
  const [showDownArrowTooltip, setShowDownArrowTooltip] = useState(false);
  const [courseOutlineExpanded, setCourseOutlineExpanded] = useState(true);

  // Mock questions data
  const questions = [
    {
      id: 1,
      text: "After observing a team member's exceptional analytical skills during the campaign, which approach aligns with the Strength Based Feedback Model for reinforcing their performance?",
      options: [
        "They are occasionally considered but aren't the main drivers of design changes.",
        "They are occasionally considered but aren't the main drivers of design changes.",
        "They are occasionally considered but aren't the main drivers of design changes.",
        "They are occasionally considered but aren't the main drivers of design changes."
      ],
      correctAnswer: 0, // Index of the correct answer
      explanation: "User feedback and testing are taken into account, but they aren't always the primary factors influencing design modifications. This could be due to Organizational Priorities: The organization might prioritize business objectives, technological feasibility, or other internal factors over user feedback."
    },
    // Add more questions as needed
  ];

  const totalQuestions = 20;
  const currentQuestionData = questions[0]; // For now, using the first question

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    }
  };

  const handleCheck = () => {
    if (isAnswerChecked) {
      // If already checked and answer is correct, go to well-done page
      if (isCorrect && onWellDone) {
        onWellDone();
      } else if (onFinish) {
        // Otherwise go to review page
        onFinish();
      }
    } else {
      // Check the answer
      const correct = selectedOption === currentQuestionData.correctAnswer;
      setIsCorrect(correct);
      setIsAnswerChecked(true);
      if (!correct) {
        setLives(Math.max(0, lives - 1));
      }
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
        {/* Quiz Content */}
        <div className={cn(
          "flex-1 p-4 overflow-y-auto transition-transform duration-200 ease-in-out",
          sidebarOpen ? "-translate-x-[270px]" : "translate-x-0"
        )}>
          <div className="max-w-[900px] mx-auto py-16 flex flex-col gap-5">
            {/* Question Section */}
            <div className="flex flex-col gap-2">
              {/* Question Label and Hearts */}
              <div className="flex items-center justify-between w-full">
                <p className="text-xs text-neutral-300">
                  Question {currentQuestion + 1}/{totalQuestions}
                </p>
                <div className="flex items-center gap-1.5">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="w-5 h-5 flex items-center justify-center">
                      <Heart
                        size={20}
                        color={index < lives ? "#FF6B6B" : "#656B7C"}
                        variant={index < lives ? "Bold" : "Linear"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <h2 className="font-bold text-base text-neutral-25 leading-6">
                {currentQuestionData.text}
              </h2>
            </div>

            {/* Options Section */}
            <div className="flex flex-col gap-3 w-full">
              {currentQuestionData.options.map((option, index) => {
                const isCorrectAnswer = index === currentQuestionData.correctAnswer;
                const showAsCorrect = isAnswerChecked && isCorrectAnswer;
                const isSelected = selectedOption === index;

                // Hide non-correct options when answer is checked
                if (isAnswerChecked && !isCorrectAnswer) {
                  return null;
                }

                return (
                  <div key={index} className="flex flex-col gap-3 w-full">
                    <button
                      onClick={() => !isAnswerChecked && handleOptionSelect(index)}
                      disabled={isAnswerChecked}
                      className={cn(
                        'rounded-sm px-4 py-3 flex items-center gap-2 w-full text-left transition-colors',
                        showAsCorrect
                          ? 'bg-success-500'
                          : isSelected
                          ? 'bg-secondary-500'
                          : 'bg-neutral-700',
                        !isAnswerChecked && !isSelected && 'hover:bg-neutral-600',
                        isAnswerChecked && 'cursor-default'
                      )}
                    >
                      {/* Radio Button or Check Icon */}
                      <div className="flex items-center justify-center shrink-0 w-5 h-5">
                        {showAsCorrect ? (
                          <TickCircle size={20} color="#FFFFFF" variant="Bold" />
                        ) : (
                          <div
                            className={cn(
                              'w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center',
                              isSelected
                                ? 'border-neutral-900 bg-neutral-900'
                                : 'border-neutral-25'
                            )}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-neutral-25" />
                            )}
                          </div>
                        )}
                      </div>
                      {/* Option Text */}
                      <p className={cn(
                        'text-sm leading-6 flex-1',
                        showAsCorrect
                          ? 'text-neutral-25'
                          : isSelected
                          ? 'text-neutral-900'
                          : 'text-neutral-25'
                      )}>
                        {option}
                      </p>
                    </button>

                    {/* Explanation Section - Only show for correct answer when checked */}
                    {showAsCorrect && (
                      <div className="flex flex-col gap-3 rounded-s">
                        {/* Well done header */}
                        <div className="flex items-center gap-3 h-6">
                          <span className="text-2xl">👏</span>
                          <p className="font-bold text-base text-success-500">
                            Well done!
                          </p>
                        </div>
                        {/* Explanation text */}
                        <p className="text-sm text-neutral-200 leading-6">
                          {currentQuestionData.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
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
            {/* Up Arrow - Navigate back to Start page */}
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 hover:bg-neutral-600"
              aria-label="Back to start"
            >
              <ArrowUp size={20} color="#BFC2CC" />
            </button>

            {/* Down Arrow - Disabled with tooltip */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowDownArrowTooltip(true)}
                onMouseLeave={() => setShowDownArrowTooltip(false)}
                disabled
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-700 opacity-50 cursor-not-allowed"
                aria-label="Next lesson"
              >
                <ArrowDown size={20} color="#656B7C" />
              </button>

              {/* Tooltip */}
              {showDownArrowTooltip && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-50">
                  <div className="bg-neutral-900 px-4 py-2 rounded-s shadow-lg whitespace-nowrap">
                    <p className="text-sm text-neutral-25">Answer the quiz to continue</p>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-neutral-900 -ml-1.5" />
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
              <p className="font-bold text-base text-neutral-25">Refining Feedback Techniques: Strength-Based and SBI Models</p>
              <p className="text-sm text-neutral-200">Master essential cyber skills to safeguard your workplace. Learn to spot phishing, secure devices, handle data under UK GDPR, and respond to incidents. Covers NCSC guidance, insider threats, password security, and building cyber-aware culture. This course equips employees to reduce risks and ensure compliance with UK regulations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Action Buttons */}
      <div className="bg-neutral-800 border-t border-neutral-600 px-8 py-6 flex items-center justify-center">
        <div className="max-w-[900px] w-full flex items-center justify-end">
          {/* Check/Finish Button */}
          <button
            onClick={handleCheck}
            disabled={!isAnswerChecked && selectedOption === null}
            className={cn(
              'px-6 py-3 rounded-s font-bold text-base transition-colors',
              !isAnswerChecked && selectedOption === null
                ? 'bg-neutral-400 text-neutral-300 cursor-not-allowed'
                : 'bg-primary-500 text-neutral-900 hover:bg-primary-600'
            )}
          >
            {isAnswerChecked ? 'Finish' : 'Check'}
          </button>
        </div>
      </div>
    </div>
  );
};

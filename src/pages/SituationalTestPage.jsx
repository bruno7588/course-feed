import React, { useState } from 'react';
import { ArrowUp, ArrowDown, SidebarLeft, SidebarRight, Heart, TickCircle } from 'iconsax-react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { cn } from '../lib/utils';

/**
 * SituationalTestPage - Displays quiz questions with multiple choice options
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback for back navigation
 * @param {Function} props.onFinish - Callback when finishing the test
 * @param {Function} props.onWellDone - Callback when answering correctly
 */
export const SituationalTestPage = ({ onBack, onFinish, onWellDone }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lives, setLives] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSidebarTooltip, setShowSidebarTooltip] = useState(false);

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
        showSidebarToggle={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Quiz Content */}
        <div className={cn(
          "flex-1 p-4 overflow-y-auto transition-transform duration-200 ease-in-out",
          sidebarOpen ? "-translate-x-[160px]" : "translate-x-0"
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
        <div className="flex flex-col items-center gap-3 py-4 px-4">
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
            {/* Previous Question Arrow */}
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                currentQuestion === 0
                  ? 'bg-neutral-700 opacity-50 cursor-not-allowed'
                  : 'bg-neutral-700 hover:bg-neutral-600'
              )}
              aria-label="Previous question"
            >
              <ArrowUp
                size={20}
                color={currentQuestion === 0 ? '#656B7C' : '#BFC2CC'}
              />
            </button>

            {/* Next Question Arrow */}
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion >= totalQuestions - 1}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                currentQuestion >= totalQuestions - 1
                  ? 'bg-neutral-700 opacity-50 cursor-not-allowed'
                  : 'bg-neutral-700 hover:bg-neutral-600'
              )}
              aria-label="Next question"
            >
              <ArrowDown
                size={20}
                color={currentQuestion >= totalQuestions - 1 ? '#656B7C' : '#BFC2CC'}
              />
            </button>
          </div>
        </div>

        {/* Side Panel (if needed) */}
        {sidebarOpen && (
          <div className="w-80 bg-neutral-800 border-l border-neutral-600 p-4 overflow-y-auto">
            <h3 className="font-bold text-lg text-neutral-25 mb-4">Question Navigation</h3>
            <p className="text-sm text-neutral-200">Question overview will go here</p>
          </div>
        )}
      </div>

      {/* Footer with Action Buttons */}
      <div className="bg-neutral-800 border-t border-neutral-600 px-8 py-6 flex items-center justify-center">
        <div className="max-w-[900px] w-full flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="font-bold text-base text-primary-500 hover:text-primary-400 transition-colors"
          >
            Back
          </button>

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

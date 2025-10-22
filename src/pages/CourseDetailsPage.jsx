import React, { useState } from 'react';
import { CourseHeader } from '../components/features/CourseHeader';
import {
  Tabs,
  LessonCard,
  AssessmentCard,
  EventCard,
  CertificationCard
} from '../components/ui';

/**
 * CourseDetailsPage - Main page component for displaying course details
 * Matches the Figma design for Course Details Page
 *
 * @param {Object} props
 * @param {Function} props.onStartSituationalTest - Callback when situational test is clicked
 */
export const CourseDetailsPage = ({ onStartSituationalTest }) => {
  const [activeTab, setActiveTab] = useState('course');

  return (
    <div className="min-h-screen bg-neutral-800 p-6">
      <div className="max-w-[900px] mx-auto">
        {/* Course Header with Cover Image Background */}
        <div className="mb-8 relative">
          {/* Cover Image - Behind header only */}
          <div className="absolute top-0 left-[-184px] right-[-184px] h-[300px] rounded-m overflow-hidden -z-10">
            <div className="w-full h-full bg-gradient-to-b from-neutral-700 to-neutral-800 opacity-50" />
          </div>

          {/* Header Content */}
          <div className="relative pt-8 z-10">
            <CourseHeader
              title="Cybersecurity Essentials for Employees (UK)"
              lessonCount={17}
              duration="20 min"
              jewels={100}
              hasCertificate={true}
              passScore={80}
              progress={0}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs
            tabs={[
              { label: 'Course', value: 'course' },
              { label: 'Score', value: 'score' },
              { label: 'Overview', value: 'overview' },
              { label: 'Resources', value: 'resources', badge: 3 }
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Course Content */}
        {activeTab === 'course' && (
          <div className="flex flex-col gap-6">
            {/* Situational Test Section */}
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-neutral-25">Situational test</h2>
              </div>
              {/* Start Tooltip - Centered */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <button
                    onClick={onStartSituationalTest}
                    className="bg-primary-500 hover:bg-primary-600 text-neutral-900 px-6 py-3 rounded-sm font-bold transition-colors cursor-pointer"
                  >
                    Start!
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-primary-500" />
                  </div>
                </div>
              </div>
              <AssessmentCard
                title="Refining Feedback Techniques: Strength-Based and SBI Models"
                type="Situational test"
                onClick={onStartSituationalTest}
              />
            </section>

            {/* Lessons Section */}
            <section>
              <h2 className="text-xl font-bold text-neutral-25 mb-4">Lessons</h2>
              <div className="flex flex-col gap-4">
                <LessonCard
                  thumbnail="https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2"
                  title="Why Cybersecurity Matters in the UK Today"
                  instructor="Instructor name"
                  duration="3m 45s"
                  isLocked={true}
                />
                <LessonCard
                  thumbnail="https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2"
                  title="Why Cybersecurity Matters in the UK Today"
                  instructor="Instructor name"
                  duration="3m 45s"
                  isLocked={true}
                />
                <LessonCard
                  thumbnail="https://www.figma.com/api/mcp/asset/f6090e6a-1b17-4ef5-83d6-c0786d463ff2"
                  title="Why Cybersecurity Matters in the UK Today"
                  instructor="Instructor name"
                  duration="3m 45s"
                  isLocked={true}
                />
              </div>
            </section>

            {/* Events Section */}
            <section>
              <h2 className="text-xl font-bold text-neutral-25 mb-4">Events</h2>
              <EventCard
                title="Laws of Data Privacy"
                day="30"
                month="Aug"
                date="Monday, 13 November 2024, +2 dates"
                time="10:00 - 11:00 GMT, +2 sessions"
                location="Woly Office, Room 0A +2 locations"
              />
            </section>

            {/* Assessments Section */}
            <section>
              <h2 className="text-xl font-bold text-neutral-25 mb-4">Assessments</h2>
              <div className="flex flex-col gap-4">
                <AssessmentCard
                  title="Managing Malware"
                  type="Multiple choice"
                />
                <AssessmentCard
                  title="Managing Malware"
                  type="Multiple choice"
                />
              </div>
            </section>

            {/* Certification Section */}
            <section>
              <h2 className="text-xl font-bold text-neutral-25 mb-4">Certification</h2>
              <CertificationCard
                title="Certificate of completion"
                description="Finish all lessons and complete the assessments to unlock your certification."
              />
            </section>

            {/* Feedback Section */}
            <section className="mt-8">
              <button className="flex items-center gap-2 mx-auto text-neutral-25 hover:text-primary-500 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <span className="text-base">Give us feedback!</span>
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

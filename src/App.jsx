import React, { useState } from 'react';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { CourseFeedPage } from './pages/CourseFeedPage';
import { SituationalTestPage } from './pages/SituationalTestPage';
import { ReviewTestPage } from './pages/ReviewTestPage';
import { LessonVideoPage } from './pages/LessonVideoPage';
import { WellDonePage } from './pages/WellDonePage';
import { EventPage } from './pages/EventPage';
import { PDFLessonPage } from './pages/PDFLessonPage';
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState('details'); // 'details', 'feed', 'test', 'review', 'lesson', 'welldone', 'event', or 'pdf'

  const navigateToFeed = () => {
    setCurrentPage('feed');
  };

  const navigateToTest = () => {
    setCurrentPage('test');
  };

  const navigateToReview = () => {
    setCurrentPage('review');
  };

  const navigateToLesson = () => {
    setCurrentPage('lesson');
  };

  const navigateToDetails = () => {
    setCurrentPage('details');
  };

  const navigateBackToFeed = () => {
    setCurrentPage('feed');
  };

  const navigateBackToReview = () => {
    setCurrentPage('review');
  };

  const navigateToWellDone = () => {
    setCurrentPage('welldone');
  };

  const navigateToEvent = () => {
    setCurrentPage('event');
  };

  const navigateToPDF = () => {
    setCurrentPage('pdf');
  };

  return (
    <div className="App">
      {currentPage === 'details' && (
        <CourseDetailsPage onStartSituationalTest={navigateToFeed} />
      )}
      {currentPage === 'feed' && (
        <CourseFeedPage onBack={navigateToDetails} onStartTest={navigateToTest} />
      )}
      {currentPage === 'test' && (
        <SituationalTestPage onBack={navigateToDetails} onFinish={navigateToReview} onWellDone={navigateToWellDone} />
      )}
      {currentPage === 'review' && (
        <ReviewTestPage onBack={navigateToDetails} onReviewTest={navigateToTest} onNextLesson={navigateToLesson} />
      )}
      {currentPage === 'lesson' && (
        <LessonVideoPage onBack={navigateToDetails} onStartTest={navigateToTest} onNextPage={navigateToEvent} />
      )}
      {currentPage === 'welldone' && (
        <WellDonePage onBack={navigateToDetails} onKeepLearning={navigateToEvent} />
      )}
      {currentPage === 'event' && (
        <EventPage onBack={navigateToDetails} onPrevious={navigateToLesson} onNext={navigateToPDF} />
      )}
      {currentPage === 'pdf' && (
        <PDFLessonPage onBack={navigateToDetails} onPrevious={navigateToEvent} onNext={navigateToLesson} onTakeQuiz={navigateToTest} />
      )}
    </div>
  );
}

export default App;

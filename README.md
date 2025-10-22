# Course Details Page - Figma Prototype

A React + Tailwind CSS implementation of the Course Details Page from Figma, following design system guidelines and best practices.

## Overview

This project is a pixel-perfect implementation of the Figma design for a course details page, showcasing:
- Course header with metadata and progress tracking
- Tabbed navigation
- Lesson cards with thumbnails
- Assessment cards
- Event cards
- Certification information
- Responsive design with proper spacing and typography

## Design Source

**Figma File**: [Course details page App](https://www.figma.com/design/V3yRE8eWKS14Fchx1rqRgT/Course-details-page-App?node-id=12843-65637&m=dev)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Poppins Font** - Typography (from Google Fonts)
- **clsx + tailwind-merge** - Class name utilities

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── LessonCard.jsx
│   │   ├── AssessmentCard.jsx
│   │   ├── EventCard.jsx
│   │   ├── CertificationCard.jsx
│   │   ├── Tabs.jsx
│   │   └── index.js
│   ├── features/              # Feature-specific components
│   │   └── CourseHeader.jsx
│   └── layout/                # Layout components (future)
├── pages/
│   └── CourseDetailsPage.jsx  # Main page component
├── styles/
│   └── globals.css            # Global styles and CSS variables
├── lib/
│   └── utils.js               # Utility functions (cn)
├── App.jsx                    # Root component
└── main.jsx                   # Entry point
```

## Design System

### Color Palette

The project follows the design system defined in the parent directory's `design-system-guidelines.md`:

- **Primary**: Cyan/Teal (#00CEE6)
- **Secondary**: Orange/Yellow (#FFBB38)
- **Neutral**: Grayscale (#F9F9FA to #0F1014)
- **Success**: Green (#18A957)
- **Warning**: Orange (#FFA538)
- **Danger**: Red (#DF1642)

### Typography

- **Font Family**: Poppins
- **Sizes**: 14px (paragraph), 16px (h4), 20px (h3), 24px (h2)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing

- **Base unit**: 4px
- **Custom scale**: xxs (4px), xs (8px), s (8px), sm (12px), m (16px), ml (20px), l (24px), xl (32px), xxl (40px)

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server (runs on http://localhost:3000)
npm run dev
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Components

### CourseHeader
Displays course title, metadata (lessons, duration), badges (jewels, certificate), and progress bar.

**Props:**
- `title` - Course title
- `lessonCount` - Number of lessons
- `duration` - Course duration
- `jewels` - Jewels to earn
- `hasCertificate` - Whether course offers certificate
- `passScore` - Pass score percentage
- `progress` - Current progress (0-100)

### LessonCard
Displays individual lesson with thumbnail, title, instructor, and duration.

**Props:**
- `thumbnail` - Lesson thumbnail URL
- `title` - Lesson title
- `instructor` - Instructor name
- `duration` - Lesson duration
- `isLocked` - Lock status

### AssessmentCard
Displays assessment with icon, title, and type.

**Props:**
- `title` - Assessment title
- `type` - Assessment type (e.g., "Situational test")

### EventCard
Displays event with date, time, location information.

**Props:**
- `title` - Event title
- `day` - Day of month
- `month` - Month abbreviation
- `date` - Full date string
- `time` - Event time
- `location` - Event location

### CertificationCard
Displays certification information with medal icon.

**Props:**
- `title` - Certification title
- `description` - Certification description

### Tabs
Tab navigation component.

**Props:**
- `tabs` - Array of tab objects
- `activeTab` - Currently active tab
- `onTabChange` - Callback for tab changes

## Accessibility

- Semantic HTML elements used throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states for all interactive elements
- Proper color contrast ratios (WCAG 2.1 Level AA)

## Figma Integration Rules

This project follows the guidelines defined in `FIGMA_DESIGN_RULES.md`:

1. ✅ Used `get_design_context` to fetch structured design data
2. ✅ Used `get_screenshot` for visual reference
3. ✅ Used assets from Figma MCP server directly (no external icon libraries)
4. ✅ Mapped Figma design tokens to project's Tailwind configuration
5. ✅ Reused color system and typography from existing design system
6. ✅ Followed project structure conventions

## Assets

All assets (icons, images, illustrations) are loaded directly from Figma's MCP asset endpoint as per the design rules.

## License

Private project - All rights reserved

## Author

Generated with Claude Code following Figma MCP best practices

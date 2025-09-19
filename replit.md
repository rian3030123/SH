# Birthday Celebration Website

## Overview

A responsive, interactive birthday celebration website built with modern React technologies. This project is designed to create beautiful, personalized birthday experiences with dynamic animations, photo galleries, and customizable content. The site features glassmorphism design, floating animations, and a celebration theme with confetti effects and birthday-specific styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom birthday theme configuration and CSS variables
- **Component Library**: Radix UI primitives with custom shadcn/ui components for consistent, accessible UI elements
- **Routing**: React Router DOM for client-side navigation with catch-all 404 handling

### Design System
- **Theme Management**: next-themes for light/dark mode support with smooth transitions
- **Typography**: Custom font integration (Dancing Script for headings, Poppins for body text)
- **Color Scheme**: Birthday-themed palette with CSS custom properties for light/dark mode variants
- **Visual Effects**: Glassmorphism cards with backdrop blur, floating balloon animations, confetti particles, and sparkle animations
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities

### Component Structure
- **Modular Components**: Separated concerns with dedicated components for Hero, Gallery, Messages, Tabs, and Animations
- **UI Components**: Comprehensive shadcn/ui component library including dialogs, tabs, buttons, and form elements
- **Animation Components**: Custom floating elements, sparkle animations, and scroll-triggered effects
- **Layout Components**: Header with theme toggle, footer, and scroll-to-top functionality

### Content Management
- **Static Data**: JSON files for poems, quotes, and friend messages stored in `/src/data/`
- **Image Assets**: Static images stored in `/public/images/` for gallery, hero, and decorative elements
- **Customization**: Easy name and content updates through component props and data files

### State Management
- **React Query**: TanStack Query for server state management and caching
- **React Context**: Theme provider for global theme state
- **Local State**: React hooks (useState, useEffect) for component-specific state like lightbox, animations, and UI interactions

### Performance Optimizations
- **Code Splitting**: Vite's automatic code splitting for optimal bundle sizes
- **Image Optimization**: Responsive images with proper loading strategies
- **Animation Performance**: CSS transforms and GPU acceleration for smooth animations
- **TypeScript Configuration**: Relaxed settings for faster development while maintaining type safety

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router DOM for frontend framework
- **Build Tools**: Vite with React SWC plugin for fast builds and hot module replacement
- **TypeScript**: Type system with relaxed configuration for development speed

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **Radix UI**: Comprehensive primitive components for accessibility and functionality
- **shadcn/ui**: Pre-built component library based on Radix UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant API for component styling

### Theme and Animation
- **next-themes**: Theme management system for light/dark mode switching
- **Embla Carousel**: Touch-friendly carousel component for image galleries
- **Date-fns**: Date utility library for date formatting and manipulation

### Development Tools
- **ESLint**: Code linting with TypeScript and React-specific rules
- **React Hook Form**: Form handling with validation support
- **TanStack Query**: Server state management and data fetching
- **Input OTP**: One-time password input component

### Font Integration
- **Google Fonts**: Dancing Script and Poppins fonts loaded via CSS imports for custom typography
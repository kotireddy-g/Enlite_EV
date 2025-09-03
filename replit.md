# ENLITE EV CARE - Electric Vehicle Service Center

## Overview

ENLITE EV CARE is a professional electric vehicle service center web application specializing in maintenance and repair services for 2-wheelers, 3-wheelers, and buses in Hyderabad. The application features a modern, responsive landing page with service information, contact forms, and business details, built as a full-stack React application with Express.js backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server for fast compilation and hot module replacement
- **Wouter** for lightweight client-side routing instead of React Router
- **shadcn/ui** component library built on Radix UI primitives for consistent, accessible UI components
- **Tailwind CSS** for utility-first styling with custom design tokens and theming
- **TanStack Query** for server state management, caching, and API interactions
- **React Hook Form** with Zod resolvers for form validation and management

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints and middleware
- **RESTful API** design with `/api/contact` endpoints for contact form submissions
- **Modular route registration** system for organized endpoint management
- **Custom logging middleware** for request/response tracking and debugging
- **Error handling middleware** with standardized JSON error responses
- **In-memory storage** implementation with interface abstraction for easy database migration

### Database Design
- **Drizzle ORM** configured for PostgreSQL with schema-first approach
- **Contact requests** table for storing customer service inquiries with status tracking
- **Users** table for potential admin/auth functionality
- **Zod schema validation** integrated with Drizzle for type-safe database operations
- **Migration system** configured for database schema versioning

### UI/UX Design Patterns
- **Mobile-first responsive design** with breakpoint-based layouts
- **Glass morphism effects** and gradient styling for modern visual appeal
- **Smooth scrolling navigation** between page sections
- **Toast notifications** for user feedback on form submissions
- **Loading states and error handling** for enhanced user experience
- **Accessibility features** through Radix UI primitives and semantic HTML

### Development Workflow
- **TypeScript** throughout the stack for type safety and better developer experience
- **ESM modules** for modern JavaScript import/export patterns
- **Path aliases** configured for cleaner import statements (@/, @shared/)
- **Development/production environment** configuration with NODE_ENV checks
- **Hot module replacement** in development with Vite integration

### External Dependencies

#### Database & ORM
- **Neon Database** (@neondatabase/serverless) for PostgreSQL hosting
- **Drizzle ORM** for type-safe database queries and migrations
- **connect-pg-simple** for PostgreSQL session store compatibility

#### UI Framework & Styling
- **Radix UI** component primitives for accessibility and customization
- **Tailwind CSS** with PostCSS for utility-first styling
- **Lucide React** for consistent iconography
- **Embla Carousel** for image carousels and sliders

#### Form Handling & Validation
- **React Hook Form** for form state management
- **Zod** for schema validation and TypeScript integration
- **@hookform/resolvers** for connecting validation libraries

#### State Management & Data Fetching
- **TanStack Query** for server state, caching, and background updates
- **Wouter** for client-side routing

#### Development Tools
- **Vite** for build tooling and development server
- **esbuild** for production builds and bundling
- **tsx** for TypeScript execution in development
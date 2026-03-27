# Personal Sustainability Time-Machine 🌍

A comprehensive web application for tracking and optimizing your environmental impact through intelligent data analysis and AI-powered recommendations.

## Features

### 📊 Core Functionality

1. **Dashboard**
   - Real-time sustainability score tracking
   - Summary cards for carbon, water, energy, and waste
   - Trend analysis with interactive charts
   - Smart alerts and quick suggestions

2. **Data Entry**
   - Multi-category tracking (Travel, Energy, Water, Waste)
   - Interactive sliders and intuitive inputs
   - Real-time emission calculations
   - Beautiful tabbed interface

3. **Time-Rewind Simulation**
   - Before/after scenario comparisons
   - Visual impact analysis
   - Multiple optimization scenarios
   - Actionable insights

4. **Impact Payback Planner**
   - Monthly target tracking
   - Timeline visualization
   - Action checklist with completion tracking
   - Progress indicators

5. **Recommendations**
   - AI-powered sustainability suggestions
   - Category-based filtering
   - Priority-based organization
   - Impact quantification

6. **Habit & Mistake Detection**
   - Behavioral pattern analysis
   - Risk level categorization
   - Frequency graphs
   - AI-generated insights

7. **Digital Twin Simulation**
   - Virtual home energy modeling
   - Toggle optimization scenarios
   - Cost savings calculator
   - Efficiency percentage tracking

8. **Daily Report**
   - Day-by-day performance summary
   - Good actions and improvements
   - Category-wise breakdown
   - Personalized suggestions

9. **Goals & Progress**
   - Custom goal setting
   - Progress tracking
   - Achievement badges
   - Gamification elements

10. **Reports & Analytics**
    - Comprehensive data visualization
    - Weekly and monthly trends
    - Exportable reports (PDF, CSV, Excel)
    - Key insights and comparisons

11. **Profile Settings**
    - User account management
    - Theme toggle (Light/Dark mode)
    - Notification preferences
    - Impact statistics
    - Data management

### 🎨 Design Features

- **Modern UI/UX**: Clean, minimal design with eco-friendly color palette
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Full dark mode support
- **Smooth Animations**: Polished transitions and interactions
- **Accessibility**: WCAG-compliant components

## Technology Stack

- **Framework**: React 18
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Theme**: Next Themes
- **Build Tool**: Vite

## Pages

1. `/login` - Authentication page with split layout
2. `/` - Main dashboard with overview
3. `/data-entry` - Add new sustainability data
4. `/time-rewind` - Scenario comparison simulations
5. `/impact-planner` - Monthly targets and actions
6. `/recommendations` - AI-powered suggestions
7. `/habit-detection` - Behavioral pattern analysis
8. `/digital-twin` - Virtual home energy modeling
9. `/daily-report` - Daily performance summary
10. `/goals` - Goal tracking and achievements
11. `/reports` - Comprehensive analytics
12. `/profile` - User settings and preferences

## Key Metrics Tracked

- 🌍 **Carbon Footprint**: Measured in kg CO₂
- 💧 **Water Usage**: Tracked in liters
- ⚡ **Energy Consumption**: Monitored in kWh
- 🗑️ **Waste Generation**: Recorded in kg

## Color Scheme

The application uses an eco-friendly color palette:
- Primary: Emerald Green (#10b981)
- Secondary: Cyan (#06b6d4)
- Accent: Amber (#f59e0b)
- Alert: Red (#ef4444)
- Info: Purple (#8b5cf6)

## Getting Started

The application starts on the login page. Use any credentials to access the dashboard.

## Data Flow

1. Users log data through the Data Entry page
2. The app calculates emissions and environmental impact
3. AI analyzes patterns and generates recommendations
4. Progress is tracked against user-defined goals
5. Reports provide comprehensive insights

## Notable Features

- **Real-time Calculations**: Instant emission calculations as you input data
- **Smart Suggestions**: Context-aware recommendations based on usage patterns
- **Gamification**: Earn badges and track achievements
- **Time Machine**: See what could have been with different choices
- **Digital Twin**: Model your home's energy profile

## Project Structure

```
/src
  /app
    /components
      /ui - Reusable UI components
      Layout.tsx - Main app layout with sidebar
    /context
      SustainabilityContext.tsx - Global state management
    /pages - All 12 application pages
    App.tsx - Root component
    routes.tsx - Route configuration
  /styles
    theme.css - Custom theme with eco-friendly colors
```

## Future Enhancements

- Integration with smart home devices
- Social features for community challenges
- AI chatbot for personalized advice
- Mobile app version
- Integration with utility providers for real data
- Carbon offset marketplace
- Team/family tracking features

---

Built with ❤️ for a sustainable future 🌱

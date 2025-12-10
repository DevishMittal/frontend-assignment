# Frontend Developer Assignment 

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **UI Library**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Fonts**: 
    -   *DM Serif Display* (Headers)
    -   *Inter* (Body/Text)
    -   *Manrope* (Body/Text)

## Setup Instructions

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd frontend-assignment
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the application**:
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features Implemented

-   **Replicated Figma Designs**
-   **Interactive Quiz Flow**:
    -   Smooth progression through 4 question steps.
    -   **Animated Progress Bar**: Visualizes completion status smoothly.
    -   **Directional Transitions**: Questions slide in/out based on navigation direction (Next/Prev).
-   **Result Screen with "Slot Machine" Animation**:
    -   Dynamically calculates and displays the final score.
-   **Custom Assets & Styling**:
    -   Usage of SVGs for navigation buttons.
    -   Decorative elements (Cat GIF, Speech Bubble) conditionally rendered on the first screen.
-   **State Management**:
    -   Tracks user answers, current step, and completion status.
    -   Prevents navigation without selection.
    -   Allows "Start Again" to reset the quiz entirely.

## Assumptions Made

-   **Static Data**: The quiz questions and options are currently static. In a real-world scenario, this would likely be fetched from an API.
-   **Responsive Breakpoints**: Design adjustments were made primarily for Desktop but can be made dynamic in future.

## Time Spent

**Total Time**: ~4 Hours


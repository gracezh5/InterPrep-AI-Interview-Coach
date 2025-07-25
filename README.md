# InterPrep - AI Interview Coach

An AI-powered web application to help software engineers ace their technical and behavioral interviews.

**Live Demo Link:** [https://interprep-cc83nor48-graces-projects-08080fc9.vercel.app/](https://interprep-cc83nor48-graces-projects-08080fc9.vercel.app/)

---

<!-- 
  TIP: Add a screenshot of your app here! A good visual makes a huge difference.
  ![InterPrep Screenshot](link-to-your-screenshot.png) 
-->

## The Problem

Preparing for software engineering interviews is stressful and multifaceted. Candidates need to practice behavioral questions, solve complex technical problems, and ensure their resume is perfectly tailored—often with little to no expert feedback.

## The Solution

**InterPrep** is a one-stop-shop that leverages the power of AI to act as a personal interview coach. It provides structured, critical, and actionable feedback across the three most important domains of the job search, giving candidates the confidence they need to succeed.

## Core Features

*   **🤖 Behavioral Prep Gauntlet:** Generate custom behavioral questions based on real-world scenarios. The AI evaluates your answers using the STAR method and provides a brutally honest score and critique from the perspective of a "stern hiring manager."

*   **💻 Technical Challenge Simulator:** Tackle a LeetCode-style data structures and algorithms problem. A "senior engineer" AI persona reviews your code not just for correctness, but for time/space complexity, optimization potential, and code style.

*   **📄 Instant Resume Review:** Get your resume analyzed by a "senior tech recruiter" AI. It provides an immediate score and critical, actionable advice on how to improve your resume's impact and clarity.

*   **🎨 Cohesive Themed UI:** Each tool is styled with a unique, memorable "sticky note" theme to create a polished and intuitive user experience.

## Tech Stack

*   **Framework:** Next.js
*   **Backend & Database:** Convex
*   **Authentication:** Clerk
*   **AI Model:** Google Gemini API
*   **Styling:** Tailwind CSS
*   **UI Components:** Headless UI, Radix UI
*   **Deployment:** Vercel

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/gracezh5/InterPrep-AI-Interview-Coach.git
    ```
2.  Navigate to the project directory and install all dependencies:
    ```bash
    cd InterPrep
    pnpm install
    ```
3.  Create a `.env.local` file in the `apps/web` directory by copying the example:
    ```bash
    cp apps/web/.env.example apps/web/.env.local
    ```
4.  Fill in the required API keys in `apps/web/.env.local` for Convex, Clerk, and the Google AI Studio.

5.  Run the web application:
    ```bash
    pnpm --filter web dev
    ```
The application will be available at `http://localhost:3000`.

## License

This project is licensed under the **Apache License 2.0**. See the `LICENSE` file for details.

// Skill-specific tips. For skills not listed here, a default tip will be provided.
export const skillTips = {
  TypeScript:
    'Convert an existing React project to TypeScript. This small task significantly strengthens your resume.',
  'Next.js':
    'Build a small Next.js project (incorporating routing and data fetching) and deploy it on Vercel.',
  'REST API':
    'Showcase a project that fetches data from a public API (such as GitHub or TMDB), including handling for loading and error states.',
  Docker:
    'Write a Dockerfile for your application and include the "docker run" command in your README.',
  Jest: 'Write 5–6 unit tests for a utility function. Experience with Vitest is also considered equivalent to experience with Jest.',
  'Testing Library':
    'Write a test for a component that covers rendering and user interactions (like clicks), and list "React Testing Library" on your resume.',
  'CI/CD':
    'Set up a GitHub Actions workflow that runs linting, testing, and builds. This project already includes such a setup.',
  Accessibility:
    'Demonstrate the use of semantic HTML, alt text, keyboard navigation, and ARIA labels. Include your Lighthouse accessibility score in the README.',
  'Performance Optimization':
    'Document your Lighthouse score and the optimizations you implemented (e.g., lazy loading, memoization) in the project README.',
  Agile:
    'If you have worked on a team project, describe how you utilized sprints or task boards. If you havent already, try managing a project using Jira or Trello.',
  'Code Review':
    'Submit a small PR to an open-source repository, or review a friend’s code and mention that you’ve done so.',
  Redux:
    'Manage state in a project using Redux Toolkit, and learn to recognize when the Context API is sufficient for the task.',
  GraphQL:
    'Build a mini-project that fetches data from a public GraphQL API (such as the Countries API).',
  Git: 'Use small, meaningful commits and branches on GitHub. Recruiters often look at your commit history.',
};

export const defaultTip = (skill) =>
  `If you know ${skill}, include it in your Skills section and mention it as a bullet point under one of your projects. If you don’t, start by working on a small project or following a tutorial.`;

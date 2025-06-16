# React + TypeScript Mini App

This is a simple React + TypeScript application created as a frontend development task.

The app includes two main features:

- **User Management** – Add, delete, reorder, and sort users by name, position, gender, or age.
- **Developer Jokes** – View developer-themed jokes fetched from a public API, automatically refreshed every 15 seconds
  with a timestamp.

Built with **React**, **TypeScript**, and **Vite**.

## Getting Started

To run this project locally:

**Clone the repository:**  
`git clone https://github.com/vitalijmirnyj/react-ts-miniapp.git`  
`cd react-ts-miniapp`

**Install dependencies:**  
`npm install`

**Start the development server:**  
`npm run dev`

The app will typically be available at http://localhost:5173 by default.

## Testing

Tests are written using **Vitest** and **React Testing Library**.

**To run tests:**  
`npx vitest`

**To run in watch mode:**  
`npx vitest --watch`

### Tested features

- Rendering existing users in the table
- Showing error message if form is submitted with empty fields
- Adding a user when form fields are filled correctly

**Install test dependencies (if missing):**  
`npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`

Global setup is in:  
`src/setupTests.ts`

Test config is in:  
`vite.config.ts`
`vite.config.ts`
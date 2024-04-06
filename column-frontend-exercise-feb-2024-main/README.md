# Column Frontend Exercise

Your task is to create a public notice search application using React. The application should allow users to search for a notice by title and display relevant information. The primary goal is to demonstrate your proficiency in React, state management, and asynchronous data fetching via Firestore.

Implementation of the exercise should take no more than 3 hours. Feel free to look up documentation and API references, but please work on the solution on your own.

To complete this exercise you will need a level of familiarity with the following libraries:

- [React](https://react.dev/)
- [Firebase Firestore SDK](https://firebase.google.com/docs/firestore/query-data/get-data)
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting started

1. Download this repository
2. Install dependencies with `npm install`
3. Start the development server and Firebase emulators with `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view the application
5. Open [http://localhost:4000](http://localhost:4000) to view the Firebase emulator UI

## Preconfigured Data and Tools

### Firebase Emulator

When the application starts, the Firestore emulator will also start and the notice data will be available via the Firestore SDK which has been preconfigured in `src/db.js`. For general documentation on using the Firestore SDK, see the [Firestore documentation](https://firebase.google.com/docs/firestore/query-data/get-data).

Each notice document has the following fields:

- `title` (string) - The title of the notice
- `publicationDate` (timestamp) - The date of publication
- `content` (string) - The content of the notice

### Test Suite

The project is preconfigured with Jest and React Testing Library. You can run the test suite with `npm test`.

## Requirements

Using any development environment you are comfortable with, complete the requirements below. You can use any additional libraries or tools you prefer. Use Git to track your progress and commit your work as you go.

### Search UI

- [ ] The dashboard should display a search input and a list of notices
- [ ] The search input should allow users to search for notices by title. Search input should be debounced by 500ms. (Note that Firestore does not support full-text search, so results will be based on exact matches.)
- [ ] The list of notices should be sorted by date of publication in descending order
- [ ] The list of notices should display the title, date of publication, and content preview
- [ ] The list of notices should be paginated with 10 notices per page
- [ ] Handle loading and error states gracefully
- [ ] Design a visually appealing and responsive layout for the dashboard. You can use any CSS framework or library of your choice, or write your own styles.

### Testing

- [ ] Write tests for the components and utilities in the application

### Bonus (Optional)

- [ ] Add a filter to search by date of publication
- [ ] Add routing to view a single notice
- [ ] Add a form to add new notices with a title, publication date, and content

## Submission

When you have completed the exercise, please provide a link to view or download your repository in reply to Monique. If you have any questions or need clarification on the requirements, please reach out to your contact at Column.


# Internship Coding Take Home: Course Catalog Prototype

You'll be building a React application that displays a course catalog.

To get started, [fork the starter CodeSandbox](https://codesandbox.io/s/react-challenge-oy21b).

## Primary Objectives

1. Render a catalog of course cards. Each card shows its course's image and title. Use the provided courses in `src/courses.js`.
2. Organize the cards into a three column grid.
3. Each course has tags, list all of them above the catalog
   - List of tags should be generated from the tags that exist on the courses
   - Tags should be sorted alphabetically
   - Tags should list the number of times they appear in all the courses
4. When a tag is clicked, show only the courses with that tag. Only one tag can be selected at a time; clicking a selected tag will show all courses.
5. Lay out the page to match the included `wireframe.png` and add some styles.
   - NOTE: Read bonus objective #3 before completing this task

## Bonus Objectives

> Note: We recommend choosing one or two of these that best display your skills instead of trying to do all of them.

1. Show the course author name under the course titles on the cards.
   - Course authors must be fetched asyncronously from an endpoint in `src/fetchAuthorData.js`.
2. Make the grid and tags list responsive
3. Use your CSS skills to redesign the page, add animations, or any other changes you think would improve the user experience.

# Link Sharing App

## Overview

This is a link sharing application built using Vite, React, TypeScript, and Supabase. The application allows users to manage and share their social media links effectively.

## Features

- **Authentication**: Users can securely register and log in using their email. Authentication is handled by Supabase.
- **Link Management**: Users can add up to 5 links to their social media accounts. Each link can be previewed in a mocked mobile phone format and tested for functionality. Users can also view a list of their added links and remove them if necessary.
- **Profile Management**: Users can add a profile picture, their first name, last name, and change their email. Upon changing the email, the user receives an email from Supabase to handle the email change. The profile details can also be previewed in a mocked mobile phone format.
- **Form Validation**: All form validation in the app is handled by Zod.
- **Preview and Share**: Users can preview their profile and links, and choose to share the preview by clicking the "share link" button, which copies the URL to their clipboard. If they are not happy with the preview, they can go back to their editor by clicking the "back to editor" button.
- **Logout and Navigation**: The application includes a logout button and a preview tab in the navbar. There is also a landing page that redirects logged-in users who navigate to the "/login" or "/register" page to a "/logout" page.

## Getting Started

1. Clone the repository
2. Install the dependencies using `npm install`
3. Create a `.env` file in the root directory and add your Supabase URL and API key:
   VITE_SUPABASE_URL=<Your Supabase URL> VITE_SUPABASE_API_KEY=<Your Supabase API Key>
4. Start the development server using `npm run dev`
5. Visit `http://localhost:5173` in your browser

## Database Schema

The application uses a Supabase database. Here is an image of the database schema:

![Database Schema](public\dbSchema.png)

## Deployment

The application is deployed on Netlify. The link to the live application is provided in the repository description.

## Continuous Integration/Continuous Deployment (CI/CD)

A GitHub workflow is set up for this project to rebuild the application whenever there is a push to the main branch. The workflow configuration is located in `.github/workflows/main.yml`.

## Future Improvements

- Make the page responsive
- Add an edit functionality to the links page

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Design Acknowledgement

This application's design is based on a modified [Frontend Mentor Figma](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT) design. The original design has been tweaked to fit the requirements of this project.
All icons are from [iconify](https://icon-sets.iconify.design/).

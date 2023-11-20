#### Your challenge is to build out this link-sharing app and get it looking as close to the design as possible.

[The Design](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT)

# Your users should be able to:

- [] Create, read, update, delete links and see previews in the mobile mockup
- [] Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform
- [] Drag and drop links to reorder them
- [] Add profile details like profile picture, first name, last name, and email
- [] Receive validations if the profile details form is saved with no first or last name
- [] Preview their devlinks profile and copy the link to their clipboard
- [] View the optimal layout for the interface depending on their device's screen size
- [] See hover and focus states for all interactive elements on the page
- [] Bonus: Save details to a database (build the project as a full-stack app)
- [] Bonus: Create an account and log in (add user authentication to the full-stack app)

# Expected behavior

## Links

- [] Clicking "Add new link" should add a new repeater, enabling users
  to select a platform and add a link.
- [] Newly added links should be immediately visible in the mobile
  mockup illustration, even before saving the form.
- [] When the user clicks "Save," the form should validate the presence of
  a URL and check if the URL pattern is correct for the chosen platform.
- [] Users should be able to rearrange links by clicking and holding the
  two-line hamburger icon in the top left of each link repeater.
- [] On tablet and mobile layouts, the mobile mockup illustration isn't
  initially shown. Users must click through to the preview page to see
  their profile. You can explore alternative UX designs if you want to
  include the mobile mockup illustration for mobile and tablet devices.

## Profile Details

- [] First name and last name are mandatory fields. If a user lacks a
  profile picture or email address, consider removing unnecessary
  profile elements from the mobile mockup or displaying the user's
  initials within the profile picture circle.
- [] You can utilize Web APIs, such as FileReader, to handle image
  uploads. For the front-end, client-side processing is an option. If
  you're building a full-stack app, consider integrating with a media
  hosting service like Cloudinary and safeguard your API credentials
  securely.

## Preview

- [] Clicking "Share Link" should copy the current URL to the user's
  clipboard and display the relevant toast message as depicted in the
  design.
- [] If the project is developed as a full-stack app, ensure that only the
  current user can see the header with "Back to Editor" and "Share Link"
  call-to-actions if they match the profile user. If there's a mismatch,
  the header should disappear, and access to the admin area should
  be restricted.

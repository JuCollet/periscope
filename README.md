# Periscope

A simple photo manager build with React & Redux

[periscope.herokuapp.com](https://periscope.herokuapp.com)

***

## What's this ?

This is a personnal project made during learning ReactJS and Redux.

## Project main features

- Upload JPEGs & PNGs by drag'n'drop.
- Files are automatically resized & sent to AWS S3.
- Search for albums or photos with keywords tags.
- Simply share a file by email from the interface.
- Invite a friend to collaborate with optionnals update/delete restrictions.
- Code snippets to embed photos in blogs or other webstites.
- Fully responsive interface.

## Security

- Automatically redirect http traffic to https server.
- Passwords are hashed with BCrypt before beeing stored in the DB.
- Authentification made by Passport with Json Web Tokens & Local Storage.

## Performance

- Code splitting with webpack (app code & vendors files).
- Extracted css file with webpack.
- Images < 20kb are encoded in base64 and put in bundle file.

## Compatibility

- Polyfill used to make this app fully functionnal on IE11+.
- Using premailer & best practices for emailings, to render correctly on all major emails clients (tables, inline styles, fallbacks to few issues with Outlook like background images,...).

## Used technologies

This app didn't use any framework for UI nor any other javascript libraries than ReactJS.

- ReactJS
- ReactCSSTransitionGroup
- React-Router
- Redux
- Webpack 2
- NodeJS
- Express
- Passport
- JWT
- Less
- Babel
- Git

## Tools & providers

- Cloud9 IDE
- AWS S3
- Heroku
- mLab
- Sendgrid
- Github
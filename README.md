# Inbox(Email) Application

## Description
Build a simple email inbox application
- User should be able to login / logout.
  Email should end with "@hometask.com" for validation checking
- User should be able to see the list of emails in the inbox and click one of them to see the content in HTML format
- User should be able to send a new email (@hometask.com) with validation checking
  Title and Description (HTML content)
- User should be able to mark the emails READ or UNREAD and move to / recover from trash bin
- User should be able to search through email based on user's name, title or content.
- User should be able to reply to the emails
  The emails within the same thread should be grouped and displayed as one in the list
- User should be able to filter out by READ or UNREAD status

## Challenge
- Should be able to use websocket to send and recive emails
- Should be able to render html format in inbox page

## Environment
- Windows 11
- Node v16.14.0
- Npm 8.3.1

## Tech stacks
- Vite + React + Typescript
- Express
- Postgres + pg

## Steps to run program
1. Install node modules
   ```shell
   npm install
   ```

2. Run project
   ```shell
   npm run dev
   ```
This will host the project on http://localhost:3000. 
# EBA Web Development Overview Doc 

![vercel banner](./frontend/app/public/powered-by-vercel.svg)

## Table of Contents

- [Overview](#Overview)
- [Frontend Structure](#FrontendStructure)
- [Backend Structure](#Backend-Structure)
- [Workflow](#Workflow)
- [Contentful CMS](#Contentful-CMS)

## Overview

Stack 

- Next JS (migrating to typescript)
- Koa.ts
- Python Flask
- PostgresQL

Hosting services 

- Vercel
- Supabase
- Railway

Changes:
Readded Flask for web tools (07/12/2023)
Switched from Nest JS to Koa TS (06/17/2023)
Removed Python Flask (05/29/2023)
Introduced Nest JS (05/29/2023)
Migrated MySQL db to Postgres (05/29/2023)

### Starting Frontend and Backend Dev Server

To start the frontend development server, `cd` into `frontend/app`. Then run `npm install` to install dependencies and then `npm run dev` to start the frontend.

To start the backend development server, `cd` into `backend`. Then run `npm install` to install dependencies and then `npm start` to start the backend.

To start the historical markup tool, `cd` into `tools` and run `source /venv/bin/activate` for Mac or `/venv/Scripts/activate.bat` for windows to active the virutal environment. Then run `pip3 install -r requirements.txt` to install dependencies and then `flask run`



### Common Errors

#### Frontend

If you do not have a file that begins with `.env`  in the `frontend/app` directory, you can request it from the frontend team. This file is necessary to access the CMS.

#### Backend
If you do not have a file that begins with `.env.local` in the `backend` directory, you can request it from the backend team. This file is necessary to access the Postgres database.

#### Tools
If you are on VSCode and the error `Import <package> could not be resolved`, use `Ctrl` (or `Cmd`) + `Shift` + `P` to open the Command Palette. Then type **Python: Select Interpreter** and select **Python 3.7.6** to resolve the errors.

## Frontend Structure



### Components



#### Content

`Content` holds all components that will render data from the CMS. These components are not be designed for a specific page, rather they are developed based on the context of CMS data and how it should be represented.

#### TempData

Testing data for components that do not have data yet



#### Utils

`Utils` contains major components that structure the entire application. Their main purpose is to establish visual uniformity across the app and should not be designed to use large amounts of data.  The `Navbar` and `Footer ` components are some examples of util components. Testing/logging components will be in this directory for the time being.



### Pages

`pages` contains all pages for the application. `index.js` marks the home page in the root directory or any subdirectory. To leanr more about how pages and routing work, read this [link](https://nextjs.org/docs/routing/introduction)



### Lib

`lib` strictly contains js files only. `lib` files are page specific, and each file returns multiple functions that get data from the CMS for their corresponding file in `pages`. Thus, a good indicator of whether or not a file should be in the `lib` directory or in another directory is whether the file returns `jsx` or just raw data.



### Public & Styles

All images and documents need to be in the `public` directory. We most likely will not need to modfiy `styles` thanks to our UI library



## Backend Structure

### Providers

`providers` contain all the files to connect to and interact with external services such as the Postgres database.

### Routes

`routes` contain all the files to handle endpoints consumed by the frontend

### Supabase

`supabase` contains general purpose files to interact with the Postgres database on Supabase

### Types

`types` includes all the types for the application



## Workflow
- Assign yourself to an issue / request to be assigned to one
- Create a branch off of 'development' with a standard number + issue title, for example "21-react-tabes"
- Work on a new branch, then open a PR after testing
- Assign Patrick/Dhreeti as reviewers
- Issue will be approved and merged into the development branch
  - If there are any issues, they will be left in the comments of that specific PR. Address and push changes
- Dev branch will be merged into main biweekly
- Regression testing weill happen during a meeting biweekly
  - Members will test certain features of the website and report any issues on Github
  - Self-assign issues at the end


### Frontend

**Important Branches**

- `main`: production ready code, should never be modified directly
- `development`: Used for testing and seeing how new features fit in. In the future, we will have another intermediary branch between `main` and `development` to ensure that merging into a mock main branch does not break the app.



1. Branch off of development and name your branch based off of the taskboard id and the task itself. Ex: `01-create-content-slider`
2. Make commits frequently. When the feature is ready to be tested, merge the files into `development` to test.
3. Once feature is finalized, submit a PR to merge from `development` into `main`.



### Backend

**Important Branches**

- `main`: production ready code, should never be modified directly
- `development`: Used for testing and seeing how new features fit in. In the future, we will have another intermediary branch between `main` and `development` to ensure that merging into a mock main branch does not break the app.

1. Refer to frontned workflow list for now, backend workflow is currently being set up

Notes:
We are currently looking into pythonanywhere CLI's where we can deploy from our CLI rather than having to physically go to the homepage and upload files manually. For now, we will manually move code into pythonanywhere every week and 24 hours before our next meeting.  



## Contentful CMS

### Sections Overview



#### Content Model

Data fields are defined in the content model. Each content model **is required** to have the following fields. Read the next section to see how to properly write a slug and a title.

- `slug`
- `title`

Notes:

1. Make sure to mark required fields as required when modeling content.

2. When a content model needs an image, use a `reference` field and mark `Image` as the only accepted reference. You will add the images to the `Image` content model later and refer to it through the current content model you are creating.

3. In addition to the above, you can and should use `references` to refer to any other content models. This is extremely helpful for complex models such as the `Accordion` content model.

4. Avoid nesting content more than 10 levels deep. The free plan only allows us to resolve up to 10 levels deep, and deeper levels will have to be resolved manually. Example of a 5-level nested component:

   ```javascript
   items: { // level 1
     names: [ // level 2
       firstName: "Something" // level 3
       lastName: "Something" // level 3
       contactInfo: { // level 3
       	phone: { // level 4
       		mobile: "1231231234" // level 5
       		home: "1231231234" // level 5
       	}
       }
     ]
     otherInfo: "Something" // back to level 2
   }
   
   ```

5. For rich text fields, use a WYSIWYG field.



#### Content

**IMPORTANT** follow the spec and read the examples to properly name the components so that the frontend can properly retreive the data.

- `slug`: \<specific page> + \<title>.
  -  Ex: '**Home** Project Affiliations & Sponors',  '**Home** Student Contributors Accordion', ' **Support** Donation Form', '**Artifacts Exhibition** Overview Card'.
- `title`: Description of content. 
  - Ex: 'Project Affiliations & Sponsors' or Student Contributors Accordion'

Notes:

1. Content contains all **page specific** content.
2. We will use **content models** to populate the content with finalized data. Save and publish when done.
3. To ensure code functionality and visual integrity is still maintained after changes are made, double check the production site. Every change is live!
4. Once the CMS becomes full of data, it can start to get difficult to navigate through the content. Use the provided filters to find your component!
5. **Please notify the frontend team if any error shows up or if the data you added does not show up. The team will let you know if 1) The component has not been coded yet, 2) The content model fields have changed and has not been updated on the frontend, or 3) The CMS data needs to be double checked for errors/typos  **



### How to Add Data

#### Add New Content Models and Content

1. In content model, click **Add content type**
2. You will be presented with three fields. Name the content something meaningful (the second api identifier field will automatically update as you type)
3. Add a description (optional)
4. Once that is done, you can start adding data fields. Click **Add field** to select a field that best fits the data you want to add.
5. You can then customize this field. Give it a name and fill out the fields. Only check the `List` field if you need to have multiple values for this field.
6. When finished, click **Create and configure** to configure how the field will be used. Here, you can make the field required, have specific patterns, or choose what it can reference (only for reference fields). Remember, a content model must have a `title` fields and a `slug` field.
7. Repeat steps until the model is finished.
8. Save and go to the **content** tab.
9. Click **Add Entry** and select the content model you just created.
10. Fill out all the fields and click **Publish** to finalize the changes. Remember to follow the naming conventions for `title` and `slug` fields



#### Add Existing Content 

Follow steps 8-10.
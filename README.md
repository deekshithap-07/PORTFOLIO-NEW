# Online Student Portfolio

**Project code:** B12  
**Student:** Deekshitha P  
**Project type:** Cloud Computing Lab mini-project

## Project objective

This project creates and hosts a student's personal portfolio online. It presents education, technical skills, internship experience, projects, certifications, leadership experience, resume access, and contact information in a responsive single-page website.

## Features

- Premium, responsive single-page portfolio design
- Sticky navigation with active section state
- Mobile hamburger menu
- Hero section with CSS technology visual
- About, education, skills, experience, projects, certifications, leadership, resume, and contact sections
- Four project cards with JavaScript-powered detail modals
- Modal close button, outside-click close, and Escape-key close
- Client-side contact form validation and success message
- Scroll reveal animations with reduced-motion support
- Resume view and download links wired to `assets/resume.pdf`
- No invented project URLs, certification records, statistics, or LinkedIn URL

## Technologies used

- HTML5
- CSS3
- Vanilla JavaScript

This is a static website. It does not use React, Vite, Node.js, a frontend framework, a database, or a backend.

## Project structure

```text
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── resume.pdf
```

The original resume is included at `assets/resume.pdf`. The View Resume and Download Resume buttons use that file directly.

## How to run locally

Because this is a static site, it can be opened directly in a browser. A local HTTP server is recommended because browsers handle relative assets more consistently over HTTP.

### Option 1: Python

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

### Option 2: VS Code Live Server

Open the folder in VS Code and start Live Server on `index.html`.

## How to save and run the project offline

To keep a copy on your computer:

1. Download the complete project folder from Replit using the workspace's **Download as ZIP** option.
2. Extract the ZIP file into a normal folder, such as `Deekshitha-Portfolio`.
3. Keep the folder structure unchanged, especially `assets/resume.pdf`.

You can open `index.html` directly by double-clicking it. The portfolio sections, styling, project modals, navigation, and contact-form validation work without an internet connection.

For the most reliable offline experience, run the included local static server:

```bash
cd Deekshitha-Portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Stop the server with `Ctrl+C`.

If Python is not installed, use VS Code's Live Server extension or any other simple static-file server. No database, Node.js installation, or internet connection is required to run the project locally.

## How to run and host on Replit

1. Create a new Replit project using the HTML/CSS/JS or static website template.
2. Add `index.html`, `style.css`, and `script.js` to the project root.
3. Create an `assets` folder and add the original resume as `assets/resume.pdf`.
4. Start the project with a static web server. For example, the shell command can be:

   ```bash
   python3 -m http.server 8000
   ```

5. Use Replit's Run or Publish flow to make the site available through a public URL.

## How to deploy with GitHub Pages

1. Create a GitHub repository.
2. Commit and push the project files to the repository's default branch.
3. Confirm that `assets/resume.pdf` contains the original resume.
4. In the repository, open **Settings → Pages**.
5. Choose **Deploy from a branch**, select the default branch and the root folder, then save.
6. GitHub Pages will provide a public URL for the portfolio after the deployment finishes.

The site uses relative links, so it is compatible with GitHub Pages project URLs.

## Cloud computing concept

The project demonstrates static cloud hosting:

```text
Student Portfolio Code
        ↓
Git / GitHub
        ↓
Cloud Hosting
        ↓
Public URL
        ↓
Users access portfolio through the Internet
```

The HTML, CSS, JavaScript, and PDF are stored as deployable files. A cloud hosting platform serves those files from its infrastructure so users can access the portfolio without running a local development environment.

## Advantages

- Accessible from any internet-connected device
- Simple deployment and maintenance
- Low hosting complexity for a static website
- Responsive experience across desktop, tablet, and mobile
- Easy version control through Git and GitHub
- No server-side maintenance or database required

## Future enhancements

- Connect the contact form to a backend or email service
- Add verified LinkedIn profile URL
- Add project links when live repositories or demos are available
- Add analytics for visitor insights
- Add a lightweight CMS or database if portfolio content needs frequent updates
# ModernTech Solutions HR Portal

## Project Title & Description

ModernTech Solutions HR Portal is a front-end proof of concept HR application designed for non-technical HR staff. It provides a polished interface for employee data management, payroll and payslip generation, and leave tracking using modern browser technologies.

## Key Features Implemented

- Employee Data Management
- Automated Payroll / Payslip generation
- Leave & Attendance Tracking

## Tech Stack Used

- Vue.js
- Bootstrap 5
- LocalStorage
- JavaScript
- HTML5
- CSS3

## Setup & Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-user/moderntech-hr-portal.git
   ```

2. Open the project folder:
   ```bash
   cd moderntech-hr-portal
   ```

3. Serve the project with a local static server. **Do not** open `index.html` by double-clicking it — the app uses ES modules (`<script type="module">`), which browsers block when loaded directly from the filesystem (`file://`). Use one of:
   - VS Code "Live Server" extension → right-click `index.html` → "Open with Live Server"
   - Or, with Python installed: `python -m http.server 8000`, then visit `http://localhost:8000`
   - Or, with Node installed: `npx serve .`

4. The application runs fully client-side (Vue 3 and Bootstrap 5 loaded via CDN, no build step or install required) and uses `localStorage` for persistence between visits.

## Target Audience

This HR portal is built for non-technical HR staff who need a simple, clean interface for employee directory management, payroll review, and leave request handling.

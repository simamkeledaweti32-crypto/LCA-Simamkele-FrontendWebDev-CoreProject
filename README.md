# ModernTech Solutions HR Portal

## Project Title & Description
ModernTech Solutions HR Portal is a front-end proof-of-concept web application designed for non-technical HR staff. It provides a polished, responsive interface for employee data management, payroll and payslip generation, and leave/attendance tracking. The application uses only client-side technologies and dummy data, with data persistence via localStorage.

## Key Features Implemented
- **Employee Data Management**: Browse, view, and add new employee records with form validation
- **Automated Payroll / Payslip Generation**: Calculates Gross Salary, 18% Tax, R500 Deductions, and Net Salary
- **Leave & Attendance Tracking**: Submit leave requests and Approve/Deny them. Includes Clock In/Out to update attendance
- **Data Persistence**: All employee and leave data is saved in browser localStorage and persists after page refresh
- **Dashboard & Analytics**: Real-time stats for total employees, pending leave requests, and top attendance
- **Responsive UI**: Fully responsive design using Bootstrap 5. Works on Mobile, Tablet, and Desktop
- **User Feedback**: Success and error messages for all user actions

## Tech Stack Used
- **Vue.js 3**: Reactive framework for state management and UI updates
- **Bootstrap 5**: For responsive layout and styling
- **JavaScript ES6**: Core application logic
- **HTML5 & CSS3**: Structure and styling
- **LocalStorage**: Client-side data persistence
- **GitHub**: Version control and project hosting

## What's New in Resubmission
Based on lecturer feedback, the following critical features were added:

1. **Data Persistence**: Implemented `localStorage` with Vue `watch`. Employee and leave data now saves and loads automatically.
2. **Payroll Calculations**: Implemented real payroll logic. Payslips now show Tax, Deductions, and Net Salary instead of just `Monthly * 12`.
3. **Leave Management Logic**: Added working Approve and Deny buttons that update request status and dashboard counters in real-time.
4. **Attendance Tracking**: Added "Clock In/Out" button to simulate updating employee attendance rate.
5. **Form Validation**: Added validation to prevent adding employees with empty fields and shows user feedback messages.
6. **Demo Video**: Recorded new 7-8 minute video with audio walkthrough of all features.

## Target Audience
This HR portal is built for non-technical HR staff at ModernTech Solutions who need a simple, clean, and centralized interface for managing employee directory, payroll review, and leave request handling without relying on multiple spreadsheets.

## Setup & Installation Instructions
The app uses ES modules and must be run on a local static server. Do not open `index.html` by double-clicking.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/simamkeledaweti32-crypto/LCA-Simamkele-FrontendWebDev-CoreProject

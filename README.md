# iSchool Management System (iSMS) - Development Plan

**Tech Stack:** React (Vite), Tailwind CSS, Zustand, React Router
**Timeline:** 5 Weeks

## 0. Technical Prerequisites
Before starting Phase 1, ensure your environment is ready.

- [ ] Install Node.js (Latest LTS version)
- [ ] Install VS Code and recommended extensions (ES7+ React Snippets, Tailwind CSS IntelliSense)
- [ ] Set up Git configuration (`git config --global user.name` & `user.email`)
- [ ] Create a GitHub repository for the project

---

## Phase 1: Foundation & Architecture (Week 1)
**Goal:** Initialize the project, set up the design system, and implement the authentication skeleton.

### Step 1.1: Project Initialization
- [ ] Initialize project using Vite: `npm create vite@latest isms -- --template react`
- [ ] Clean up default Vite boilerplate (remove default logos and `App.css` code)
- [ ] Install dependencies: `npm install react-router-dom zustand lucide-react clsx tailwind-merge`
- [ ] Initialize Tailwind CSS: `npx tailwindcss init -p`
- [ ] Configure `tailwind.config.js` to scan your file paths
- [ ] Add Tailwind directives (`@tailwind base;`, etc.) to `index.css`
- [ ] Commit initial setup to GitHub

### Step 1.2: Directory Structure & Layouts
- [ ] Create folder structure: `/components`, `/pages`, `/store`, `/layouts`, `/data`, `/assets`
- [ ] Create `Layout.js` (Main wrapper with Sidebar and Header areas)
- [ ] Create `Sidebar.js` (Navigation component)
- [ ] Create `Header.js` (User profile and Logout button)
- [ ] Implement responsive layout grid (Sidebar fixed on left, Header fixed on top)

### Step 1.3: Global State Management (Zustand)
- [ ] Create `store/useAuthStore.js`
- [ ] Implement `login` action (updates state to `isAuthenticated: true`)
- [ ] Implement `logout` action (clears user state)
- [ ] Define user roles in state (Super Admin, Regional Admin, School Admin, Teacher, Parent, etc.)

### Step 1.4: Routing & Authentication
- [ ] Setup `react-router-dom` in `App.js`
- [ ] Create `pages/auth/Login.js` with a form for username/password
- [ ] Add a temporary "Role Selector" dropdown in Login for testing different user views
- [ ] Create `components/ProtectedRoute.js` to restrict access based on roles
- [ ] Verify that non-logged-in users are redirected to Login

---

## Phase 2: Core Dashboards & Administration (Week 2)
**Goal:** Build the high-level views for Ministry and School Admins and enable Learner Management.

### Step 2.1: Super Admin & Regional Dashboards
- [ ] Create `pages/dashboard/SuperAdminDashboard.js`
- [ ] Build "Quick Stats" cards (Total Schools, Learners, Regions)
- [ ] Create `pages/dashboard/RegionalAdminDashboard.js`
- [ ] Create `data/mockData.js` with dummy data for schools and regions
- [ ] Connect Dashboards to `mockData.js` to render dynamic charts/lists

### Step 2.2: School Admin Dashboard
- [ ] Create `pages/dashboard/SchoolAdminDashboard.js`
- [ ] Build "School Overview" widget (Teachers present, Learners absent)
- [ ] Implement "Announcements" section on the dashboard

### Step 2.3: Learner Management Module (CRUD)
- [ ] Create `store/useLearnerStore.js` to handle learner state (add/edit/delete)
- [ ] Create `components/LearnerList.js` (Data table with mapping)
- [ ] Add "Search" and "Filter by Grade" functionality to the list
- [ ] Create `pages/learners/LearnerForm.js` for adding new students
- [ ] Create `components/LearnerProfile.js` for viewing individual student details
- [ ] Test the full flow: Add a student -> See them in the list -> Click to view details

---

## Phase 3: Specialized Role Portals (Week 3)
**Goal:** Implement specific functional areas for support staff and daily operations.

### Step 3.1: Academic Operations (Teachers & Attendance)
- [ ] Create `pages/dashboard/TeacherDashboard.js`
- [ ] Create `components/attendance/AttendanceForm.js` (List of students with checkboxes)
- [ ] Implement `toggleAttendance` logic in a new `useAttendanceStore.js`
- [ ] Create `components/attendance/AttendanceReport.js` to show summary (e.g., "95% Present")

### Step 3.2: Parent & Learner Portals
- [ ] Create `pages/dashboard/ParentDashboard.js`
- [ ] Build "Child Selector" (if parent has multiple kids)
- [ ] Display child's specific attendance and basic mock grades
- [ ] Create `pages/dashboard/LearnerDashboard.js`
- [ ] Display "My Timetable" and "My Homework" sections

### Step 3.3: Support Services
- [ ] Create `pages/dashboard/ReceptionDashboard.js` (Visitor Log form)
- [ ] Create `pages/dashboard/LibrarianDashboard.js`
- [ ] Build "Book Inventory" table for Librarian
- [ ] Create `pages/dashboard/AccountsDashboard.js`
- [ ] Build "Fee Status" table (Green badge for Paid, Red for Pending)

---

## Phase 4: Intelligence & UI Polish (Week 4)
**Goal:** Add the AI Chatbot mock and refine the User Experience.

### Step 4.1: iZITO Chatbot (Mock AI)
- [ ] Create `components/chatbot/ChatButton.js` (Floating action button)
- [ ] Create `components/chatbot/ChatWindow.js` (The message interface)
- [ ] Implement "Language Toggle" inside the chat (English, Oshiwambo, Afrikaans, etc.)
- [ ] Write logic to handle keywords (e.g., if input contains "enroll", return policy text)
- [ ] Add "Pre-set Questions" buttons (e.g., "How do I reset my password?")

### Step 4.2: Data Integration & Realism
- [ ] Expand `mockData.js` to include realistic Namibian school names and regions
- [ ] Ensure `Sidebar.js` links change dynamically based on the logged-in role
- [ ] Create `components/common/RoleBadge.js` to visually distinguish users in lists

### Step 4.3: Responsive Design
- [ ] Test Sidebar on mobile (implement hamburger menu toggle)
- [ ] Ensure all Data Tables allow horizontal scrolling on small screens
- [ ] Verify that forms stack vertically on mobile devices

---

## Phase 5: Testing, Deployment & Documentation (Week 5)
**Goal:** Ensure the system works across all roles and deliver the final product.

### Step 5.1: Cross-Role Testing
- [ ] Log in as **Super Admin**: Verify access to all regional stats
- [ ] Log in as **School Admin**: Verify inability to see other schools' data
- [ ] Log in as **Teacher**: Verify access to only assigned classes
- [ ] Log in as **Parent**: Verify access to only own child's data
- [ ] Log in as **Reception/Librarian**: Verify limited access to specific dashboards

### Step 5.2: Final UI Polish
- [ ] Create `components/common/LoadingSpinner.js` and use it during "data fetching" (simulated timeouts)
- [ ] Implement Toast Notifications for actions (e.g., "Attendance Saved Successfully")
- [ ] Standardize font sizes and button colors using Tailwind utility classes

### Step 5.3: Deployment & Handoff
- [ ] Create a Vercel account (if not already done)
- [ ] Connect GitHub repo to Vercel and deploy
- [ ] Verify the live link works on both Desktop and Mobile
- [ ] Write `README.md` with instructions on how to run the project
- [ ] Prepare screenshots for the Capstone submission
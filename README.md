# 🏫 iSchool Management System (iSMS) - Frontend Capstone Project

## 🎯 Project Overview

**iSMS** is a comprehensive, multi-tier digital platform designed to address critical management and resource distribution challenges faced by Namibia's Ministry of Education, Arts and Culture. The system aims to streamline all school operations, from learner admissions and attendance to financial tracking and stakeholder communication, replacing paper-based processes with a seamless, digital experience.

This repository contains the **Frontend Capstone Implementation** built with React.js.

---

## 💡 The Problem Solved

Namibia's Ministry of Education struggles with centralized management, resource traceability, and efficient learner admissions (leading to parents camping at schools or children starting late). iSMS provides a unified system to:

1.  **Streamline Admissions:** Facilitate remote learner registration via online platform and offline SMS.
2.  **Ensure Resource Traceability:** Provide clear visibility into resource and fund allocation across regions and schools.
3.  **Improve Data Accuracy:** Digitize attendance, performance, and HR records for better decision-making.

---

## ✨ Features Implemented (Capstone Scope)

The Capstone implementation focuses on demonstrating the core role-based functionality and key modules:

### 1. Multi-tier User Authentication & Role Management
The system supports distinct portals for all major stakeholders, ensuring strict access control:
* **Ministry Level:** Super Admin, Regional Admin
* **School Level:** School Admin, Teachers, Reception, Librarian, Accounts
* **Stakeholders:** Parents, Learners

### 2. Core Operational Modules
| Module | Key Functionality | Primary User |
| :--- | :--- | :--- |
| **Learner Management** | Registration, Profile Management, Class Assignment. | School Admin |
| **Admission/Enrollment** | Remote online/offline (SMS) registration flow. | Parents |
| **Attendance** | Daily attendance recording and basic reporting. | Teachers |
| **School & Class Mgmt** | School Information Display, Class/Section setup, Teacher Assignment. | School Admin |

### 3. Specialized Portals
* **Parent Portal:** Monitor child's attendance and basic information.
* **Teacher Portal:** Classroom and learner management dashboard.
* **Accounts Portal:** Basic fee management interface.

### 4. AI-Powered Chatbot
* **iZITO:** Placeholder component for a future AI-Agent designed to answer common inquiries and provide policy information (with planned multi-language support).

---

## 🛠️ Technology Stack (Frontend)

* **Framework:** React.js (Functional Components & Hooks)
* **State Management:** React Context API
* **Routing:** React Router
* **Styling:** Custom CSS (CSS Grid and Flexbox for responsive design)
* **Icons:** React Icons
* **Design Tool:** Figma (Mockups)

### Development APIs
* **Mock Backend:** JSON Server / Local JSON files
* **Data Persistence:** Browser Local Storage

---

## 📂 Repository Structure

The project follows a standard React application structure to ensure clarity and maintainability:

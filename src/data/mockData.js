// Namibian Regions
export const regions = [
  { id: '1', name: 'Khomas', schools: 45, learners: 28500, teachers: 1250 },
  { id: '2', name: 'Erongo', schools: 32, learners: 18200, teachers: 820 },
  { id: '3', name: 'Oshana', schools: 38, learners: 22400, teachers: 980 },
  { id: '4', name: 'Omusati', schools: 42, learners: 25600, teachers: 1100 },
  { id: '5', name: 'Ohangwena', schools: 35, learners: 21800, teachers: 950 },
  { id: '6', name: 'Kavango East', schools: 28, learners: 16500, teachers: 720 },
  { id: '7', name: 'Kavango West', schools: 22, learners: 13200, teachers: 580 },
  { id: '8', name: 'Zambezi', schools: 18, learners: 10800, teachers: 480 },
  { id: '9', name: 'Kunene', schools: 15, learners: 8500, teachers: 380 },
  { id: '10', name: 'Hardap', schools: 12, learners: 7200, teachers: 320 },
];

// Schools
export const schools = [
  { id: '1', name: 'Windhoek High School', region: 'Khomas', type: 'Secondary', learners: 1250, teachers: 48 },
  { id: '2', name: 'Jan Möhr Secondary School', region: 'Khomas', type: 'Secondary', learners: 1100, teachers: 42 },
  { id: '3', name: 'Concordia College', region: 'Khomas', type: 'Combined', learners: 980, teachers: 38 },
  { id: '4', name: 'Oshakati Secondary School', region: 'Oshana', type: 'Secondary', learners: 1400, teachers: 52 },
  { id: '5', name: 'Rundu Secondary School', region: 'Kavango East', type: 'Secondary', learners: 1200, teachers: 45 },
];

// Announcements
export const announcements = [
  {
    id: '1',
    title: 'Term 2 Examinations',
    content: 'Mid-year examinations will commence on June 15th. Please ensure all students are prepared.',
    date: '2024-06-01',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    content: 'Annual parent-teacher consultations scheduled for next Friday.',
    date: '2024-06-05',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Sports Day',
    content: 'Inter-house athletics competition on June 20th. All grades to participate.',
    date: '2024-06-08',
    priority: 'low',
  },
];

// Attendance Data
export const attendanceData = [
  { date: 'Mon', present: 96, absent: 4 },
  { date: 'Tue', present: 94, absent: 6 },
  { date: 'Wed', present: 97, absent: 3 },
  { date: 'Thu', present: 95, absent: 5 },
  { date: 'Fri', present: 93, absent: 7 },
];

// Performance Data
export const performanceData = [
  { subject: 'Mathematics', average: 68 },
  { subject: 'English', average: 75 },
  { subject: 'Physical Science', average: 62 },
  { subject: 'Biology', average: 71 },
  { subject: 'History', average: 78 },
  { subject: 'Geography', average: 72 },
];

// Timetable
export const timetable = [
  { id: '1', day: 'Monday', time: '08:00-08:45', subject: 'Mathematics', room: 'Room 101' },
  { id: '2', day: 'Monday', time: '08:50-09:35', subject: 'English', room: 'Room 102' },
  { id: '3', day: 'Monday', time: '09:40-10:25', subject: 'Physical Science', room: 'Lab 1' },
  { id: '4', day: 'Monday', time: '10:45-11:30', subject: 'History', room: 'Room 105' },
  { id: '5', day: 'Monday', time: '11:35-12:20', subject: 'Geography', room: 'Room 106' },
];

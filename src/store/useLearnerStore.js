import { create } from 'zustand';

const initialLearners = [
  {
    id: '1',
    firstName: 'Ndapandula',
    lastName: 'Shikongo',
    grade: '10',
    class: 'A',
    dateOfBirth: '2008-03-15',
    gender: 'female',
    parentName: 'Maria Shikongo',
    parentPhone: '+264 81 234 5678',
    address: 'Windhoek, Katutura',
    enrollmentDate: '2023-01-15',
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Johannes',
    lastName: 'Nghimtina',
    grade: '10',
    class: 'A',
    dateOfBirth: '2008-07-22',
    gender: 'male',
    parentName: 'Peter Nghimtina',
    parentPhone: '+264 81 345 6789',
    address: 'Windhoek, Khomasdal',
    enrollmentDate: '2023-01-15',
    status: 'active',
  },
  {
    id: '3',
    firstName: 'Selma',
    lastName: 'Iipumbu',
    grade: '11',
    class: 'B',
    dateOfBirth: '2007-11-08',
    gender: 'female',
    parentName: 'Helena Iipumbu',
    parentPhone: '+264 81 456 7890',
    address: 'Oshakati',
    enrollmentDate: '2021-01-10',
    status: 'active',
  },
  {
    id: '4',
    firstName: 'Paulus',
    lastName: 'Amakali',
    grade: '12',
    class: 'A',
    dateOfBirth: '2006-05-30',
    gender: 'male',
    parentName: 'Jonas Amakali',
    parentPhone: '+264 81 567 8901',
    address: 'Rundu',
    enrollmentDate: '2023-01-12',
    status: 'active',
  },
  {
    id: '5',
    firstName: 'Frieda',
    lastName: 'Nakale',
    grade: '9',
    class: 'C',
    dateOfBirth: '2009-09-14',
    gender: 'female',
    parentName: 'Anna Nakale',
    parentPhone: '+264 81 678 9012',
    address: 'Walvis Bay',
    enrollmentDate: '2025-01-08',
    status: 'active',
  },
];

export const useLearnerStore = create((set, get) => ({
  learners: initialLearners,
  selectedLearner: null,
  
  addLearner: (learner) => {
    const newLearner = {
      ...learner,
      id: Date.now().toString(),
    };
    set((state) => ({
      learners: [...state.learners, newLearner],
    }));
  },
  
  updateLearner: (id, updatedData) => {
    set((state) => ({
      learners: state.learners.map((l) =>
        l.id === id ? { ...l, ...updatedData } : l
      ),
    }));
  },
  
  deleteLearner: (id) => {
    set((state) => ({
      learners: state.learners.filter((l) => l.id !== id),
      selectedLearner: state.selectedLearner?.id === id ? null : state.selectedLearner,
    }));
  },
  
  selectLearner: (learner) => {
    set({ selectedLearner: learner });
  },
  
  getLearnersByGrade: (grade) => {
    return get().learners.filter((l) => l.grade === grade);
  },
}));

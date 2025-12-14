import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const roleNames = {
  super_admin: 'Super Admin',
  regional_admin: 'Regional Admin',
  school_admin: 'School Admin',
  teacher: 'Teacher',
  parent: 'Parent',
  learner: 'Learner',
  receptionist: 'Receptionist',
  librarian: 'Librarian',
  accountant: 'Accountant',
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email, password, role) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Mock successful login
        const mockUser = {
          id: '1',
          name: roleNames[role],
          email,
          role,
          avatar: undefined,
          schoolId: role === 'school_admin' || role === 'teacher' ? 'school-1' : undefined,
          regionId: role === 'regional_admin' ? 'region-1' : undefined,
        };
        
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      setRole: (role) => {
        set((state) => {
          if (state.user) {
            return {
              user: { ...state.user, role, name: roleNames[role] },
            };
          }
          return state;
        });
      },
    }),
    {
      name: 'isms-auth',
    }
  )
);
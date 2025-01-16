export const Task = {
    id: '', 
    title: '', 
    completed: false, 
    priority: 'low',
    dueDate: '',  
    createdAt: '', 
    isImportant: false, 
    weather: { 
      temp: 0, 
      condition: '', 
      icon: '', 
    },
  };
  
  export const User = {
    id: '', 
    email: '', 
    name: '', 
  };
  
  export const AuthState = {
    user: null, 
    token: null,  
    isAuthenticated: false, 
  };
  
  export const TaskState = {
    tasks: [], 
    loading: false, 
    error: null, 
    activeFilter: '', 
  };
  
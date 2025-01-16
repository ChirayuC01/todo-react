import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: "1",
      title: "Buy groceries",
      description: "Milk, eggs, bread, and fruits",
      createdAt: "2025-01-15T10:00:00Z",
      completed: false,
      isImportant: true,
    },
    {
      id: "2",
      title: "Meeting with team",
      description: "Discuss project progress and next steps",
      createdAt: "2025-01-15T12:00:00Z",
      completed: false,
      isImportant: false,
    },
    {
      id: "3",
      title: "Submit project report",
      description: "Email the final report to the manager",
      createdAt: "2025-01-14T09:30:00Z",
      completed: true,
      isImportant: true,
    },
    {
      id: "4",
      title: "Exercise",
      description: "30-minute workout session",
      createdAt: "2025-01-15T06:00:00Z",
      completed: false,
      isImportant: false,
    },
    {
      id: "5",
      title: "Read a book",
      description: "Complete 2 chapters of 'Atomic Habits'",
      createdAt: "2025-01-13T18:00:00Z",
      completed: true,
      isImportant: false,
    },
    {
      id: "6",
      title: "Pay utility bills",
      description: "Electricity and water bills for January",
      createdAt: "2025-01-12T10:15:00Z",
      completed: false,
      isImportant: true,
    },
    {
      id: "7",
      title: "Plan vacation",
      description: "Research destinations and book tickets",
      createdAt: "2025-01-11T15:45:00Z",
      completed: false,
      isImportant: false,
    },
    {
      id: "8",
      title: "Call parents",
      description: "Weekly catch-up with parents",
      createdAt: "2025-01-15T19:00:00Z",
      completed: true,
      isImportant: false,
    },
    {
      id: "9",
      title: "Clean the house",
      description: "Vacuum and dust all rooms",
      createdAt: "2025-01-14T08:00:00Z",
      completed: false,
      isImportant: true,
    },
    {
      id: "10",
      title: "Prepare presentation",
      description: "Slides for Monday's client meeting",
      createdAt: "2025-01-16T11:00:00Z",
      completed: false,
      isImportant: true,
    },
  ],
  loading: false,
  error: null,
  activeFilter: 'all',
};

// const fetchWeather = async () => {
//   try {
//     return {
//       temp: 22,
//       condition: 'Sunny',
//       icon: '☀️',
//     };
//   } catch (error) {
//     console.error('Weather data error:', error);
//     return null;
//   }
// };

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task) => {
    try {
      const weather = await fetchWeather();
      return {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        weather,
        isImportant: false,
      };
    } catch (error) {
      console.error('Error adding task:', error);
      return {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isImportant: false,
      };
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.priority = priority;
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add task';
      });
  },
});

export const {
  toggleTask,
  deleteTask,
  updateTaskPriority,
  toggleImportant,
  setActiveFilter,
  updateTask
} = taskSlice.actions;

export default taskSlice.reducer;

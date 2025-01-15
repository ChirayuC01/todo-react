import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        completedTasks: [],
        importantTasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({ id: Date.now(), text: action.payload, completed: false, important: false });
        },
        toggleComplete: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            task.completed = !task.completed;

            if (task.completed) {
                state.completedTasks.push(task);
            } else {
                state.completedTasks = state.completedTasks.filter((t) => t.id !== task.id);
            }
        },
        toggleImportant: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            task.important = !task.important;

            if (task.important) {
                state.importantTasks.push(task);
            } else {
                state.importantTasks = state.importantTasks.filter((t) => t.id !== task.id);
            }
        },
    },
});

export const { addTask, toggleComplete, toggleImportant } = taskSlice.actions;
export default taskSlice.reducer;

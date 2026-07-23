import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCourses } from '../api/courseApi';

// Task 2: Async Thunk for fetching course data
export const fetchCoursesThunk = createAsyncThunk(
  'courses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCourses();
      // Map post objects into course structure
      return data.map((post, idx) => ({
        id: post.id,
        name: post.title.slice(0, 20),
        code: `CS10${idx + 1}`,
        credits: 3 + (idx % 2),
        grade: 'A'
      }));
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch courses');
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(fetchCoursesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(fetchCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Rejected state
      .addCase(fetchCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load courses';
      });
  }
});

// Selectors for decoupling store shape from components
export const selectCourses = (state) => state.courses.items;
export const selectCoursesLoading = (state) => state.courses.loading;
export const selectCoursesError = (state) => state.courses.error;

export default courseSlice.reducer;
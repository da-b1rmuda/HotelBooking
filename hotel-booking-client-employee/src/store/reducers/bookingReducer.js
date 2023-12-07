import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
	name: 'bookingStore',
	initialState: {
		guests: [],
		isLoading: false,
		error: '',
		success: ''
	},
	reducers: {
		bookingCreate(state) {
			state.isLoading = true
		},
		bookingCreateSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		bookingCreateError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		guestsGet(state) {
			state.isLoading = true
		},
		guestsGetSuccess(state, action) {
			state.isLoading = false
			state.guests = action.payload.data
		},
		guestsGetError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		bookingDelete(state) {
			state.isLoading = true
		},
		bookingDeleteSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		bookingDeleteError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		makeGuestCheckOut(state) {
			state.isLoading = true
		},
		makeGuestCheckOutSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		makeGuestCheckOutError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		resetMessages(state) {
			state.error = ''
			state.success = ''
		}
	}
})

export default bookingSlice.reducer
export const {
	bookingCreate,
	bookingCreateError,
	bookingCreateSuccess,
	bookingDelete,
	bookingDeleteError,
	bookingDeleteSuccess,
	guestsGet,
	guestsGetError,
	guestsGetSuccess,
	makeGuestCheckOut,
	makeGuestCheckOutError,
	makeGuestCheckOutSuccess,

	resetMessages
} = bookingSlice.actions

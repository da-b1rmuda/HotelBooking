import React from 'react'
import ReactDOM from 'react-dom/client'
import WrapperLayout from './Layout/WrapperLayout'
import { store } from './store'
import { Provider } from 'react-redux'
import './css/bootstrap-grid.css'
import './css/bootstrap-reboot.css'
import './css/bootstrap-utilities.css'
import './css/bootstrap.css'
import './css/fonts.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<WrapperLayout />
	</Provider>
)

import { createBrowserRouter } from 'react-router-dom'
import OverviewPage from '../Pages/Overview/OverviewPage'
import FrontdeskPage from '../Pages/Frontdesk/FrontdeskPage'
import GuestPage from '../Pages/Guest/GuestPage'
import RoomPage from '../Pages/Room/RoomPage'
import DealPage from '../Pages/Deal/DealPage'
import RatePage from '../Pages/Rate/RatePage'
import LoginPage from '../Pages/Login/LoginPage'
import RegistrationPage from './../Pages/Registration/RegistrationPage'
import HomePage from './../Pages/Home/HomePage'

export const routes = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '',
				element: <HomePage />,
			},
			{
				path: 'overview',
				element: <OverviewPage />
			},
			{
				path: 'frontdesk',
				element: <FrontdeskPage />
			},
			{
				path: 'guest',
				element: <GuestPage />
			},
			{
				path: 'room',
				element: <RoomPage />
			},
			{
				path: 'deal',
				element: <DealPage />
			},
			{
				path: 'rate',
				element: <RatePage />
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'registration',
				element: <RegistrationPage />
			}
		]
	}
])

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
import LayoutApp from '../Layout/Layout'

export const routes = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '',
				element: <HomePage />
			},
			{
				path: 'overview',
				element: (
					<LayoutApp>
						<OverviewPage />
					</LayoutApp>
				)
			},
			{
				path: 'frontdesk',
				element: (
					<LayoutApp>
						<FrontdeskPage />
					</LayoutApp>
				)
			},
			{
				path: 'guest',
				element: (
					<LayoutApp>
						<GuestPage />
					</LayoutApp>
				)
			},
			{
				path: 'room',
				element: (
					<LayoutApp>
						<RoomPage />
					</LayoutApp>
				)
			},
			{
				path: 'deal',
				element: (
					<LayoutApp>
						<DealPage />
					</LayoutApp>
				)
			},
			{
				path: 'rate',
				element: (
					<LayoutApp>
						<RatePage />
					</LayoutApp>
				)
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

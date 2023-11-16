import { useState } from 'react'
import { routes } from '../routes/routes'
import { RouterProvider } from 'react-router-dom'
import { ContextBooking } from '../context/booking.context'
import { ConfigProvider } from 'antd'
import locale from 'antd/locale/ru_RU'
import 'dayjs/locale/ru'

export default function WrapperLayout() {

	const [themeMenu, setThemeMenu] = useState()

	return (
		<ConfigProvider locale={locale}>
			<ContextBooking.Provider
				value={{
					themeMenu,
					setThemeMenu
				}}
			>
				<RouterProvider router={routes} />
			</ContextBooking.Provider>
		</ConfigProvider>
	)
}

import React, { useEffect, useState } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from '../../services/functionService'
import { useDispatch, useSelector } from 'react-redux'
import { resetMessagesAction } from '../../store/actions/userAction'
import './LoginPage.scss'
import Loading from '../../components/Loading/Loading'
import { userLoginAction } from '../../store/actions/userAction'

const LoginPage = () => {
	const navigation = useNavigate()
	const dispatch = useDispatch()
	const { userInfo, isLoading, isAuth, error, success } = useSelector((state) => state.userStore)

	const [rememberUser, setRememberUser] = useState(true)

	const onFinish = (values) => {
		dispatch(userLoginAction(values.login, values.password))
	}

	useEffect(() => {
		if (!isAuth) return
		if (rememberUser) {
			localStorage.setItem('userInfo', JSON.stringify(userInfo[0]))
			sessionStorage.removeItem('userInfo')
		} else {
			sessionStorage.setItem('userInfo', JSON.stringify(userInfo[0]))
			localStorage.removeItem('userInfo')
		}
		navigation('/overview')
	}, [isAuth])

	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		if (!isEmpty(success)) {
			dispatch(resetMessagesAction())
			messageSuccess(success)
		}
		if (!isEmpty(error)) {
			dispatch(resetMessagesAction())
			messageError(error)
		}
		// eslint-disable-next-line
	}, [error, success])

	const messageError = (e) => {
		messageApi.open({
			type: 'error',
			content: e
		})
	}
	const messageSuccess = (text) => {
		messageApi.open({
			type: 'success',
			content: text
		})
	}

	return (
		<>
			{contextHolder}
			{isLoading ? (
				<Loading />
			) : (
				<div className='loginPage'>
					<div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
						<div className='loginPage__form'>
							<div className='d-flex justify-content-center align-items-center'>
								<img src='/image/logo.svg' alt='logo' style={{ width: '8vh' }} />
								<div className='loginPage__logo'>
									<p>RoomBook</p>
								</div>
							</div>
							<div className='loginPage__text'>
								<p className='d-flex'>
									Добро пожаловать в BHotel!
								</p>
								<p>Пожалуйста авторизуйтесь в ваш аккаунт и начинаете работать</p>
							</div>
							<Form
								size='large'
								name='normal_login'
								className='login-form'
								onFinish={onFinish}
								onSubmitCapture={(e) => e.preventDefault()}
							>
								<Form.Item
									style={{ paddingBlock: 0 }}
									name='login'
									rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
								>
									<div className='login-form__float-input'>
										<label htmlFor='login'>Логин</label>
										<Input
											placeholder='login123'
											prefix={<UserOutlined style={{ marginRight: '1vh' }} />}
											type='login'
										/>
									</div>
								</Form.Item>
								<Form.Item name='password' rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}>
									<div className='login-form__float-input'>
										<label htmlFor='login'>Пароль</label>
										<Input.Password
											prefix={<LockOutlined style={{ marginRight: '1vh' }} />}
											type='password'
											placeholder='pass123'
											iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
										/>
									</div>
								</Form.Item>

								<Form.Item>
									<Checkbox
										onChange={(e) => setRememberUser(e.target.checked)}
										name='remember'
										checked={rememberUser}
										valuePropName='checked'
										noStyle
									>
										Запомнить меня
									</Checkbox>
								</Form.Item>

								<Form.Item>
									<Button type='primary' htmlType='submit' className='login-form-button'>
										Войти
									</Button>
									<div className='d-flex justify-content-center' style={{ marginTop: '1vh' }}>
										<span style={{ marginRight: '1vh' }}>Нет аккаунта?</span>
										<a onClick={() => navigation('/registration')}>Зарегистрироваться</a>
									</div>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default LoginPage

import styles from './app.module.css';
import { useState } from 'react';
import { useRef } from 'react';

const App = () => {
	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
		}
	});

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatedPassword, setRepeatedPassword] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatedPasswordError, setRepeatedPasswordError] = useState(null);
	const submitButtonRef = useRef(null);

	const sendData = (data) => {
		console.log(data);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, password, repeatedPassword });
	};

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		let newError = null;

		if (!/^[\w@.]*$/.test(target.value)) {
			newError = 'Неверный email, допустимые символы: буквы, цифры и "@"';
		} else if (target.value.length > 25) {
			newError = 'Допустимое количество символов: 25';
		}

		setEmailError(newError);
	};

	const onEmailBlur = ({ target }) => {
		if (target.value.length < 5) {
			setEmailError('Минимальное количество символов: 5');
		}
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let newError = null;

		if (target.value.length > 30) {
			newError = 'Допустимое количество символов: 30';
		}

		setPasswordError(newError);
	};

	const onPasswordBlur = ({ target }) => {
		if (target.value.length < 8) {
			setPasswordError('Минимальное количество символов: 8');
		} else if (!/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(target.value)) {
			setPasswordError(
				'Пароль должен содержать буквы, заглавные буквы, цифры и спец. символы',
			);
		}
	};

	const onRepeatedPasswordChange = ({ target }) => {
		setRepeatedPassword(target.value);

		let newError = null;

		setRepeatedPasswordError(newError);
	};

	const onRepeatedPasswordBlur = ({ target }) => {
		if (target.value !== password) {
			setRepeatedPasswordError('Пароли должны совпадать');
		} else {
			if (email && !emailError) {
				submitButtonRef.current.focus();
			}
		}
	};
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div>
				<label>E-mail</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				></input>
				{emailError && <div className={styles.error}>{emailError}</div>}
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				></input>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
			</div>
			<div>
				<label>Repeat the password</label>
				<input
					type="password"
					name="password"
					value={repeatedPassword}
					onChange={onRepeatedPasswordChange}
					onBlur={onRepeatedPasswordBlur}
				></input>
				{repeatedPasswordError && (
					<div className={styles.error}>{repeatedPasswordError}</div>
				)}
			</div>
			<div>
				<button
					type="submit"
					ref={submitButtonRef}
					disabled={
						!!emailError ||
						!!passwordError ||
						!!repeatedPasswordError ||
						!email ||
						!password ||
						!repeatedPassword
					}
				>
					Зарегистрироваться
				</button>
			</div>
		</form>
	);
};

export default App;

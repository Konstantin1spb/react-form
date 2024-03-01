import styles from './app.module.css';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldsScheme = yup.object().shape({
	email: yup
		.string()
		.matches(/^[\w@.]*$/, 'Неверный email, допустимые символы: буквы, цифры и "@"')
		.max(25, 'Допустимое количество символов: 25')
		.min(5, 'Минимальное количество символов: 5'),
	password: yup
		.string()
		.matches(
			/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
			'Пароль должен содержать буквы, заглавные буквы, цифры и спец. символы',
		)
		.max(30, 'Допустимое количество символов: 30')
		.min(8, 'Минимальное количество символов: 8'),
	repeatedPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatedPassword: '',
		},
		resolver: yupResolver(fieldsScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatedPasswordError = errors.repeatedPassword?.message;

	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
		}
	});

	const submitButtonRef = useRef(null);

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>E-mail</label>
				<input type="email" name="email" {...register('email')}></input>
				{emailError && <div className={styles.error}>{emailError}</div>}
			</div>
			<div>
				<label>Password</label>
				<input type="password" name="password" {...register('password')}></input>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
			</div>
			<div>
				<label>Repeat the password</label>
				<input
					type="password"
					name="password"
					{...register('repeatedPassword')}
				></input>
				{repeatedPasswordError && (
					<div className={styles.error}>{repeatedPasswordError}</div>
				)}
			</div>
			<div>
				<button
					type="submit"
					ref={submitButtonRef}
					disabled={!!emailError || !!passwordError || !!repeatedPasswordError}
				>
					Зарегистрироваться
				</button>
			</div>
		</form>
	);
};

export default App;

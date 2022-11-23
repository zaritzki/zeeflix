import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
	email: string
	password: string
}

const login = () => {
	const [login, setLogin] = useState(false)
	const {signIn, signUp} = useAuth()

	const { 
		register, 
		handleSubmit,  
		formState: { errors } } = useForm<Inputs>()

  	const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
		if (login) {
			await signIn(email, password)
		} else {
			await signUp(email, password)
		}
	}

	return (
		<div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1 maximum-scale=1"
				/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<title>Login - ZEEFLIX</title>
                <meta name="robots" content="noindex, nofollow" />
				<meta name="keywords" content="web design, web development, ecommerce website, wordpress, web developer, front-end developer" />
				<meta name="author" content="dotzar" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<link rel="apple-touch-icon" href="/favicon.png" />
			</Head>
			<Image
				src="https://rb.gy/p2hphi"
				layout="fill"
				className="-z-10 !hidden opacity-60 sm:!inline"
				objectFit="cover"
			/>
			<img
				src="/zeeflix.svg"
				width={100}
                height={30}
				className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
			/>

			<form 
				onSubmit={handleSubmit(onSubmit)} 
				className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
			>
				<h1 className="text-4xl font-semibold">Sign In</h1>
				<div className="space-y-4">
					<label htmlFor="" className="inline-block w-full">
						<input 
							type="email" 
							placeholder="Email" 
							className="input"
							{...register("email", {required: true})}
						/>
						{errors.email && (
							<p className="p-1 text-[13px] font-light text-orange-500">
								Please your valid email address
							</p>
						)}
					</label>
					<label htmlFor="" className="inline-block w-full">
						<input 
							type="password"
							placeholder="Password"
							className="input"
							{...register("password", {required: true})}
						/>
						{errors.email && (
							<p className="p-1 text-[13px] font-light text-orange-500">
								Password must be atleast 8 characters and and must meet password complexity requirements
							</p>
						)}
					</label> 
				</div>
				<button 
					onClick={() => setLogin(true)} 
					type="submit"
					className="w-full rounded bg-[#e50914] py-3 font-semibold"
				>
					Sign In
				</button>
				
				<div className="text-[gray]">
					New to ZEEFLIX?{' '}
					<button 
						onClick={() => setLogin(false)}
						type="submit"
						className="text-white hover:underline"
					>
						Sign up now
					</button>
				</div>
			</form>
		</div>
	)
}

export default login
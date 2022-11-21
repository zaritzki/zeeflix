import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import { CheckIcon } from '@heroicons/react/solid'

const Plans = () => {
	const { logout } = useAuth();

	return (
		<>
			<Head>
				<title>Plans - Zeeflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="border-b border-white/10 bg-[#141414]">
				<Link href="/">
					<img
						src="/zeeflix.svg"
						alt="zeeflix"
						width={100}
						height={30}
						className="cursor-pointer object-contain"
					/>
				</Link>
				<button 
					className="text0lg font-medium hover:underline"
					onClick={logout}
				>
					Sign Out
				</button>
			</header>

			<main className="max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
				<h1 className="mb-3 text-3xl font-medium">Choose the plan that's right for you</h1>
				<ul>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
						Ad-free.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
						just for you.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
						your plan anytime.
					</li>
				</ul>
			</main>

			<div className="mt-4 flex flex-col space-y-4">
				<div className="flex w-full items-center justify-end self-end md:w-3/5">
					<div className="planBox">Standard</div>
					<div className="planBox">Standard</div>
					<div className="planBox">Standard</div>
				</div>

				{/* <Table /> */}

				<button>Subscribe</button>
			</div>
		</>
	)
}

export default Plans

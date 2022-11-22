import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import { Product } from '@stripe/firestore-stripe-payments'
import { loadCheckout } from '../lib/stripe'
import { CheckIcon } from '@heroicons/react/solid'

import Table from './Table'
import Loader from './Loader'

interface Props {
	plans: Product[]
}

const Plans = ({ plans }: Props) => {
	const { logout, user } = useAuth();
	const [selectedPlan, setSelectedPlan] = useState<Product | null>(plans[2])
	const [isBillingLoading, setIsBillingLoading] = useState(false)

	const handleSubscribe = () => {
		if (!user) return

		loadCheckout(selectedPlan?.prices[0].id!)
		setIsBillingLoading(true)
	}

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

			<main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
				<h1 className="mb-3 text-3xl font-medium">Choose the plan that's right for you</h1>
				<ul>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want. Advert-free.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations just for you.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel your plan at any time.
						your plan anytime.
					</li>
				</ul>

				<div className="mt-8 flex flex-col space-y-4">
					<div className="flex w-full items-center justify-end self-end md:w-3/5">
						{plans.map((plan) => (
							<div key={plan.id} 
								className={`planBox ${
									selectedPlan?.id === plan.id 
									? 'opacity-100'
									: 'opacity-60' 
								}`}
								onClick={() => setSelectedPlan(plan)}
							>
								{plan.name}
							</div>
						))}
					</div>

					<Table plans={plans} selectedPlan={selectedPlan} />

					<button
						className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
							isBillingLoading && 'opacity-60'
						}`}
						onClick={handleSubscribe}
						disabled={!selectedPlan || isBillingLoading}
					>
						{isBillingLoading ? (
							<Loader color="dark:fill-gray-300" />
						) : (
							'Subscribe'
						)}
					</button>
				</div>
			</main>
		</>
	)
}

export default Plans

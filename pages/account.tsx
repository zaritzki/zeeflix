import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments, { goToBillingPortal } from '../lib/stripe'
import Membership from '../components/Membership'


interface Props {
	plans: Product[]
}

const account = ({ plans }: Props) => {
    const { loading, logout, user } = useAuth()
    const subscription = useSubscription(user)

    if (!user || loading) return null

    // console.log(subscription)

    return (
        <>
            <Head>
                <meta
					name="viewport"
					content="width=device-width, initial-scale=1 maximum-scale=1"
				/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<title>Account Settings - ZEEFLIX</title>
                <meta name="robots" content="noindex, nofollow" />
				<meta name="keywords" content="web design, web development, ecommerce website, wordpress, web developer, front-end developer" />
				<meta name="author" content="dotzar" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<link rel="apple-touch-icon" href="/favicon.png" />
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
                <Link href="/account">
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                </Link>
            </header>

            <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
                <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
                    <h1 className="text-3xl md:text-4xl">Account</h1>
                    <div className="-ml-0.5 flex items-center gap-x-1.5">
                        <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
                        <p className="text-xs font-semibold text-[#555]">
                            Member since {subscription?.created}
                        </p>
                    </div>
                </div>

                <Membership />

                <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
                <h4 className="text-lg text-[gray]">Plan Details</h4>
                
                {/* Find the current plan */}
                <div className="col-span-2 font-medium">
                    {plans.filter(
                            (plan) => plan.id === subscription?.product
                        )[0]?.name
                    }
                </div>
                <p 
                    className="cursor-pointer text-blue-500 hover:underline md:text-right"
                    onClick={goToBillingPortal}
                >
                    Change plan
                </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
                    <h4 className="text-lg text-[gray]">Settings</h4>
                    <p 
                        className="col-span-3 cursor-pointer text-blue-500 hover:underline"
                        onClick={logout}
                    >
                        Sign out of all devices
                    </p>
                </div>
            </main>
        </>
    )
}

export default account

export const getStaticProps: GetStaticProps = async () => {
    const plans = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
    .then((res) => res)
    .catch((err) => console.log(err.message))
  
    return {
        props: {
            plans,
        },
    }
}
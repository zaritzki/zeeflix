import Head from 'next/head'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'
import requests from '../utils/requests'
import payments from '../lib/stripe'
import Header from '../components/Header'
import Banner from '../components/Banner'
import MovieRow from '../components/MovieRow'
import Modal from '../components/Modal'
import Plans from '../components/Plans'
import useLists from '../hooks/useLists'


interface Props {
    actionMovies: Movie[]
    comedyMovies: Movie[]
    documentaries: Movie[]
    horrorMovies: Movie[]
    netflixOriginals: Movie[]
    plans: Product[]
    romanceMovies: Movie[]
    topRated: Movie[]
    trendingNow: Movie[]
}

const Home = ({ 
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    netflixOriginals,
    plans,
    romanceMovies,
    topRated,
    trendingNow,
 }: Props ) => {
    const { loading, user } = useAuth()
    const subscription = useSubscription(user)
    const lists = useLists(user?.uid)
    const movie = useRecoilValue(movieState)
    const showModal = useRecoilValue(modalState)

    if (!user || loading || subscription === null) return null

    if (!subscription) return <Plans plans={plans} />

	return (
		<div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${showModal && '!h-screen overflow-hidden'}`}>
			<Head> 
				<title>{movie?.title || movie?.original_name || 'Home'} - ZEEFLIX</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
                <Banner netflixOriginals={netflixOriginals} /> 
				<section className="md:space-y-24">
					<MovieRow title="Trending Now" movies={trendingNow} />
                    <MovieRow title="Top Rated" movies={topRated} />
                    
                    {/* My Lists */}
                    {lists.length > 0 && <MovieRow title="My Lists" movies={lists} />}

                    <MovieRow title="Action Thrillers" movies={actionMovies} />
                    <MovieRow title="Comedies" movies={comedyMovies} />
                    <MovieRow title="Scary Movies" movies={horrorMovies} />
                    <MovieRow title="Romance Movies" movies={romanceMovies} />
                    <MovieRow title="Documentaries" movies={documentaries} />
				</section>
			</main>
			{showModal && <Modal />}
		</div>
	)
}

export default Home

export const getServerSideProps = async () => {
    const plans = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
    .then((res) => res)
    .catch((err) => console.log(err.message));

    const [
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        netflixOriginals,
        documentaries,
        topRated,
        trendingNow,
        
    ] = await Promise.all([
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
    ])
    
    return {
        props: {
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            documentaries: documentaries.results,
            netflixOriginals: netflixOriginals.results,
            plans,
            romanceMovies: romanceMovies.results,
            topRated: topRated.results,
            trendingNow: trendingNow.results,
        },
    }
}
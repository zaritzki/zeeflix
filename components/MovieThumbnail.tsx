import Image from "next/image"
import { DocumentData } from "firebase/firestore"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import { Movie } from "../typings"

interface Props {
    movie: Movie | DocumentData
}

const MovieThumbnail = ({ movie }: Props) => {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    return (
        <div
            onClick={() => {
                setCurrentMovie(movie)
                setShowModal(true)
            }}
            className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
        >
            <Image 
                src={`https://image.tmdb.org/t/p/w500${ movie.backdrop_path || movie.poster_path }`}
                className="rounded-sm object-cover md:rounded"
                layout="fill"
            />
        </div>
    )
}

export default MovieThumbnail
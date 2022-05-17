import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { AuthProvider } from '../hooks/useAuth'

import '../styles/globals.css'

function ZeeflixApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			{/* HOC - Higher-Order Components */}
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider> 
		</RecoilRoot>
	)
}

export default ZeeflixApp

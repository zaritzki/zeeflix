import {
    createCheckoutSession,
    getStripePayments,
} from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import app from '../firebase'

const payments = getStripePayments(app, {
    productsCollection: 'plans',
    customersCollection: 'customers',
})

const loadCheckout = async (priceId: string) => {
    await createCheckoutSession(payments, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin, // we can push it to custom page
    })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((err) => console.log(err.message))
}

export { loadCheckout }
export default payments

 
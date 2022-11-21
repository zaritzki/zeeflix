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

const loacCheckout = async (priceId: string) => {
    await createCheckoutSession(payments, {
        priceL priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin, // we can push it to custom page
    })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message))
}

export { loacCheckout }
export default payments

 
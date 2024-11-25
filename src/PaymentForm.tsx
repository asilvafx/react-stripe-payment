import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardNumberElement } from "@stripe/stripe-js"
import { FormEvent, useState } from "react"

export default function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [name, setName] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null)

    const generateStripeToken = async () => {
        if (!stripe || !elements) {
            console.log('stripe / elements is not set')
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);

        const {token, error} = await stripe.createToken(cardNumberElement as StripeCardNumberElement, {
            name: name,
            address_zip: postalCode
        })

        if (!token || error) {
            console.log(error || 'Token is not set')
            throw error
        }

        return token;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const token = await generateStripeToken();
            alert(token?.id);
        } catch (err) {
            console.log('error: ', err);

            // Check if the error is an instance of Error
            if (err instanceof Error) {
                setFormErrorMessage(err.message);
            } else {
                setFormErrorMessage('Something went wrong');
            }
        }
    }
    return (
        <div>
            {/* Card Background */}
            <div className="relative px-4 max-w-lg mx-auto">
                <div className="bg-white px-8 py-6 rounded-lg shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Card Number */}
                        <div>
                            <label htmlFor="card-nr" className="block text-sm font-medium mb-1">
                                Card Number
                            </label>
                            <CardNumberElement id="card-nr" className='text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300' />
                        </div>
                        <div>
                            <label htmlFor="card-exp" className="block text-sm font-medium mb-1">
                                Card Exp
                            </label>
                            <CardExpiryElement id="card-exp" className='text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300' />
                        </div>
                        <div>
                            <label htmlFor="card-cvc" className="block text-sm font-medium mb-1">
                                Card Exp
                            </label>
                            <CardCvcElement id="card-cvc" className='text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300' />
                        </div>
                        <div>
                            <label htmlFor="customer-name" className="block text-sm font-medium mb-1">
                                Name
                            </label>
                            <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className='text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300 w-full' required/>
                        </div>
                        <div>
                            <label htmlFor="customer-name" className="block text-sm font-medium mb-1">
                                Postal Code
                            </label>
                            <input placeholder="Your Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} className='text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300 w-full' required/>
                        </div>

                        {formErrorMessage && <label className="my-2 text-xs text-red-500">{formErrorMessage}</label>}
                        <button className="flex items-center justify-center bg-indigo-600 px-3 py-2 text-white rounded w-full text-center">Save Payment Method</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
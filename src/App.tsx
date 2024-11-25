import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"


const stripe = loadStripe('pk_test_51KEP7oIh04P5wOXqblgjX6omNuUUBShSzyRVQmLqtZsxaCLLRwQixQPjyTqqk77P997Kp5VRv4enVHBG7Yg9Zk7C00TxLZNkGP')
export default function App() {
  return (
    <Elements stripe={stripe}>
      <PaymentForm />
    </Elements>
  )
}
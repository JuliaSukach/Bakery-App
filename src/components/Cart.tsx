import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StickyBottomBar from './StickyBottomBar'

interface CartItem {
    name: string
    price: number
    quantity: number
}

interface CartProps {
    cart: CartItem[]
    onClearCart: () => void
}

const Cart: React.FC<CartProps> = ({ cart, onClearCart }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleCheckOut = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart })
            })

            const data = await response.json()
            if (response.ok) {
                onClearCart()
                navigate('/success')
            } else {
                toast.error(`Error: ${data.error} (Item: ${data.errorItem})`)
            }
        } catch (error) {
            console.error('Checkout error:', error)
            toast.error('An unexpected error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }
    return (
        <StickyBottomBar
            total={totalPrice}
            buttonText={loading ? 'Processing...' : 'Order'}
            onButtonClick={handleCheckOut}
            disabled={cart.length === 0 || loading}
        />
    )
}

export default Cart
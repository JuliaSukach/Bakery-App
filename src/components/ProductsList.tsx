import { useState, useEffect, useMemo } from 'react'
import Cart from './Cart'
import { toast } from 'react-toastify'
import './ProductList.scss'


interface Product {
    name: string
    stock: number
    price: number
    image: string
}

interface CartItem {
    name: string
    price: number
    quantity: number
}

const ProductsList: React.FC = () => {
    const [initialProducts, setInitialProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
    })

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)


    // Save cart to local storage whenever it updates
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/storage')
                if (!response) {
                    throw new Error('Failed to fetch products')
                }
                const data = await response.json()
                setInitialProducts(data.storage)
            } catch (error) {
                console.error('Fetch error:', error)
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Compute available products based on initial products and cart
    const productsWithStock = useMemo(() => {
        return initialProducts.map(product => {
        const cartItem = cart.find((item: CartItem) => item.name === product.name)
        return cartItem
            ? { ...product, stock: product.stock - cartItem.quantity }
            : product
        })
    }, [initialProducts, cart])

    useEffect(() => {
        if (error) {
            toast.error(`Error: ${error}`)
        }
    }, [error])

    const handleCartUpdate = (product: Product, delta: number) => {
        const currentQuantity = cart.find((item) => item.name === product.name)?.quantity || 0
        const newQuantity = currentQuantity + delta

        // Ensure the quantity doesn't go below 0 or above the available stock
        if (newQuantity < 0 || product.stock <= 0) {
            return
        }

        setCart((prevCart) => {
            // If the item already exists in the cart, update its quantity
            const existingItem = prevCart.find((item) => item.name === product.name)
            if (existingItem) {
                return prevCart.map((item) =>
                    item.name === product.name ? { ...item, quantity: newQuantity } : item
                )
            }
            return [...prevCart, { name: product.name, price: product.price, quantity: newQuantity }]
        })
    }

    const handleClearCart = () => {
        setCart([])
    }

    const getImageURL = (productName: string) => {
        const formattedName = productName.toLowerCase()
        return `/images/${formattedName}.png`
    }

    return(
        <div className='product-list container d-flex flex-column mt-4'>
            <h1 className='container-title text-left mb-4'>My Order</h1>
            {/* Conditionally render the main content */}
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <div className='error-container text-center p-4'>
                    <h2 className='text-danger mb-3'>Error loading products</h2>
                    <p>{error}</p>
                </div>
            ) : (
                <div className='container'>
                    {productsWithStock.map(product => (
                        <div key={product.name} className='products-container'>
                            <div className={`cart cart-item d-flex flex-row align-items-center px-2 my-3 ${product.stock <= 0 ? 'out-of-stock' : ''}`}>
                                <img
                                    src={getImageURL(product.name)}
                                    alt={product.name}
                                    className='rounded'
                                    style={{ width: '72px', height: '72px', objectFit: 'cover' }}
                                    onError={(e) => (e.currentTarget.src = '/images/default.png')}
                                />
                                {/* Product Info */}
                                <div className='card-body d-flex flex-row align-items-center justify-content-between ms-4' style={{ width: '100%' }}>
                                    <div className='d-flex flex-column me-4 flex-grow-1'>
                                        <h4 className='card-title mb-1'>{product.name}</h4>
                                        <p className='cart-text'>${product.price.toFixed(2)}</p>
                                    </div>
                                    <div className='d-flex align-items-center gap-2 flex-shrink-0'>
                                        <p className='card-title mb-0 me-2' aria-label='Available stock'>
                                            {product.stock}
                                        </p>
                                        <button
                                            className='btn circle-btn'
                                            onClick={() => handleCartUpdate(product, -1)}
                                            disabled={product.stock <= 0}
                                            aria-label={`Decrease quantity of ${product.name}`}
                                        >
                                            -
                                        </button>
                                        <button
                                            className='btn circle-btn'
                                            onClick={() => handleCartUpdate(product, 1)}
                                            disabled={product.stock <= 0}
                                            aria-label={`Increase quantity of ${product.name}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Cart cart={cart} onClearCart={handleClearCart}/>
        </div>
    )
}

export default ProductsList

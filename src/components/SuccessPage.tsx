import { useNavigate } from 'react-router-dom'
import StickyBottomBar from './StickyBottomBar'
import './SuccessPage.scss'


const SuccessPage = () => {
    const navigate = useNavigate()
    return (
        <div className='success-page d-flex flex-column container' style={{ minHeight: '100vh', paddingBottom: '80px' }} >
            <h2 className='m-4'>Order received</h2>
            <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center'>
                <img
                    src='/images/fireworks.png'
                    alt='Celebration'
                    className='mb-3'
                    style={{ width: '250px', height: 'auto' }}
                />
                <h1 className='mb-1'>Thank you!</h1>
                <p className='mb-4'>We have successfully received your order</p>
            </div>

            <StickyBottomBar
                buttonText='Submit another order'
                onButtonClick={() => navigate('/')}
            />
        </div>
    )
}

export default SuccessPage
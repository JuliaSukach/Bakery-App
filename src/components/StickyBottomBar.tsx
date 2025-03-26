import './StickyBottomBar.scss'

interface StickyBottomBarProps {
    buttonText: string
    onButtonClick: () => void
    total?: number
    disabled?: boolean
}

const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ buttonText, onButtonClick, total, disabled }) => {
    return (
        <div className='sticky-bottom-bar shadow-sm rounded-top-4 p-3 mt-4 d-flex flex-column' aria-label='Order summary'>
            {typeof total === 'number' && (
                <div className='d-flex flex-row justify-content-between my-2'>
                    <h6 className='total-text'>Total</h6>
                    <h6 className='total-text'>${total.toFixed(2)}</h6>
                </div>
            )}
            <button
                className='btn btn-primary btn-lg'
                onClick={onButtonClick}
                disabled={disabled}
            >
                {buttonText}
            </button>
        </div>
    )
}

export default StickyBottomBar
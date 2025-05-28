import { useNavigate } from 'react-router-dom';
import assets from '../../assets/assets'; // Update with your actual path
import Footer from '../../components/student/Footer'; // Update with your actual footer component

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center md:px-36 px-8 py-20 text-center">
                <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col items-center">
                        <img src={assets.paymentFailedIcon} alt="Payment Failed" className="w-20 h-20 mb-6" />
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Payment Failed</h1>
                        <p className="text-gray-600 mb-8">
                            We couldn't process your payment. Please check your payment details and try again.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex-1 py-3 px-6 rounded border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => navigate('/payment')} // Update with your payment route
                                className="flex-1 py-3 px-6 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200 w-full">
                            <p className="text-gray-500 text-sm mb-2">Need help with your payment?</p>
                            <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentFailed;
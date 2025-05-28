import { useNavigate } from 'react-router-dom';
import assets from '../../assets/assets'; // Update with your actual path
import Footer from '../../components/student/Footer'; // Update with your actual footer component

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center md:px-36 px-8 py-20 text-center">
                <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col items-center">
                        <img src={assets.paymentSuccessIcon} alt="Payment Success" className="w-20 h-20 mb-6" />
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Payment Successful!</h1>
                        <p className="text-gray-600 mb-6">
                            Thank you for your payment. Your enrollment is now complete.
                        </p>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 w-full text-left">
                            <div className="flex items-start gap-3">
                                <img src={assets.blueTickIcon} alt="Check" className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-green-800">Order Confirmed</p>
                                    <p className="text-green-600 text-sm mt-1">
                                        You will receive a confirmation email with your course details shortly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/my-courses')} // Update with your courses route
                            className="w-full max-w-md py-3 px-6 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors mb-4"
                        >
                            Go to My Courses
                        </button>

                        <div className="mt-8 pt-8 border-t border-gray-200 w-full">
                            <p className="text-gray-500 text-sm mb-2">Need help getting started?</p>
                            <a href="/getting-started" className="text-blue-600 hover:underline">View Getting Started Guide</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentSuccess;
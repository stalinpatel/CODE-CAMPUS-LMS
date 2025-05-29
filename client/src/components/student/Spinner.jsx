
const Spinner = ({ classNames = '' }) => {
    return (
        <div className={`animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full ${classNames}`}></div>
    );
};

export default Spinner;
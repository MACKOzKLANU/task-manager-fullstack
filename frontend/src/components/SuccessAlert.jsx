function SuccessAlert({ message }) {
    return (
        <div className="fixed bottom-4 p-4 mb-4 text-sm rounded-2xl bg-green-900" role="alert">
            <span className="font-bold text-green-400">Success alert!</span> <span className="font-medium text-white">{message}</span>
        </div>
    )
}

export default SuccessAlert;
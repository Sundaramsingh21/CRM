const Modal = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">

                <button
                    onClick={onClose}
                    className="absolute  cursor-pointer top-8 right-8 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
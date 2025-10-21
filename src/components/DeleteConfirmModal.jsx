import { Trash2 } from 'lucide-react';
import Button from './Button';

const DeleteConfirmModal = ({ transaction, onClose, onConfirm, loading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 text-center mb-2">
          Delete Transaction?
        </h3>
        
        <p className="text-slate-600 text-center mb-6">
          This will permanently delete <span className="font-semibold">"{transaction.name}"</span>. This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
import { useState } from 'react';
import { Card, CardHeader, CardContent } from './Card';
import Button from './button';
import { DollarSign, AlertTriangle } from 'lucide-react';

const BalanceCard = ({ balance, resetBalance }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleResetClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmReset = () => {
    resetBalance();
    setShowConfirmation(false);
  };

  const handleCancelReset = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Card className="group">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="text-slate-600 font-medium text-sm sm:text-base">Current Balance</div>
            <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center group-hover:bg-slate-300 transition-colors duration-300">
              <DollarSign className="text-slate-600 w-4 h-4" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">${balance.toLocaleString()}</div>
          <Button variant="outline" onClick={handleResetClick} className="w-full text-sm">
            Reset Balance
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 text-center mb-2">Reset Balance?</h3>
            <p className="text-slate-600 text-center mb-6">
              This will permanently delete all transactions from the database. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleCancelReset} 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmReset} 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Delete All
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BalanceCard;
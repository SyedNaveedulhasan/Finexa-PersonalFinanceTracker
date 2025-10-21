import { useRef } from 'react';
import { Card, CardHeader, CardContent } from './Card';
import Button from './Button';
import { TrendingUp, Plus } from 'lucide-react';

const IncomeCard = ({ totalIncome, setShowIncomeModal, setIncomeCardRect }) => {
  const cardRef = useRef(null);

  const handleAddIncomeClick = () => {
    if (cardRef.current && setIncomeCardRect) {
      const rect = cardRef.current.getBoundingClientRect();
      setIncomeCardRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    setShowIncomeModal(true);
  };

  return (
    <Card ref={cardRef} className="group">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="text-slate-600 font-medium text-sm sm:text-base">Total Income</div>
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
            <TrendingUp className="text-emerald-600 w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4">${totalIncome.toLocaleString()}</div>
        <Button onClick={handleAddIncomeClick} className="w-full text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Income
        </Button>
      </CardContent>
    </Card>
  );
};

export default IncomeCard;
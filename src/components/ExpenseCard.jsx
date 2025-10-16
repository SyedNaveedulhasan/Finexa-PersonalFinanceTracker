import { Card, CardHeader, CardContent } from './Card';
import Button from './button';
import { TrendingDown, Plus } from 'lucide-react';
import { useRef } from 'react';

const ExpenseCard = ({ totalExpenses, setShowExpenseModal, setExpenseCardRect }) => {
  const cardRef = useRef(null);

  const handleAddExpenseClick = () => {
    if (cardRef.current && setExpenseCardRect) {
      const rect = cardRef.current.getBoundingClientRect();
      setExpenseCardRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    setShowExpenseModal(true);
  };

  return (
    <Card ref={cardRef} className="group sm:col-span-2 lg:col-span-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="text-slate-600 font-medium text-sm sm:text-base">Total Expenses</div>
          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center group-hover:bg-slate-300 transition-colors duration-300">
            <TrendingDown className="text-slate-600 w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl sm:text-3xl font-bold text-slate-700 mb-4">${totalExpenses.toLocaleString()}</div>
        <Button onClick={handleAddExpenseClick} className="w-full bg-slate-600 hover:bg-slate-700 text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
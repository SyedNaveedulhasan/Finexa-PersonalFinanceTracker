import { Card, CardContent } from './Card';
import { FileText } from 'lucide-react';

const NoTransactions = () => (
  <Card className="mb-6 sm:mb-8">
    <CardContent className="py-12 sm:py-16">
      <div className="text-center">
        <div className="mb-6 sm:mb-8">
          <div className="relative inline-block">
            <div className="w-32 sm:w-48 h-20 sm:h-32 bg-slate-100 rounded-lg shadow-md transform rotate-3">
              <div className="w-full h-4 sm:h-8 bg-slate-800 rounded-t-lg"></div>
              <div className="p-2 sm:p-4">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-emerald-500 rounded mb-2 sm:mb-3"></div>
                <div className="space-y-1">
                  <div className="h-1 sm:h-2 bg-emerald-500 rounded w-1/4"></div>
                  <div className="h-1 sm:h-2 bg-emerald-500 rounded w-1/3"></div>
                  <div className="h-1 sm:h-2 bg-emerald-500 rounded w-1/4"></div>
                  <div className="h-1 sm:h-2 bg-emerald-500 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="w-32 sm:w-48 h-20 sm:h-32 bg-white border-2 border-slate-200 rounded-lg shadow-md absolute -top-1 sm:-top-2 -left-1 sm:-left-2">
              <div className="w-full h-4 sm:h-8 bg-slate-700 rounded-t-lg flex items-center px-2 sm:px-3">
                <div className="w-1 sm:w-2 h-1 sm:h-2 bg-white rounded-full"></div>
              </div>
              <div className="p-2 sm:p-4">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-emerald-500 rounded mb-2 sm:mb-3"></div>
                <div className="space-y-1">
                  <div className="h-1 sm:h-2 bg-emerald-500 rounded w-1/4"></div>
                  <div className="h-1 sm:h-2 bg-emerald-500 rounded w-1/3"></div>
                  <div className="h-1 sm:h-2 bg-emerald-500 rounded w-1/4"></div>
                  <div className="h-1 sm:h-2 bg-emerald-500 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">You Have No Transactions Currently</h3>
        <p className="text-sm sm:text-base text-slate-500 px-4">Start by adding your first income or expense to see your financial overview</p>
      </div>
    </CardContent>
  </Card>
);

export default NoTransactions;
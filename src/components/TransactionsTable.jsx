import { useState } from 'react';
import { Card, CardHeader, CardTitle } from './Card';
import Button from './Button';
import Input from './Input';
import Badge from './Badge';
import { Search, Download, Upload, FileText, ChevronLeft, ChevronRight, Filter, Edit2, Trash2 } from 'lucide-react';

const TransactionsTable = ({ transactions, searchTerm, setSearchTerm, sortBy, setSortBy, filteredTransactions, exportCSV, importFromCSV, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const itemsPerPage = 10;
  
  // Apply type filter on top of existing filtered transactions
  const typeFilteredTransactions = filteredTransactions.filter(transaction => {
    if (filterType === 'all') return true;
    return transaction.type === filterType;
  });
  
  const totalPages = Math.ceil(typeFilteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = typeFilteredTransactions.slice(startIndex, endIndex);
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Reset to page 1 when search/filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };
  
  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };
  
  return (
    <Card className='mb-15'>
      <CardHeader className="border-b border-slate-200">
        <div className="flex flex-col space-y-4">
          <CardTitle>My Transactions</CardTitle>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
              <div className="relative flex-1 sm:flex-none sm:w-48">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="w-full h-10 px-4 rounded-lg border-2 border-slate-300 bg-white text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all duration-300 cursor-pointer hover:border-slate-400 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="text-slate-400 w-4 h-4" />
                    <span>
                      {filterType === 'all' && 'All Transactions'}
                      {filterType === 'income' && 'Income Only'}
                      {filterType === 'expense' && 'Expense Only'}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showFilterMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showFilterMenu && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-lg overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => {
                        handleFilterChange('all');
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 flex items-center gap-3 cursor-pointer ${
                        filterType === 'all'
                          ? ' text-emerald-700 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${filterType === 'all' ? 'bg-emerald-600' : 'bg-transparent border-2 border-slate-300'}`}></div>
                      All Transactions
                    </button>
                    <button
                      onClick={() => {
                        handleFilterChange('income');
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 flex items-center gap-3 border-t border-slate-100 cursor-pointer ${
                        filterType === 'income'
                          ? ' text-emerald-700 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${filterType === 'income' ? 'bg-emerald-600' : 'bg-transparent border-2 border-slate-300'}`}></div>
                      Income Only
                    </button>
                    <button
                      onClick={() => {
                        handleFilterChange('expense');
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 flex items-center gap-3 border-t border-slate-100 cursor-pointer ${
                        filterType === 'expense'
                          ? ' text-emerald-700 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${filterType === 'expense' ? 'bg-emerald-600' : 'bg-transparent border-2 border-slate-300'}`}></div>
                      Expense Only
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2 flex-1">
                <Button
                  variant={sortBy === 'date' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => handleSortChange('date')}
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  Sort by Date
                </Button>
                <Button
                  variant={sortBy === 'amount' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => handleSortChange('amount')}
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  Sort by Amount
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={exportCSV} size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm cursor-pointer">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Export to </span>CSV
                </Button>
                <label htmlFor="csv-upload" className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:shadow-lg hover:border-slate-400 h-9 px-3 cursor-pointer flex-1 sm:flex-none text-xs sm:text-sm">
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Import from </span>CSV
                </label>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  required
                  onChange={importFromCSV}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <div className="overflow-x-auto">
        {transactions.length > 0 ? (
          <table className="w-full table-fixed">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left p-3 sm:p-4 font-medium text-slate-600 text-sm relative pl-6 sm:pl-8 w-[22%]">
                  Name
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-slate-400"></span>
                </th>
                <th className="text-left p-3 sm:p-4 font-medium text-slate-600 text-sm relative w-[17%]">
                  Type
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-slate-400"></span>
                </th>
                <th className="text-left p-3 sm:p-4 font-medium text-slate-600 text-sm relative w-[20%]">
                  Date
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-slate-400"></span>
                </th>
                <th className="text-left p-3 sm:p-4 font-medium text-slate-600 text-sm relative w-[20%]">
                  Amount
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-slate-400"></span>
                </th>
                <th className="text-left p-3 sm:p-4 font-medium text-slate-600 text-sm w-[25%] pr-6 sm:pr-8">Tag</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={transaction.id} className={`border-b border-slate-100 hover:bg-slate-100/80 transition-all duration-200 hover:shadow-sm ${index % 2 === 0 ? 'bg-slate-50/30' : 'bg-slate-50/60'}`}>
                  <td className="p-3 sm:p-4 font-medium text-slate-800 text-sm pl-6 sm:pl-8">{transaction.name}</td>
                  <td className="p-3 sm:p-4">
                    <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                      {transaction.type}
                    </Badge>
                  </td>
                  <td className="p-3 sm:p-4 text-slate-600 text-sm">{transaction.date}</td>
                  <td className={`p-3 sm:p-4 font-bold text-sm ${transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-700'}`}>
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="p-3 sm:p-4 pr-6 sm:pr-8">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="capitalize flex-shrink-0">
                        {transaction.tag}
                      </Badge>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto">
                        <button
                          onClick={() => onEdit && onEdit(transaction)}
                          className="p-1 rounded-md text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete && onDelete(transaction.id)}
                          className="p-1 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-300 transition-all duration-200 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <FileText className="text-slate-400 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-slate-600 mb-2">No Data Available</h3>
            <p className="text-sm sm:text-base text-slate-500">Add your first transaction to see it here</p>
          </div>
        )}
        
        {typeFilteredTransactions.length === 0 && transactions.length > 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="text-slate-400 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-slate-600 mb-2">No transactions found</h3>
            <p className="text-sm sm:text-base text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {typeFilteredTransactions.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 pb-12 px-4 py-4 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              <span className="text-sm text-slate-600 flex items-center">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, typeFilteredTransactions.length)}</span> of{' '}
                  <span className="font-medium">{typeFilteredTransactions.length}</span> results
                </p>
              </div>
              <div>
                <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageClick(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer ${
                            currentPage === pageNumber
                              ? 'z-10 border-1 border-emerald-600 text-emerald-600'
                              : 'text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return (
                        <span
                          key={pageNumber}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-300"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TransactionsTable;
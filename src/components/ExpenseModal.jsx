import Modal from './Modal';
import Input from './Input';
import Select from './Select';

const ExpenseModal = ({ show, onClose, formData, setFormData, handleAddExpense, errors = {}, expenseCardRect }) => (
  <Modal 
    show={show} 
    onClose={onClose} 
    title="Add Expense" 
    onSubmit={handleAddExpense}
    expenseCardRect={expenseCardRect}
  >
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expense Name <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="Expense name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">Please input the name of the transaction!</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount <span className="text-red-500">*</span>
        </label>
        <Input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className={errors.amount ? 'border-red-500' : ''}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">Please input the amount!</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date <span className="text-red-500">*</span>
        </label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className={errors.date ? 'border-red-500' : ''}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">Please select the date!</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.tag}
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          className={errors.tag ? 'border-red-500' : ''}
        >
          <option value="">Select category</option>
          <option value="food">Food</option>
          <option value="education">Education</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="healthcare">Healthcare</option>
          <option value="other">Other</option>
        </Select>
        {errors.tag && (
          <p className="text-red-500 text-sm mt-1">Please select a category!</p>
        )}
      </div>
    </div>
  </Modal>
);

export default ExpenseModal;
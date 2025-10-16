import Modal from './Modal';
import Input from './Input';

const IncomeModal = ({ show, onClose, formData, setFormData, handleAddIncome, errors = {}, incomeCardRect }) => (
  <Modal 
    show={show} 
    onClose={onClose} 
    title="Add Income" 
    onSubmit={handleAddIncome}
    expenseCardRect={incomeCardRect}
  >
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Income Source Name <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="Income source name"
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
          Tag <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="Tag (e.g., salary, freelance)"
          value={formData.tag}
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          className={errors.tag ? 'border-red-500' : ''}
        />
        {errors.tag && (
          <p className="text-red-500 text-sm mt-1">Please input the tag!</p>
        )}
      </div>
    </div>
  </Modal>
);

export default IncomeModal;
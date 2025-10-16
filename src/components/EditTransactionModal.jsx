import { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Select from './Select';

const EditTransactionModal = ({ transaction, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: transaction.name,
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount,
    tag: transaction.tag
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = true;
    if (!formData.date.trim()) newErrors.date = true;
    if (!formData.tag.trim()) newErrors.tag = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      await onUpdate(transaction.id, {
        name: formData.name,
        type: formData.type,
        date: formData.date,
        amount: parseFloat(formData.amount),
        tag: formData.tag
      });
      
      onClose();
    } catch (error) {
      console.error('Error updating transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      show={true} 
      onClose={onClose} 
      title="Edit Transaction" 
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Transaction name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: false });
            }}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Please input the name of the transaction!</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, date: e.target.value });
              setErrors({ ...errors, date: false });
            }}
            className={errors.date ? 'border-red-500' : ''}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">Please select the date!</p>
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
            onChange={(e) => {
              setFormData({ ...formData, amount: e.target.value });
              setErrors({ ...errors, amount: false });
            }}
            className={errors.amount ? 'border-red-500' : ''}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">Please input the amount!</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.tag}
            onChange={(e) => {
              setFormData({ ...formData, tag: e.target.value });
              setErrors({ ...errors, tag: false });
            }}
            className={errors.tag ? 'border-red-500' : ''}
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="education">Education</option>
            <option value="office">Office</option>
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="investment">Investment</option>
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
};

export default EditTransactionModal;
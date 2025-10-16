import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const FinancialChart = ({ transactions }) => {
  // Real data se chart data generate karna
  const getChartData = () => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    // Transactions ko month-year ke hisab se group karna
    const monthlyData = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date:', transaction.date);
        return;
      }
      
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-11
      const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
      const monthYear = `${date.toLocaleString('en', { month: 'short' })} ${year}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthYear,
          income: 0,
          expenses: 0,
          balance: 0,
          sortDate: new Date(year, month, 1)
        };
      }
      
      if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.amount;
      } else {
        monthlyData[monthKey].expenses += transaction.amount;
      }
    });

    // Array mein convert karna aur date ke hisab se sort karna
    const chartArray = Object.values(monthlyData)
      .sort((a, b) => a.sortDate - b.sortDate)
      .map(item => {
        const balance = item.income - item.expenses;
        return {
          month: item.month,
          income: item.income,
          expenses: item.expenses,
          balance: balance
        };
      });

    console.log('Chart Data:', chartArray);
    
    // Last 12 months ka data return karna
    return chartArray.slice(-12);
  };

  const chartData = getChartData();

  // Y-axis formatter for USD
  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  // Custom Tooltip with colored labels
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '12px'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '4px', color: '#1e293b' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '2px 0', color: entry.color, fontWeight: '500' }}>
              {entry.name === 'income' ? 'Income' : entry.name === 'expenses' ? 'Expenses' : 'Balance'}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b" 
                fontSize={12}
                tickMargin={8}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12}
                tickMargin={8}
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.3} />
              <Area type="monotone" dataKey="expenses" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.3} />
              <Area type="monotone" dataKey="balance" stroke="#047857" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialChart;
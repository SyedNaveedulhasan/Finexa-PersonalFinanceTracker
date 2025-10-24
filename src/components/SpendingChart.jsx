import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';

const COLORS = ['#059669', '#64748b', '#047857', '#10b981', '#14b8a6', '#0491d1', '#0ea5e9'];

const SpendingChart = ({ transactions }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Generate spending data from the Real data
  const getSpendingData = () => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    const categoryData = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const category = transaction.tag || 'Other';
        
        if (categoryData[category]) {
          categoryData[category] += transaction.amount;
        } else {
          categoryData[category] = transaction.amount;
        }
      });

    // Convert object into array
    return Object.entries(categoryData).map(([name, value]) => ({
      name,
      value
    }));
  };

  const spendingData = getSpendingData();

  // Custom Tooltip with colored text
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '12px'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '2px', color: payload[0].payload.fill, textTransform: 'capitalize' }}>
            {payload[0].name}
          </p>
          <p style={{ color: '#64748b', fontWeight: '500' }}>
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Active shape renderer for highlighting
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onLegendHover = (index) => {
    setActiveIndex(index);
  };

  const onLegendLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Spending</CardTitle>
      </CardHeader>
      <CardContent>
        {spendingData && spendingData.length > 0 ? (
          <>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={window.innerWidth < 640 ? 80 : 120}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                  >
                    {spendingData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
              {spendingData.map((entry, index) => (
                <div 
                  key={entry.name} 
                  className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                  onMouseEnter={() => onLegendHover(index)}
                  onMouseLeave={onLegendLeave}
                  style={{
                    opacity: activeIndex === null || activeIndex === index ? 1 : 0.4,
                    transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span 
                    className="text-xs sm:text-sm capitalize"
                    style={{ 
                      color: COLORS[index % COLORS.length],
                      fontWeight: activeIndex === index ? '600' : '500'
                    }}
                  >
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-64 sm:h-80 flex items-center justify-center">
            <p className="text-slate-400 text-sm">No expense data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
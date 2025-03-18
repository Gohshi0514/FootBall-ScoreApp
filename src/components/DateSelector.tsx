import React, { useEffect } from 'react';

interface DateSelectorProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, setSelectedDate }) => {
  const generateTabs = () => {
    const today = new Date();
    const tabs = [];
    const daysBeforeToday = 4;
    const daysAfterToday = 4;

    for (let i = -daysBeforeToday; i <= daysAfterToday; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      tabs.push(date.toISOString().split('T')[0]);
    }
    return tabs;
  };

  const getDayOfWeek = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return today.toDateString() === date.toDateString();
  };

  // 初回レンダリング時にselectedDateがtabsに含まれていない場合はtabsの先頭を選択する
  useEffect(() => {
    const tabs = generateTabs();
    if (!tabs.includes(selectedDate)) {
      setSelectedDate(tabs[4]); // 今日を選択
    }
  }, [selectedDate, setSelectedDate]);

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-4">試合日を選択</h2>

      <div className="relative">
        <div className="overflow-x-auto pb-1 hide-scrollbar">
          <div className="flex space-x-1 md:space-x-2">
            {generateTabs().map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`
                  flex-none px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 ease-in-out
                  ${selectedDate === date
                    ? 'bg-gradient-to-r from-blue-800 to-purple-800 text-white font-medium shadow-md transform scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                  ${isToday(date) && selectedDate !== date ? 'border-2 border-blue-500' : ''}
                `}
              >
                <div className="text-center">
                  <div className="text-sm md:text-base">{formatDateForDisplay(date)}</div>
                  <div className={`text-xs mt-1 ${selectedDate === date ? 'text-blue-100' : 'text-gray-500'}`}>
                    ({getDayOfWeek(date)})
                    {isToday(date) && <span className="ml-1 text-xs">今日</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default DateSelector;

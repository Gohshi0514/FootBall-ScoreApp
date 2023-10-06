import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

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

  return (
    <FormControl>
      <InputLabel htmlFor="date-native-select">日付を選択</InputLabel>
      <NativeSelect
        className='w-full'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        inputProps={{
          name: 'date',
          id: 'date-native-select',
        }}
      >
        {generateTabs().map(date => (
          <option key={date} value={date}>
            {date.split('-').slice(1).join('/')} ({getDayOfWeek(date)})
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default DateSelector;

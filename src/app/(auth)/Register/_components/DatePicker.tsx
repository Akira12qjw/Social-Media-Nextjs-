import React, { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  onDateChange?: (type: string, value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  const months = useMemo(
    () => [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    []
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  const handleDateChange = (type: string, value: string) => {
    if (onDateChange) {
      onDateChange(type, value);
    }
  };

  return (
    <div className="flex gap-2">
      <Select onValueChange={(value) => handleDateChange("day", value)}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Ngày" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectGroup>
            <SelectLabel>Ngày</SelectLabel>
            {days.map((day) => (
              <SelectItem
                className="cursor-pointer"
                key={`day-${day}`}
                value={day.toString()}
              >
                {day}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleDateChange("month", value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Tháng" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectGroup>
            <SelectLabel>Tháng</SelectLabel>
            {months.map((month, index) => (
              <SelectItem
                key={`month-${index}`}
                value={(index + 1).toString()}
                className="cursor-pointer hover:bg-slate-100"
              >
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleDateChange("year", value)}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Năm" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectGroup>
            <SelectLabel>Năm</SelectLabel>
            {years.map((year) => (
              <SelectItem
                key={`year-${year}`}
                value={year.toString()}
                className="cursor-pointer hover:bg-slate-100"
              >
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DatePicker;

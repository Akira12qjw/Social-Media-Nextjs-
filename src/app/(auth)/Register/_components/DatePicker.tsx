/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from "react";
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
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [error, setError] = useState<string>("");

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const minAge = 13; // Minimum age requirement
    return Array.from({ length: 100 }, (_, i) => currentYear - minAge - i);
  }, []);

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

  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return 31;

    const monthNumber = parseInt(month);
    const yearNumber = parseInt(year);

    if (monthNumber === 2) {
      // Check for leap year
      return yearNumber % 4 === 0 &&
        (yearNumber % 100 !== 0 || yearNumber % 400 === 0)
        ? 29
        : 28;
    }

    return [4, 6, 9, 11].includes(monthNumber) ? 30 : 31;
  };

  const days = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [selectedMonth, selectedYear]);

  const validateDate = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const daysInSelectedMonth = getDaysInMonth(selectedMonth, selectedYear);
      if (parseInt(selectedDay) > daysInSelectedMonth) {
        setError(`Tháng ${selectedMonth} chỉ có ${daysInSelectedMonth} ngày`);
        return false;
      }
    }
    setError("");
    return true;
  };

  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      validateDate();
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  const handleDateChange = (type: string, value: string) => {
    if (type === "day") {
      setSelectedDay(value);
    } else if (type === "month") {
      setSelectedMonth(value);
      // Reset day if it becomes invalid with new month
      if (selectedDay) {
        const daysInNewMonth = getDaysInMonth(value, selectedYear);
        if (parseInt(selectedDay) > daysInNewMonth) {
          setSelectedDay("");
        }
      }
    } else if (type === "year") {
      setSelectedYear(value);
      // Reset day if it becomes invalid with new year (for February in leap years)
      if (selectedDay && selectedMonth) {
        const daysInNewYear = getDaysInMonth(selectedMonth, value);
        if (parseInt(selectedDay) > daysInNewYear) {
          setSelectedDay("");
        }
      }
    }

    if (onDateChange) {
      onDateChange(type, value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Select
          value={selectedDay}
          onValueChange={(value) => handleDateChange("day", value)}
        >
          <SelectTrigger className="w-24 ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none">
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

        <Select
          value={selectedMonth}
          onValueChange={(value) => handleDateChange("month", value)}
        >
          <SelectTrigger className="w-32 ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none">
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

        <Select
          value={selectedYear}
          onValueChange={(value) => handleDateChange("year", value)}
        >
          <SelectTrigger className="w-28 ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none">
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
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;

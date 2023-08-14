import React, { useState } from 'react';
import './SchoolSchedule.css'; 

// Define the structure of a Period object
interface Period {
  id: number;
  name: string;
  week1: string;
  week2: string;
}

// Initial data for periods with example values
const initialPeriods: Period[] = [
  { id: 1, name: 'Period 1', week1: 'Math', week2: 'English' },
  { id: 2, name: 'Period 2', week1: 'Science', week2: 'History' },
  { id: 3, name: 'Period 3', week1: 'Science', week2: 'History' },
];

// List of available subjects
const subjects = ['Math', 'English', 'Science', 'History'];

// SchoolSchedule component using a Functional Component with React hooks
const SchoolSchedule: React.FC = () => {
  // State variables to track the current week and periods
  const [currentWeek, setCurrentWeek] = useState(1);
  const [periods, setPeriods] = useState(initialPeriods);

  // Handler for changing the current week
  const handleWeekChange = (week: number) => {
    setCurrentWeek(week);
  };

  // Handler for changing the selected subject for a specific period and week
  const handlePeriodChange = (id: number, week: number, value: string) => {
    // Update the periods array with the new subject
    const updatedPeriods = periods.map(period =>
      period.id === id
        ? week === 1
          ? { ...period, week1: value }
          : { ...period, week2: value }
        : period
    );
    // Update the periods state with the updated array
    setPeriods(updatedPeriods);
  };

  return (
    <div className="school-schedule">
      {/* Section for selecting the current week */}
      <div className="week-selector">
        <button className={currentWeek === 1 ? 'active' : ''} onClick={() => handleWeekChange(1)}>
          Week 1
        </button>
        <button className={currentWeek === 2 ? 'active' : ''} onClick={() => handleWeekChange(2)}>
          Week 2
        </button>
      </div>
      {/* Section for displaying and editing periods */}
      <div className="schedule">
        {periods.map(period => (
          <div key={period.id} className="period">
            <h3>{period.name}</h3>
            {/* Dropdown for selecting the subject */}
            <select
              value={currentWeek === 1 ? period.week1 : period.week2}
              onChange={e => handlePeriodChange(period.id, currentWeek, e.target.value)}
            >
              {/* Mapping over subjects to create option elements */}
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolSchedule;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './SchoolSchedule.css';

interface Subject {
  subject_id: number;
  subject_name: string;
}

interface Period {
  id: number;
  name: string;
  week1: string;
  week2: string;
}

const initialPeriods: Period[] = [
  { id: 1, name: 'Period 1', week1: 'Math', week2: 'English' },
  { id: 2, name: 'Period 2', week1: 'Science', week2: 'History' },
  { id: 3, name: 'Period 3', week1: 'Science', week2: 'History' },
];

const SchoolSchedule: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [periods, setPeriods] = useState(initialPeriods);
  const [subjects, setSubjects] = useState<Subject[]>([]); // State for fetched subjects

  useEffect(() => {
    // Fetch subjects from the database
    axios.get('/api/subjects') // Replace with your API endpoint
      .then(response => {
        const fetchedSubjects: Subject[] = response.data;
        setSubjects(fetchedSubjects); // Set subjects in component state
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  const handleWeekChange = (week: number) => {
    setCurrentWeek(week);
  };

  const handlePeriodChange = (id: number, week: number, value: string) => {
    const updatedPeriods = periods.map(period =>
      period.id === id
        ? week === 1
          ? { ...period, week1: value }
          : { ...period, week2: value }
        : period
    );
    setPeriods(updatedPeriods);
  };

  return (
    <div className="school-schedule">
      <div className="week-selector">
        <button className={currentWeek === 1 ? 'active' : ''} onClick={() => handleWeekChange(1)}>
          Week 1
        </button>
        <button className={currentWeek === 2 ? 'active' : ''} onClick={() => handleWeekChange(2)}>
          Week 2
        </button>
      </div>
      <div className="schedule">
        {periods.map(period => (
          <div key={period.id} className="period">
            <h3>{period.name}</h3>
            <select
              value={currentWeek === 1 ? period.week1 : period.week2}
              onChange={e => handlePeriodChange(period.id, currentWeek, e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject.subject_id} value={subject.subject_name}>
                  {subject.subject_name}
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

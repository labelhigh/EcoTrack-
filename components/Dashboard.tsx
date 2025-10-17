import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './ui/Card';
import { DASHBOARD_STATS, PROJECTS } from '../constants';
import { ProjectStatus, AppEvent } from '../types';
import { MapIcon, ClockIcon, XCircleIcon } from './icons';

const COLORS = {
  [ProjectStatus.Active]: '#22c55e', // green-500
  [ProjectStatus.Developing]: '#f97316', // orange-500
  [ProjectStatus.Validating]: '#3b82f6', // blue-500
  [ProjectStatus.Closed]: '#6b7280', // gray-500
};

// Reminder Modal Component
interface ReminderModalProps {
  event: AppEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventId: number, reminderDate: Date | null) => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ event, isOpen, onClose, onSave }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (event?.reminder) {
      const reminder = event.reminder;
      // Format to YYYY-MM-DD
      const yyyy = reminder.getFullYear();
      const mm = String(reminder.getMonth() + 1).padStart(2, '0');
      const dd = String(reminder.getDate()).padStart(2, '0');
      setDate(`${yyyy}-${mm}-${dd}`);
      
      // Format to HH:mm
      const hh = String(reminder.getHours()).padStart(2, '0');
      const min = String(reminder.getMinutes()).padStart(2, '0');
      setTime(`${hh}:${min}`);
    } else {
      // Reset when opening for an event without a reminder
      setDate('');
      setTime('');
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSave = () => {
    if (date && time) {
      const newReminder = new Date(`${date}T${time}`);
      onSave(event.id, newReminder);
    }
  };
  
  const handleClear = () => {
    onSave(event.id, null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">設定提醒</h3>
            <p className="text-gray-600 mt-1">任務: {event.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircleIcon className="w-7 h-7"/>
          </button>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="reminder-date" className="block text-sm font-medium text-gray-700">日期</label>
              <input 
                type="date" 
                id="reminder-date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="reminder-time" className="block text-sm font-medium text-gray-700">時間</label>
              <input 
                type="time" 
                id="reminder-time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row-reverse gap-3">
          <button 
            onClick={handleSave} 
            disabled={!date || !time}
            className="w-full sm:w-auto px-5 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            儲存提醒
          </button>
          {event.reminder && (
            <button 
              onClick={handleClear} 
              className="w-full sm:w-auto px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-sm"
            >
              清除提醒
            </button>
          )}
          <button 
            onClick={onClose} 
            className="w-full sm:w-auto px-5 py-2 bg-white text-gray-700 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
        </div>
      </Card>
    </div>
  );
};

const ProjectStatusFilters: React.FC<{}> = () => {
  const statuses = Object.values(ProjectStatus);
  return (
    <div className="flex space-x-2">
      {statuses.map(status => (
        <button key={status} className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          {status}
        </button>
      ))}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const { projectsSummary, emissionReduction } = DASHBOARD_STATS;
  const [events, setEvents] = useState<AppEvent[]>(DASHBOARD_STATS.events);
  const [isReminderModalOpen, setReminderModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [dueReminderIds, setDueReminderIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const newlyDueIds = new Set<number>();
      
      events.forEach(event => {
        if (event.reminder && now >= event.reminder && !dueReminderIds.has(event.id)) {
          newlyDueIds.add(event.id);
        }
      });

      if (newlyDueIds.size > 0) {
        setDueReminderIds(prev => new Set([...Array.from(prev), ...Array.from(newlyDueIds)]));
      }
    }, 10000); // Check for due reminders every 10 seconds

    return () => clearInterval(intervalId);
  }, [events, dueReminderIds]);

  const handleOpenReminderModal = (event: AppEvent) => {
    setSelectedEvent(event);
    setReminderModalOpen(true);
  };
  
  const handleCloseReminderModal = () => {
    setReminderModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveReminder = (eventId: number, reminderDate: Date | null) => {
    setEvents(prevEvents =>
      prevEvents.map(e =>
        e.id === eventId ? { ...e, reminder: reminderDate } : e
      )
    );
    if (reminderDate === null || reminderDate > new Date()) {
       setDueReminderIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
    handleCloseReminderModal();
  };

  const formatReminderDate = (date: Date) => {
    return date.toLocaleString('zh-TW', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">儀表板</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">專案總覽</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={projectsSummary} cx="50%" cy="50%" labelLine={false} outerRadius={85} fill="#8884d8" dataKey="value">
                  {projectsSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as ProjectStatus]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{fontSize: "14px"}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">減排總量 (tCO₂e)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={emissionReduction} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                <Legend wrapperStyle={{fontSize: "14px"}}/>
                <Bar dataKey="reduction" fill="#22c55e" name="年度減排量" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">事件與任務</h2>
            <ul className="space-y-4">
            {events.map(event => (
                <li key={event.id} className={`p-2 -m-2 rounded-lg transition-all ${dueReminderIds.has(event.id) ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-white' : ''}`}>
                    <div className="flex items-start">
                        <div className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${event.overdue ? 'bg-red-500' : 'bg-primary-500'}`}></div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-800">{event.title}</p>
                            <p className={`text-sm ${event.overdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>{event.due}</p>
                            {event.reminder && (
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <ClockIcon className="w-3.5 h-3.5 mr-1.5" />
                                <span>提醒: {formatReminderDate(event.reminder)}</span>
                              </div>
                            )}
                        </div>
                        <button onClick={() => handleOpenReminderModal(event)} className="ml-2 text-gray-400 hover:text-primary-600 flex-shrink-0" title="設定提醒">
                           <ClockIcon className="w-5 h-5" />
                        </button>
                    </div>
                </li>
            ))}
            </ul>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">專案地點分佈</h2>
              <ProjectStatusFilters />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <MapIcon className="h-16 w-16 mx-auto" />
                    <p className="mt-2">專案地圖</p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-y-auto h-96 pr-2 -mr-2">
                  <ul className="space-y-3">
                  {PROJECTS.map(project => (
                    <li key={project.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <img src={project.coverImage} alt={project.name} className="w-20 h-14 rounded-md object-cover" />
                      <div className="ml-4 flex-1">
                          <p className="font-semibold text-gray-800">{project.name}</p>
                          <p className="text-sm text-gray-500">{project.location}</p>
                      </div>
                       <span className={`px-2.5 py-1 text-xs font-semibold rounded-full`} style={{ backgroundColor: `${COLORS[project.status]}20`, color: COLORS[project.status] }}>
                          {project.status}
                        </span>
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
            </div>
        </Card>
      </div>

      <ReminderModal
        event={selectedEvent}
        isOpen={isReminderModalOpen}
        onClose={handleCloseReminderModal}
        onSave={handleSaveReminder}
      />
    </div>
  );
};

export default Dashboard;
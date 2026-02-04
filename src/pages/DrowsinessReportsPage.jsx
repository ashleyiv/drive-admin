import { useState, useMemo } from 'react';
import { Calendar, Filter, AlertTriangle, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockDrowsinessReports } from '../data/mockData';
import { format, startOfDay, endOfDay, isWithinInterval, parseISO } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ITEMS_PER_PAGE = 5;

export function DrowsinessReportsPage() {
  const [levelFilter, setLevelFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReports = useMemo(() => {
    let dateFilteredReports = mockDrowsinessReports;

    if (startDate && endDate) {
      const start = startOfDay(parseISO(startDate));
      const end = endOfDay(parseISO(endDate));
      dateFilteredReports = mockDrowsinessReports.filter(report =>
        isWithinInterval(new Date(report.timestamp), { start, end })
      );
    } else if (startDate) {
      const start = startOfDay(parseISO(startDate));
      dateFilteredReports = mockDrowsinessReports.filter(report =>
        new Date(report.timestamp) >= start
      );
    } else if (endDate) {
      const end = endOfDay(parseISO(endDate));
      dateFilteredReports = mockDrowsinessReports.filter(report =>
        new Date(report.timestamp) <= end
      );
    }

    if (levelFilter !== 'all') {
      dateFilteredReports = dateFilteredReports.filter(
        report => report.drowsinessLevel === parseInt(levelFilter)
      );
    }

    return dateFilteredReports;
  }, [startDate, endDate, levelFilter]);

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [startDate, endDate, levelFilter]);

  const summary = useMemo(() => {
    const total = filteredReports.length;
    const level1 = filteredReports.filter(r => r.drowsinessLevel === 1).length;
    const level2 = filteredReports.filter(r => r.drowsinessLevel === 2).length;
    const level3 = filteredReports.filter(r => r.drowsinessLevel === 3).length;
    const emergencyContacted = filteredReports.filter(r => r.emergencyContacted).length;

    const avgEyeClosure = filteredReports.length > 0
      ? filteredReports.reduce((sum, r) => sum + r.eyeClosurePercentage, 0) / filteredReports.length
      : 0;

    const avgMouthRatio = filteredReports.length > 0
      ? filteredReports.reduce((sum, r) => sum + r.mouthAspectRatio, 0) / filteredReports.length
      : 0;

    const avgHeadTilt = filteredReports.length > 0
      ? filteredReports.reduce((sum, r) => sum + r.headTiltAngle, 0) / filteredReports.length
      : 0;

    const avgYawnFreq = filteredReports.length > 0
      ? filteredReports.reduce((sum, r) => sum + r.yawnFrequency, 0) / filteredReports.length
      : 0;

    return {
      total,
      level1,
      level2,
      level3,
      emergencyContacted,
      avgEyeClosure,
      avgMouthRatio,
      avgHeadTilt,
      avgYawnFreq,
    };
  }, [filteredReports]);

  const levelDistribution = [
    { level: 'Level 1', count: summary.level1, color: '#FCD34D' },
    { level: 'Level 2', count: summary.level2, color: '#FB923C' },
    { level: 'Level 3', count: summary.level3, color: '#EF4444' },
  ];

  const metricsData = [
    { metric: 'Eye Closure', value: summary.avgEyeClosure.toFixed(1) },
    { metric: 'Mouth Ratio', value: (summary.avgMouthRatio * 100).toFixed(1) },
    { metric: 'Head Tilt', value: summary.avgHeadTilt.toFixed(1) },
    { metric: 'Yawn Freq', value: summary.avgYawnFreq.toFixed(1) },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 1: return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 2: return 'bg-orange-100 text-orange-700 border-orange-300';
      case 3: return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const handleExport = () => {
    const headers = [
      'User Name',
      'Date & Time',
      'Eye Closure %',
      'Mouth Ratio',
      'Head Tilt (°)',
      'Yawn Frequency',
      'Drowsiness Level',
      'Emergency Contacted'
    ];

    const rows = filteredReports.map(report => [
      report.userName,
      format(new Date(report.timestamp), 'MMM dd, yyyy HH:mm:ss'),
      report.eyeClosurePercentage,
      report.mouthAspectRatio.toFixed(2),
      report.headTiltAngle,
      report.yawnFrequency,
      report.drowsinessLevel,
      report.emergencyContacted ? 'Yes' : 'No'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `drowsiness_reports_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Drowsiness Reports Summary</h1>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-md shadow-blue-100 border border-blue-100">
            <Calendar size={18} className="text-blue-600" />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent border-none focus:outline-none text-sm font-medium text-gray-700 cursor-pointer" placeholder="Start Date" />
            <span className="text-gray-400">-</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent border-none focus:outline-none text-sm font-medium text-gray-700 cursor-pointer" placeholder="End Date" />
          </div>

          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-md shadow-blue-100 border border-blue-100">
            <Filter size={18} className="text-blue-600" />
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="bg-transparent border-none focus:outline-none text-sm font-medium text-gray-700 cursor-pointer">
              <option value="all">All Levels</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
          </div>

          <button onClick={handleExport} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-md shadow-blue-200">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100 hover:shadow-xl transition-shadow duration-200">
          <p className="text-sm text-gray-600 mb-1">Total Reports</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{summary.total}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 shadow-lg shadow-yellow-100 border border-yellow-200 hover:shadow-xl transition-shadow duration-200">
          <p className="text-sm text-yellow-700 font-semibold mb-1">Level 1</p>
          <p className="text-3xl font-bold text-yellow-800">{summary.level1}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg shadow-orange-100 border border-orange-200 hover:shadow-xl transition-shadow duration-200">
          <p className="text-sm text-orange-700 font-semibold mb-1">Level 2</p>
          <p className="text-3xl font-bold text-orange-800">{summary.level2}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 shadow-lg shadow-red-100 border border-red-200 hover:shadow-xl transition-shadow duration-200">
          <p className="text-sm text-red-700 font-semibold mb-1">Level 3</p>
          <p className="text-3xl font-bold text-red-800">{summary.level3}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 shadow-lg shadow-purple-100 border border-purple-200 hover:shadow-xl transition-shadow duration-200">
          <p className="text-sm text-purple-700 font-semibold mb-1">Emergency Calls</p>
          <p className="text-3xl font-bold text-purple-800">{summary.emergencyContacted}</p>
        </div>
      </div>

      {/* Charts & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Level Distribution */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Alert Level Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={levelDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
              <XAxis dataKey="level" fontSize={12} stroke="#64748B" />
              <YAxis fontSize={12} stroke="#64748B" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: '1px solid #DBEAFE', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {levelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Average Metrics */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Average Metrics</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={metricsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
              <XAxis type="number" fontSize={12} stroke="#64748B" />
              <YAxis dataKey="metric" type="category" width={100} fontSize={12} stroke="#64748B" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: '1px solid #DBEAFE', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" fill="url(#metricsGradient)" radius={[0, 8, 8, 0]} />
              <defs>
                <linearGradient id="metricsGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-100 p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Detailed Reports</h2>
          {filteredReports.length > ITEMS_PER_PAGE && (
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {paginatedReports.length > 0 ? paginatedReports.map((report) => (
            <div key={report.id} className="p-4 border border-blue-100 rounded-xl hover:bg-blue-50/50 transition-all duration-200 hover:shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                    {report.userName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{report.userName}</p>
                    <p className="text-xs text-gray-500">{format(new Date(report.timestamp), 'MMM dd, yyyy HH:mm:ss')}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(report.drowsinessLevel)}`}>Level {report.drowsinessLevel}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-sm bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-gray-600">Eye Closure</p>
                  <p className="font-semibold text-gray-900">{report.eyeClosurePercentage}%</p>
                </div>
                <div className="text-sm bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-gray-600">Mouth Ratio</p>
                  <p className="font-semibold text-gray-900">{report.mouthAspectRatio.toFixed(2)}</p>
                </div>
                <div className="text-sm bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-gray-600">Head Tilt</p>
                  <p className="font-semibold text-gray-900">{report.headTiltAngle}°</p>
                </div>
                <div className="text-sm bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-gray-600">Yawn Frequency</p>
                  <p className="font-semibold text-gray-900">{report.yawnFrequency}</p>
                </div>
              </div>

              {report.emergencyContacted && (
                <div className="mt-3 flex items-center gap-2 text-red-600 text-sm font-semibold bg-red-50 rounded-lg p-2 border border-red-200">
                  <AlertTriangle size={14} />
                  <span>Emergency contact notified</span>
                </div>
              )}
            </div>
          )) : (
            <div className="text-center py-12">
              <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No reports found for the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

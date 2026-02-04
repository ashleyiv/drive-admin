import { AlertTriangle, Bell, BellOff, MapPin, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockDrowsinessReports } from '../data/mockData';
import { format } from 'date-fns';
import { useState, useMemo } from 'react';

export function ActiveAlertsPage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Only show Level 2 and Level 3 alerts (moderate to critical drowsiness)
  // Sort by most recent first
  const alerts = useMemo(() => {
    return mockDrowsinessReports
      .filter(r => r.drowsinessLevel >= 2)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, []);

  const criticalAlerts = alerts.filter(a => a.drowsinessLevel === 3);
  const warningAlerts = alerts.filter(a => a.drowsinessLevel === 2);

  // Pagination calculations
  const totalPages = Math.ceil(alerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAlerts = alerts.slice(startIndex, endIndex);

  // Split paginated alerts by level
  const paginatedCritical = paginatedAlerts.filter(a => a.drowsinessLevel === 3);
  const paginatedWarning = paginatedAlerts.filter(a => a.drowsinessLevel === 2);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const getLevelColor = (level) => {
    return level === 3 ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50';
  };

  const getLevelIcon = (level) => {
    return level === 3 ? 'text-red-600' : 'text-orange-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Active Drowsiness Alerts</h1>
          <p className="text-gray-600">Real-time monitoring of critical and warning level drowsiness events</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 shadow-md">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-red-700">
              {criticalAlerts.length} Critical
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 shadow-md">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-orange-700">
              {warningAlerts.length} Warning
            </span>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {paginatedCritical.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={24} className="text-red-600" />
            <h2 className="text-xl font-bold text-red-600">Critical Alerts - Level 3</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4 bg-red-50 rounded-xl p-3 border border-red-200">
            Emergency contact has been notified. Immediate intervention recommended.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {paginatedCritical.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg shadow-red-100 p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-200`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-red-600 shadow-md">
                      <AlertTriangle size={24} className="text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        <User size={16} />
                        {alert.userName}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock size={14} />
                        {format(new Date(alert.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-full shadow-md">
                      CRITICAL
                    </span>
                    {alert.emergencyContacted && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
                        <Bell size={10} />
                        Emergency Notified
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-3 border-2 border-red-200">
                    <p className="text-xs text-gray-600 mb-1">Eye Closure</p>
                    <p className="text-2xl font-bold text-gray-900">{alert.eyeClosurePercentage}%</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-300"
                        style={{ width: `${alert.eyeClosurePercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-3 border-2 border-red-200">
                    <p className="text-xs text-gray-600 mb-1">Mouth Ratio</p>
                    <p className="text-2xl font-bold text-gray-900">{alert.mouthAspectRatio.toFixed(2)}</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-300"
                        style={{ width: `${alert.mouthAspectRatio * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-3 border-2 border-red-200">
                    <p className="text-xs text-gray-600 mb-1">Head Tilt</p>
                    <p className="text-2xl font-bold text-gray-900">{alert.headTiltAngle}°</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-300"
                        style={{ width: `${(alert.headTiltAngle / 45) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-3 border-2 border-red-200">
                    <p className="text-xs text-gray-600 mb-1">Yawn Frequency</p>
                    <p className="text-2xl font-bold text-gray-900">{alert.yawnFrequency}</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-300"
                        style={{ width: `${(alert.yawnFrequency / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin size={14} />
                    <span>Vehicle Speed: {alert.speed} km/h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning Alerts */}
      {paginatedWarning.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell size={24} className="text-orange-600" />
            <h2 className="text-xl font-bold text-orange-600">Warning Alerts - Level 2</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4 bg-orange-50 rounded-xl p-3 border border-orange-200">
            Moderate drowsiness detected. Alarm and voice warning activated.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {paginatedWarning.map((alert) => (
              <div
                key={alert.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg shadow-orange-100 p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-orange-600 shadow-md">
                      <Bell size={24} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        <User size={16} />
                        {alert.userName}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock size={14} />
                        {format(new Date(alert.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-xs font-bold rounded-full shadow-md">
                    WARNING
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 border-2 border-orange-200">
                    <p className="text-xs text-gray-600 mb-1">Eye Closure</p>
                    <p className="text-2xl font-bold text-gray-900">{alert.eyeClosurePercentage}%</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-orange-600 rounded-full transition-all duration-300"
                        style={{ width: `${alert.eyeClosurePercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 border-2 border-orange-200">
                    <p className="text-xs text-gray-600 mb-1">Mouth Ratio</p>
                    <p className="text-2xl font-bold text-gray-900">{alert.mouthAspectRatio.toFixed(2)}</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-orange-600 rounded-full transition-all duration-300"
                        style={{ width: `${alert.mouthAspectRatio * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 border-2 border-orange-200">
                    <p className="text-xs text-gray-600 mb-1">Head Tilt</p>
                    <p className="text-2xl font-bold text-gray-900">{alert.headTiltAngle}°</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-orange-600 rounded-full transition-all duration-300"
                        style={{ width: `${(alert.headTiltAngle / 45) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 border-2 border-orange-200">
                    <p className="text-xs text-gray-600 mb-1">Yawn Frequency</p>
                    <p className="text-2xl font-bold text-gray-900">{alert.yawnFrequency}</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-orange-600 rounded-full transition-all duration-300"
                        style={{ width: `${(alert.yawnFrequency / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin size={14} />
                    <span>Vehicle Speed: {alert.speed} km/h</span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    Alarm & Voice Alert Sent
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {alerts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <BellOff size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">No Active Alerts</p>
          <p className="text-gray-500">All drivers are safe and alert. Level 2 and Level 3 alerts will appear here when detected.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, alerts.length)} of {alerts.length} alerts
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

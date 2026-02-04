import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Activity, AlertTriangle } from 'lucide-react';
import { mockUsers, monthlyUserData, drowsinessLevelData } from '../data/mockData';

export function DashboardPage() {
  const activeUsers = mockUsers.filter(u => u.status === 'Active').length;
  const totalUsers = mockUsers.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-lg">+400</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{totalUsers}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <Activity className="text-green-600" size={24} />
            </div>
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-lg">+400</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Active Users</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{activeUsers}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-lg">+12%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Reports This Month</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">85</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Count Per Month */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">User Count Per Month</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-100">
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
              <p className="text-green-600 text-sm font-semibold">+400</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <p className="text-gray-600 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">{activeUsers}</p>
              <p className="text-green-600 text-sm font-semibold">+400</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyUserData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '12px', 
                  border: '1px solid #DBEAFE',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                dot={{ fill: '#3B82F6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Total Driver Users */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Total Driver Users</h2>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6">{totalUsers}</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={monthlyUserData.slice(-4)}>
              <Bar dataKey="users" fill="url(#blueGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drowsiness Alert Levels - Pie Chart */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Drowsiness Alert Levels</h2>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={drowsinessLevelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ level, count }) => `${level}: ${count}`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="count"
                >
                  <Cell fill="#FCD34D" />
                  <Cell fill="#FB923C" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '12px', 
                    border: '1px solid #DBEAFE',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="text-xs text-gray-700">
              <p><span className="font-semibold">Level 1:</span> Voice warning</p>
              <p><span className="font-semibold">Level 2:</span> Alarm + voice warning</p>
              <p><span className="font-semibold">Level 3:</span> Emergency contact notified</p>
            </div>
          </div>
        </div>

        {/* Recent Reports Summary */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-100 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Alert Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Level 1 Alerts</p>
                  <p className="text-xs text-gray-600">Voice warnings only</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-300 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Level 2 Alerts</p>
                  <p className="text-xs text-gray-600">Alarm + voice warnings</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-300 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Level 3 Alerts</p>
                  <p className="text-xs text-gray-600">Emergency contacted</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
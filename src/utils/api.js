// This file is intentionally simplified to work with mock data only
// All API calls now return mock data from localStorage

import { mockUsers, mockDrowsinessReports } from "../data/mockData"

export const api = {
  // Users
  getUsers: async () => {
    // Get users from localStorage or use mock data
    const stored = localStorage.getItem("users")
    const users = stored ? JSON.parse(stored) : mockUsers
    return { success: true, users }
  },

  getUser: async id => {
    const stored = localStorage.getItem("users")
    const users = stored ? JSON.parse(stored) : mockUsers
    const user = users.find(u => u.id === id)
    return { success: true, user }
  },

  createOrUpdateUser: async user => {
    const stored = localStorage.getItem("users")
    const users = stored ? JSON.parse(stored) : mockUsers
    const index = users.findIndex(u => u.id === user.id)

    if (index >= 0) {
      users[index] = user
    } else {
      users.push(user)
    }

    localStorage.setItem("users", JSON.stringify(users))
    return { success: true, user }
  },

  archiveUser: async id => {
    const stored = localStorage.getItem("users")
    const users = stored ? JSON.parse(stored) : mockUsers
    const archivedStored = localStorage.getItem("archivedUsers")
    const archivedUsers = archivedStored ? JSON.parse(archivedStored) : []

    const index = users.findIndex(u => u.id === id)
    if (index >= 0) {
      const user = users.splice(index, 1)[0]
      archivedUsers.push({ ...user, archivedAt: new Date().toISOString() })
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("archivedUsers", JSON.stringify(archivedUsers))
    }

    return { success: true, message: "User archived successfully" }
  },

  getArchivedUsers: async () => {
    const stored = localStorage.getItem("archivedUsers")
    const users = stored ? JSON.parse(stored) : []
    return { success: true, users }
  },

  restoreUser: async id => {
    const stored = localStorage.getItem("users")
    const users = stored ? JSON.parse(stored) : mockUsers
    const archivedStored = localStorage.getItem("archivedUsers")
    const archivedUsers = archivedStored ? JSON.parse(archivedStored) : []

    const index = archivedUsers.findIndex(u => u.id === id)
    if (index >= 0) {
      const user = archivedUsers.splice(index, 1)[0]
      const { archivedAt, ...userData } = user
      users.push(userData)
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("archivedUsers", JSON.stringify(archivedUsers))
    }

    return { success: true, message: "User restored successfully" }
  },

  // Reports
  getReports: async () => {
    return { success: true, reports: mockDrowsinessReports }
  },

  createReport: async report => {
    return { success: true, report }
  }
}

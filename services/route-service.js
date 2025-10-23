import Route from '../models/route.js';

export const RouteService = {
  /**
   * Створити новий маршрут
   */
  async createRoute(userId, routeData) {
    try {
      const route = new Route({
        user: userId,
        ...routeData
      });
      await route.save();
      return route;
    } catch (error) {
      console.error('Create route error:', error);
      throw new Error('Failed to create route');
    }
  },

  /**
   * Отримати маршрут за ID
   */
  async getRouteById(routeId, userId) {
    try {
      const route = await Route.findOne({ _id: routeId, user: userId });
      if (!route) {
        throw new Error('Route not found');
      }
      return route;
    } catch (error) {
      console.error('Get route error:', error);
      throw new Error('Failed to get route');
    }
  },

  /**
   * Отримати всі маршрути користувача
   */
  async getUserRoutes(userId, filters = {}) {
    try {
      const query = { user: userId };
      
      // Додаємо фільтри
      if (filters.status) {
        query.status = filters.status;
      }
      if (filters.dateFrom) {
        query.startTime = { $gte: new Date(filters.dateFrom) };
      }
      if (filters.dateTo) {
        query.endTime = { $lte: new Date(filters.dateTo) };
      }

      const routes = await Route.find(query)
        .sort({ createdAt: -1 })
        .limit(filters.limit || 10)
        .skip(filters.skip || 0);

      return routes;
    } catch (error) {
      console.error('Get user routes error:', error);
      throw new Error('Failed to get user routes');
    }
  },

  /**
   * Оновити маршрут
   */
  async updateRoute(routeId, userId, updates) {
    try {
      const route = await Route.findOneAndUpdate(
        { _id: routeId, user: userId },
        { $set: updates },
        { new: true }
      );
      
      if (!route) {
        throw new Error('Route not found');
      }
      
      return route;
    } catch (error) {
      console.error('Update route error:', error);
      throw new Error('Failed to update route');
    }
  },

  /**
   * Видалити маршрут
   */
  async deleteRoute(routeId, userId) {
    try {
      const route = await Route.findOneAndDelete({ _id: routeId, user: userId });
      if (!route) {
        throw new Error('Route not found');
      }
      return route;
    } catch (error) {
      console.error('Delete route error:', error);
      throw new Error('Failed to delete route');
    }
  }
};

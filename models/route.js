import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  origin: {
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  destination: {
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  constraints: {
    searchRadius: Number,
    maxDeadhead: Number,
    minPrice: Number,
    minRate: Number,
    trailerType: String
  },
  optimizedRoute: {
    days: [{
      date: Date,
      stops: [{
        type: {
          type: String,
          enum: ['pickup', 'delivery', 'rest', 'fuel']
        },
        location: {
          city: String,
          state: String,
          coordinates: {
            lat: Number,
            lng: Number
          }
        },
        scheduledTime: Date,
        loadId: String,
        duration: Number // in minutes
      }],
      totalMiles: Number,
      drivingHours: Number,
      revenue: Number
    }],
    summary: {
      totalRevenue: Number,
      totalMiles: Number,
      loadedMiles: Number,
      deadheadMiles: Number,
      fuelCost: Number,
      estimatedProfit: Number
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Автоматично оновлюємо updatedAt при змінах
routeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Route', routeSchema);

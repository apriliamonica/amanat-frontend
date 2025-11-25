// src/components/modals/TrackingTab.jsx
import React, { useMemo } from 'react';
// Module-level stable timestamp to avoid calling Date.now() during render
const APP_NOW = Date.now();
import { CheckCircle, Circle, Clock, User } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const TrackingTab = ({ mail }) => {
  // Gunakan nilai `now` yang ditentukan pada waktu modul di-load untuk
  // menghindari pemanggilan `Date.now()` selama render (lint-friendly).
  const now = APP_NOW;
  // Mock tracking data - use useMemo to avoid impure function calls
  const trackingHistory = useMemo(() => {
    if (mail.trackingHistory && mail.trackingHistory.length > 0) {
      return mail.trackingHistory;
    }
    
    return [
      {
        id: 1,
        status: 'Surat Diterima',
        timestamp: new Date(now - 5 * 24 * 60 * 60 * 1000),
        user: 'Admin Sekretariat',
        notes: 'Surat masuk diterima dan diregistrasi'
      },
      {
        id: 2,
        status: 'Disposisi Kepala Dinas',
        timestamp: new Date(now - 4 * 24 * 60 * 60 * 1000),
        user: 'Kepala Dinas',
        notes: 'Untuk ditindaklanjuti oleh Kabid Teknik'
      },
      {
        id: 3,
        status: 'Diteruskan ke Kabid',
        timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000),
        user: 'Sekretaris',
        notes: 'Diteruskan sesuai disposisi'
      },
      {
        id: 4,
        status: 'Sedang Diproses',
        timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000),
        user: 'Kabid Teknik',
        notes: 'Dalam proses peninjauan'
      }
    ];
  }, [mail.trackingHistory, now]);

  // Calculate days running with useMemo
  const daysRunning = useMemo(() => {
    if (!mail.receivedDate) return 0;
    return Math.floor((now - new Date(mail.receivedDate).getTime()) / (1000 * 60 * 60 * 24));
  }, [mail.receivedDate, now]);

  const getStatusIcon = (index, total) => {
    if (index < total - 1) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (index === total - 1) {
      return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />;
    }
    return <Circle className="w-6 h-6 text-gray-300" />;
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Status Terkini</p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {trackingHistory[trackingHistory.length - 1].status}
            </p>
          </div>
          <Clock className="w-12 h-12 text-blue-400" />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Riwayat Tracking
        </h3>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Timeline Items */}
          <div className="space-y-6">
            {trackingHistory.map((item, index) => (
              <div key={item.id} className="relative flex gap-4">
                {/* Icon */}
                <div className="relative z-10 bg-white">
                  {getStatusIcon(index, trackingHistory.length)}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {item.status}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {formatDate(item.timestamp, true)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <User className="w-4 h-4 mr-2" />
                      {item.user}
                    </div>

                    {item.notes && (
                      <p className="text-sm text-gray-700 bg-gray-50 rounded p-2 mt-2">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {trackingHistory.length}
          </p>
          <p className="text-xs text-gray-600">Total Tracking</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {trackingHistory.length - 1}
          </p>
          <p className="text-xs text-gray-600">Selesai</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-600">
            {daysRunning}
          </p>
          <p className="text-xs text-gray-600">Hari Berjalan</p>
        </div>
      </div>
    </div>
  );
};

export default TrackingTab;
import React from 'react';

export const ProfileContent = ({ user }: { user: any }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">À propos</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="space-y-3">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
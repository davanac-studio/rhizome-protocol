import React from 'react';

export const ProfileContent = ({ user }: { user: any }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-4">
        <div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="space-y-3">
              {user?.expertise && (
                <p className="text-gray-700">{user.expertise}</p>
              )}
              {user?.bio && (
                <p className="text-gray-700">{user.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
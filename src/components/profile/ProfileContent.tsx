import React from 'react';

export const ProfileContent = ({ user }: { user: any }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Informations personnelles</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nom complet</p>
                <p className="font-medium">{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nom d'utilisateur</p>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">À propos</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <p className="text-gray-700">{user.bio || "Aucune bio renseignée"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Citation</p>
                <p className="text-gray-700 italic">{user.quote || "Aucune citation"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
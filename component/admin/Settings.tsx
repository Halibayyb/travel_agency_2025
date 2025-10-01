// components/admin/Settings.tsx
"use client";

import { useState, useEffect } from "react";
import { Save, DollarSign, Package, AlertCircle, Edit2, X, Plus } from "lucide-react";
import { useTourPackages, TourPackage } from "@/src/hook/useTourPackages";

export default function SettingsDashboard() {
  const { packages, loading, updatePackage, refreshPackages } = useTourPackages();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TourPackage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const handleEdit = (pkg: TourPackage) => {
    setEditingId(pkg.id);
    setEditForm({ ...pkg });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleFieldChange = (field: keyof TourPackage, value: any) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (editForm) {
      const newFeatures = [...editForm.features];
      newFeatures[index] = value;
      setEditForm({ ...editForm, features: newFeatures });
    }
  };

  const handleAddFeature = () => {
    if (editForm) {
      setEditForm({ ...editForm, features: [...editForm.features, ''] });
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (editForm) {
      const newFeatures = editForm.features.filter((_, i) => i !== index);
      setEditForm({ ...editForm, features: newFeatures });
    }
  };

  const handleSave = async () => {
    if (!editForm || !editingId) return;

    setIsSaving(true);
    setMessage("");

    try {
      const { id, ...updates } = editForm;
      const result = await updatePackage(editingId, updates);

      if (result.success) {
        setMessage("Package updated successfully!");
        setMessageType("success");
        setEditingId(null);
        setEditForm(null);
      } else {
        setMessage(result.error || "Failed to update package");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error saving package. Please try again.");
      setMessageType("error");
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const exportPricesCSV = () => {
    const headers = ['Package ID', 'Title', 'Subtitle', 'Price (USD)', 'Description'];
    const rows = packages.map(pkg => [
      pkg.id,
      pkg.title,
      pkg.subtitle,
      pkg.price,
      pkg.description
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `tour_packages_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour packages...</p>
        </div>
      </div>
    );
  }

  const mainPackages = packages.filter(pkg => pkg.type === 'main');
  const dayPackages = packages.filter(pkg => pkg.type === 'day');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tour Package Editor</h2>
          <p className="text-sm text-gray-600 mt-1">Manage content and pricing for all tour packages</p>
        </div>
        <button
          onClick={exportPricesCSV}
          className="text-gray-400 hover:text-red-800 transition flex items-center gap-2"
          title="Export Prices"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mb-6 flex items-center gap-2 px-4 py-3 rounded-lg ${
          messageType === "success" 
            ? "bg-green-50 text-green-700 border border-green-200" 
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {messageType === "success" ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{message}</span>
        </div>
      )}

      {/* Main Tour Packages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-red-800" />
          Main Tour Packages
        </h3>
        
        <div className="space-y-4">
          {mainPackages.map((pkg) => (
            <div key={pkg.id} className="border border-gray-200 rounded-lg p-5 hover:border-red-300 transition">
              {editingId === pkg.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editForm?.title || ''}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                      <input
                        type="text"
                        value={editForm?.price || ''}
                        onChange={(e) => handleFieldChange('price', e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={editForm?.subtitle || ''}
                      onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editForm?.description || ''}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Features</label>
                      <button
                        onClick={handleAddFeature}
                        className="text-sm text-red-800 hover:text-red-900 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Feature
                      </button>
                    </div>
                    <div className="space-y-2">
                      {editForm?.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Enter feature"
                          />
                          <button
                            onClick={() => handleRemoveFeature(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition font-semibold flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{pkg.title}</h4>
                      <span className="text-lg font-bold text-red-800">${pkg.price} USD</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pkg.subtitle}</p>
                    <p className="text-xs text-gray-500 mb-3">{pkg.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="text-gray-400 hover:text-red-800 transition"
                    title="Edit Package"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Day Experience Packages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-800" />
          Day Experience Packages
        </h3>
        
        <div className="space-y-4">
          {dayPackages.map((pkg) => (
            <div key={pkg.id} className="border border-gray-200 rounded-lg p-5 hover:border-amber-300 transition">
              {editingId === pkg.id ? (
                // Edit Mode (same as above)
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editForm?.title || ''}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                      <input
                        type="text"
                        value={editForm?.price || ''}
                        onChange={(e) => handleFieldChange('price', e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={editForm?.subtitle || ''}
                      onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editForm?.description || ''}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Features</label>
                      <button
                        onClick={handleAddFeature}
                        className="text-sm text-amber-800 hover:text-amber-900 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Feature
                      </button>
                    </div>
                    <div className="space-y-2">
                      {editForm?.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Enter feature"
                          />
                          <button
                            onClick={() => handleRemoveFeature(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition font-semibold flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{pkg.title}</h4>
                      <span className="text-lg font-bold text-amber-800">${pkg.price} USD</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pkg.subtitle}</p>
                    <p className="text-xs text-gray-500 mb-3">{pkg.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="text-gray-400 hover:text-amber-800 transition"
                    title="Edit Package"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
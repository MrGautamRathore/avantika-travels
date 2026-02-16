'use client'

import { useEffect, useState, useRef } from 'react'
import { useSite } from '../../../context/site-context'
import { X, Edit, Trash2, Eye, Upload,  Plus, Check, AlertCircle, ImagesIcon } from 'lucide-react'

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function AdminGalleries() {
  const { galleries, deleteGallery, toggleGalleryStatus } = useSite()
  const [viewMode, setViewMode] = useState('grid')
  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(null)
  const [editingGallery, setEditingGallery] = useState(null)
  const [alert, setAlert] = useState({ show: false, type: '', message: '' })
  const [images, setImages] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [removedImages, setRemovedImages] = useState([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    passengerName: '',
    story: '',
    images: [],
    status: true
  })
/* 
  useEffect(() => {
    fetchGalleries()
  }, [fetchGalleries])
 */
  // Get unique locations from galleries
  const uniqueLocations = [...new Set(galleries.map(gallery => gallery.location).filter(Boolean))]

  // Filtering and sorting logic
  const filteredGalleries = galleries
    .filter((gallery) => {
      // Search filter
      if (searchTerm && !gallery.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !gallery.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !gallery.passengerName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Status filter
      if (statusFilter !== 'all') {
        const isActive = statusFilter === 'active'
        if (gallery.status !== isActive) return false
      }

      // Location filter
      if (locationFilter !== 'all' && gallery.location !== locationFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'location':
          return a.location.localeCompare(b.location)
        default:
          return 0
      }
    })

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message })
    setTimeout(() => {
      setAlert({ show: false, type: '', message: '' })
    }, 3000)
  }

  const handleAdd = () => {
    setEditingGallery(null)
    setImages([])
    setFormData({
      name: '',
      location: '',
      passengerName: '',
      story: '',
      images: [],
      status: true
    })
    setShowForm(true)
  }

  const handleEdit = (gallery) => {
    setEditingGallery(gallery)
    setImages(gallery.images || [])
    setExistingImages(gallery.images || []) // Store original images
    setSelectedFiles([]) // Clear selected files when editing
    setFormData({
      name: gallery.name,
      location: gallery.location,
      passengerName: gallery.passengerName,
      story: gallery.story,
      images: gallery.images || [],
      status: gallery.status
    })
    setShowForm(true)
  }

  const handleViewDetails = (gallery) => {
    setShowDetails(gallery)
  }

  const handleDelete = async (id) => {
      try {
        const token = localStorage.getItem('adminToken')
        console.log('token`:',token, 'token 2 : ',localStorage.getItem('token'),' id : ',id);
        
        if (!token) {
          showAlert('error', 'Authentication required. Please login again.')
          return
        }
        await deleteGallery(id, token)
        showAlert('success', 'Gallery deleted successfully!')
      } catch (error) {
        console.error('Error deleting gallery:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Error deleting gallery'
        showAlert('error', errorMessage)
      }
    
  }

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('adminToken')
      await toggleGalleryStatus(id, token)
      showAlert('success', 'Status updated successfully!')
    } catch (error) {
      showAlert('error', 'Error updating status')
    }
  }

  const handleImageRemove = (index) => {
    const removedImage = images[index]
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    // If this is an existing image being removed (not a temp/new image), track it for deletion
    if (editingGallery && removedImage && removedImage.public_id && !removedImage.public_id.startsWith('temp_')) {
      setRemovedImages(prev => [...prev, removedImage.public_id])
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({ url: URL.createObjectURL(file), public_id: `temp_${Date.now()}_${Math.random()}` }))
    setImages([...images, ...newImages])
    setSelectedFiles(files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('adminToken')

      // Create FormData for file uploads
      const formDataToSend = new FormData()

      // Add text fields
      formDataToSend.append('name', formData.name)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('passengerName', formData.passengerName)
      formDataToSend.append('story', formData.story)
      formDataToSend.append('status', formData.status.toString())

      // For editing, send the public_ids of existing images to keep
      if (editingGallery) {
        const existingImagesToKeep = images.filter(img => img.public_id && !img.public_id.startsWith('temp_'))
        formDataToSend.append('existingImages', JSON.stringify(existingImagesToKeep.map(img => img.public_id)))
      }

      // Add selected files (new uploads)
      if (selectedFiles && selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
          formDataToSend.append('images', file)
        })
      }

      const url = editingGallery ? `${API_BASE_URL}/galleries/${editingGallery._id}` : `${API_BASE_URL}/galleries`
      const method = editingGallery ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type, let browser set it for FormData
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save gallery')
      }

      const savedGallery = await response.json()

      showAlert('success', `Gallery ${editingGallery ? 'updated' : 'created'} successfully!`)
      setShowForm(false)

      // Refresh the page to update the galleries list
      window.location.reload()

    } catch (error) {
      console.error('Error saving gallery:', error)
      showAlert('error', `Error saving gallery: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Alert Component */}
      {alert.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          alert.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' :
          'bg-red-100 text-red-800 border-l-4 border-red-500'
        }`}>
          <div className="flex items-center">
            {alert.type === 'success' ? (
              <Check className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Gallery Items</h1>
            <p className="text-gray-600 mt-1">Manage your travel gallery and customer stories</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
              className="px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              {viewMode === 'grid' ? 'Table View' : 'Grid View'}
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Gallery
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Search galleries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Filter Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="location">Location A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGalleries.map((gallery) => (
              <div key={gallery._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image Grid */}
                <div className="relative h-48 overflow-hidden">
                  <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                    {gallery.images?.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative overflow-hidden">
                        <img
                          src={image.url || image}
                          alt={`${gallery.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 3 && gallery.images.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{gallery.images.length - 4}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium ${
                    gallery.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {gallery.status ? 'Active' : 'Inactive'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-black truncate">{gallery.name}</h3>
                  </div>

                  <div className="flex items-center gap-2 text-primary text-sm font-bold mb-2">
                    <span>{gallery.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <span>By {gallery.passengerName}</span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 italic">
                    "{gallery.story}"
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(gallery)}
                      className="flex-1 min-w-[80px] px-3 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(gallery)}
                      className="flex-1 min-w-[80px] px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(gallery._id)}
                      className={`flex-1 min-w-[80px] px-3 py-2 rounded-lg transition-colors flex items-center justify-center text-sm ${
                        gallery.status
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {gallery.status ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(gallery._id)}
                      className="flex-1 min-w-[80px] px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gallery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Passenger
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Images
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGalleries.map((gallery) => (
                    <tr key={gallery._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={gallery.images?.[0]?.url || gallery.images?.[0] || '/placeholder.jpg'}
                              alt={gallery.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-black">{gallery.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {gallery.story.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {gallery.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {gallery.passengerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {gallery.images?.length || 0} images
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          gallery.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {gallery.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(gallery)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(gallery)}
                            className="text-green-600 hover:text-green-900"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(gallery._id)}
                            className={`${gallery.status ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                            title={gallery.status ? 'Deactivate' : 'Activate'}
                          >
                            {gallery.status ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDelete(gallery._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {galleries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ImagesIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No galleries yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first gallery item.</p>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Gallery
            </button>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-black">
                  {editingGallery ? 'Edit Gallery' : 'Add New Gallery'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gallery Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passenger Name *
                      </label>
                      <input
                        type="text"
                        value={formData.passengerName}
                        onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Story *
                      </label>
                      <textarea
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent h-32"
                        rows="4"
                        required
                      />
                    </div>

                    {/* Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Images (Upload multiple images)
                      </label>
                      <div className="flex gap-2 mb-4">
                        <input
                          type="file"
                          ref={fileInputRef}
                          multiple
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Select Images
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {images.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img.url}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleImageRemove(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Status */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="status"
                        checked={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <label htmlFor="status" className="ml-2 text-sm text-gray-700">
                        Active Gallery
                      </label>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Name:</span>
                          <span className="ml-2 text-black">{formData.name || 'Gallery Name'}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Location:</span>
                          <span className="ml-2 text-black">{formData.location || 'Location'}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Passenger:</span>
                          <span className="ml-2 text-black">{formData.passengerName || 'Passenger Name'}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Images:</span>
                          <span className="ml-2 text-black">{images.length} uploaded</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            formData.status
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {formData.status ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      editingGallery ? 'Update Gallery' : 'Create Gallery'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-black">Gallery Details</h2>
                <button
                  onClick={() => setShowDetails(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {/* Images Grid */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {showDetails.images?.map((img, index) => (
                      <img
                        key={index}
                        src={img.url || img}
                        alt={`${showDetails.name} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Gallery Info */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-black">{showDetails.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      showDetails.status
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {showDetails.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-black">{showDetails.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Passenger Name</p>
                      <p className="text-black">{showDetails.passengerName}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Story</p>
                    <p className="text-black italic">"{showDetails.story}"</p>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Images: {showDetails.images?.length || 0}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowDetails(null)
                            handleEdit(showDetails)
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Edit Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

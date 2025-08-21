import React, { useState, useEffect } from 'react';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import { useUserStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';

const avatars = [
  { id: 1, src: image1, label: 'Alex' },
  { id: 2, src: image2, label: 'Mia' },
  { id: 3, src: image3, label: 'Ryan' },
  { id: 4, src: image4, label: 'Zoe' },
  { id: 5, src: image5, label: 'Lily' },
  { id: 6, src: image6, label: 'Ava' },
  { id: 7, src: image7, label: 'Eva' },
];

const Customize = () => {
  const [selected, setSelected] = useState(null);
  const [customName, setCustomName] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  const [nameError, setNameError] = useState('');
  const [touched, setTouched] = useState(false);
  
  const { updateAssistant, isUpdating } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (touched) {
      if (!customName.trim()) {
        setNameError('Name is required');
      } else {
        setNameError('');
      }
    }
  }, [customName, touched]);

  // Handle avatar selection
  const handleAvatarSelect = (avatar) => {
    setSelected(avatar.id);
    setActiveTab('gallery');
    setCustomName(avatar.label); // Auto-fill the name
    setNameError('');
  };

  const confirm = async () => {
    if (!customName.trim()) {
      setNameError('Name is required');
      setTouched(true);
      return;
    }
    
    if (!selected) {
      alert('Please select an avatar.');
      return;
    }
    
    const finalName = customName.trim();
    const selectedAvatar = avatars.find(a => a.id === selected);
    
    try {
      const requestData = {
        assistantName: finalName,
        imageFormGallery: selectedAvatar.src
      };
      
      await updateAssistant(requestData);
      navigate('/');      
    } catch (error) {
      console.error('Error updating assistant:', error);
      alert('Failed to update assistant. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Choose Your Assistant</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Select an avatar from our gallery</p>

        {/* Tab Navigation - Simplified to only gallery */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-3 px-6 font-medium text-sm ${activeTab === 'gallery' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Avatar Selection */}
          <div className="w-full md:w-2/3">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select an Avatar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {avatars.map((avatar) => (
                <div 
                  key={avatar.id}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-200 ease-in-out transform hover:-translate-y-1 ${selected === avatar.id ? 'ring-4 ring-indigo-500 scale-105' : 'ring-1 ring-gray-200'}`}
                >
                  {/* Image */}
                  <div className="aspect-square w-full">
                    <img
                      src={avatar.src}
                      alt={avatar.label}
                      className="w-full h-full object-cover group-hover:brightness-110 transition"
                    />
                  </div>

                  {/* Overlay with label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                    <h3 className="text-white font-medium text-sm truncate">{avatar.label}</h3>
                  </div>

                  {/* Selection indicator */}
                  {selected === avatar.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Name Input and Confirmation */}
          <div className="w-full md:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Customize Assistant</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assistant Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jarvis"
                  value={customName}
                  onChange={(e) => {
                    setCustomName(e.target.value);
                    setTouched(true);
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                    nameError ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-600">{nameError}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Name is required for your assistant</p>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Selection</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-indigo-100">
                    <img 
                      src={selected ? avatars.find(a => a.id === selected)?.src : image1} 
                      alt="Selected" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {customName.trim() || (selected ? avatars.find(a => a.id === selected)?.label : "No selection")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selected ? "Gallery avatar" : "Not selected"}
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={confirm}
                disabled={!selected || !customName.trim() || isUpdating}
                className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Confirm Assistant
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
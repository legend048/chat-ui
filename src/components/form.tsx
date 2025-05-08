import React, { useState } from 'react';

export function EdgeCaseForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',            // new
    phone: '',
    message: '',
    gender: '',
    hobbies: [],
    file: null,
    birthdate: '',
    favoriteColor: '#000000',
    day: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',            // new
    phone: '',
    message: '',
    gender: '',
    hobbies: '',
    file: '',
    birthdate: '',
    favoriteColor: '',
    day: '',
  });

  const [formSuccess, setFormSuccess] = useState('');

  // Handle changes in the form inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter((h) => h !== value);
        return { ...prev, hobbies: updated };
      });
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const msgs = { ...errors };

    // Name
    if (!formData.name || formData.name.length > 100) {
      msgs.name = 'Name is required and must be less than 100 characters.';
      isValid = false;
    } else msgs.name = '';

    // Email
    const emailPat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPat.test(formData.email)) {
      msgs.email = 'Please enter a valid email address.';
      isValid = false;
    } else msgs.email = '';

    // Password (new)
    if (!formData.password || formData.password.length < 8) {
      msgs.password = 'Password must be at least 8 characters.';
      isValid = false;
    } else msgs.password = '';

    // Phone
    const phonePat = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (formData.phone && !phonePat.test(formData.phone)) {
      msgs.phone = 'Phone number must match the format 123-456-7890.';
      isValid = false;
    } else msgs.phone = '';

    // Message
    if (formData.message.length > 1000) {
      msgs.message = 'Message is too long. Maximum 1000 characters.';
      isValid = false;
    } else msgs.message = '';

    // Gender
    if (!formData.gender) {
      msgs.gender = 'Please select a gender.';
      isValid = false;
    } else msgs.gender = '';

    // Hobbies
    if (formData.hobbies.length === 0) {
      msgs.hobbies = 'Please select at least one hobby.';
      isValid = false;
    } else msgs.hobbies = '';

    // File
    if (formData.file) {
      if (!formData.file.type.match('image.*') && !formData.file.type.match('pdf')) {
        msgs.file = 'Please upload an image (JPG/PNG) or PDF file.';
        isValid = false;
      }
      if (formData.file.size > 5_000_000) {
        msgs.file = 'File size must be less than 5MB.';
        isValid = false;
      }
    } else msgs.file = '';

    // Birthdate
    if (formData.birthdate && new Date(formData.birthdate) > new Date()) {
      msgs.birthdate = 'Date of birth cannot be in the future.';
      isValid = false;
    } else msgs.birthdate = '';

    // Favorite Color
    if (!formData.favoriteColor) {
      msgs.favoriteColor = 'Please select a color.';
      isValid = false;
    } else msgs.favoriteColor = '';

    setErrors(msgs);
    return isValid;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSuccess('Form submitted successfully!');
      console.log('Form data:', formData);
    } else {
      setFormSuccess('');
    }
  };

  return (
    <div class="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Edge Case Form</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" class="block text-gray-700 text-sm font-bold mb-2">
            Name (Required, max 100 chars)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            class="shadow border rounded w-full py-2 px-3 leading-tight"
          />
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" class="block text-gray-700 text-sm font-bold mb-2">
            Email (Required)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            class="shadow border rounded w-full py-2 px-3 leading-tight"
          />
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        </div>

        {/* Password (new) */}
        <div>
          <label htmlFor="password" class="block text-gray-700 text-sm font-bold mb-2">
            Password (min 8 chars)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            class="shadow border rounded w-full py-2 px-3 leading-tight"
          />
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" class="block text-gray-700 text-sm font-bold mb-2">
            Phone (format 123-456-7890)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            class="shadow border rounded w-full py-2 px-3 leading-tight"
          />
          <p className="text-red-500 text-xs italic">{errors.phone}</p>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" class="block text-gray-700 text-sm font-bold mb-2">
            Message (max 1000 chars)
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            class="shadow border rounded w-full py-2 px-3 leading-tight"
          />
          <p className="text-red-500 text-xs italic">{errors.message}</p>
        </div>

        {/* Gender */}
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Gender</label>
          <div class="flex space-x-4">
            {['male','female','other'].map((g) => (
              <label key={g} class="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender===g}
                  onChange={handleInputChange}
                  class="form-radio"
                />
                <span class="ml-2 capitalize">{g}</span>
              </label>
            ))}
          </div>
          <p className="text-red-500 text-xs italic">{errors.gender}</p>
        </div>

        {/* Hobbies */}
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Hobbies</label>
          <div class="flex space-x-4">
            {['reading','travelling','sports'].map((h) => (
              <label key={h} class="flex items-center">
                <input
                  type="checkbox"
                  name="hobbies"
                  value={h}
                  checked={formData.hobbies.includes(h)}
                  onChange={handleInputChange}
                  class="form-checkbox"
                />
                <span class="ml-2 capitalize">{h}</span>
              </label>
            ))}
          </div>
          <p className="text-red-500 text-xs italic">{errors.hobbies}</p>
        </div>

        {/* File */}
        <div>
          <label htmlFor="file" class="block text-gray-700 text-sm font-bold mb-2">Upload File</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg,.png,.pdf"
            onChange={handleInputChange}
            class="shadow border rounded w-full py-2 px-3 leading-tight"
          />
          <p className="text-red-500 text-xs italic">{errors.file}</p>
        </div>

        {/* Birthdate */}
        <div>
          <label htmlFor="birthdate" class="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            class="shadow border rounded w-full py-2 px-3 leading-tight"
          />
          <p className="text-red-500 text-xs italic">{errors.birthdate}</p>
        </div>

        {/* Favorite Color */}
        <div>
          <label htmlFor="favoriteColor" class="block text-gray-700 text-sm font-bold mb-2">Favorite Color</label>
          <input
            type="color"
            id="favoriteColor"
            name="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleInputChange}
            class="w-full h-10 p-1 rounded border"
          />
          <p className="text-red-500 text-xs italic">{errors.favoriteColor}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Submit
        </button>
        {formSuccess && <p className="text-green-500 mt-2">{formSuccess}</p>}
      </form>
    </div>
  );
}

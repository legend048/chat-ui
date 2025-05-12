import React, { useState } from 'react';

export function EdgeCaseForm() {
  const [formData, setFormData] = useState({
    name: '',
    emaill: '',
    password: '',            // new
    phone: '',
    message: '',
    gender: '',
    hobbies: [],
    file: null,
    birthdate: '',
    day:'',
    favoriteColor: '#000000',
  });

  const [errors, setErrors] = useState({
    name: '',
    emaill: '',
    password: '',            // new
    phone: '',
    message: '',
    gender: '',
    hobbies: '',
    file: '',
    birthdate: '',
    day:'',
    favoriteColor: '',
  });

  const [formSuccess, setFormSuccess] = useState('');

  // Handle changes in the form inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      // Handle multiple checkbox values
      setFormData((prevData) => {
        const updatedHobbies = checked
          ? [...prevData.hobbies, value]
          : prevData.hobbies.filter((hobby) => hobby !== value);
        return { ...prevData, hobbies: updatedHobbies };
      });
    } else if (type === 'file') {
      // Handle file input
      setFormData((prevData) => ({ ...prevData, file: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    let errorMessages = { ...errors };

    // Name Validation
    if (!formData.name || formData.name.length > 100) {
      errorMessages.name = 'Name is required and must be less than 100 characters.';
      isValid = false;
    } else {
      errorMessages.name = '';
    }

       // Password (new)
    if (!formData.password || formData.password.length < 8) {
      msgs.password = 'Password must be at least 8 characters.';
      isValid = false;
    } else msgs.password = '';

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.emaill)) {
      errorMessages.email = 'Please enter a valid email address.';
      isValid = false;
    } else {
      errorMessages.email = '';
    }

    // Phone Validation
    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      errorMessages.phone = 'Phone number must match the format 123-456-7890.';
      isValid = false;
    } else {
      errorMessages.phone = '';
    }

    // Message Validation
    if (formData.message.length > 1000) {
      errorMessages.message = 'Message is too long. Maximum 1000 characters.';
      isValid = false;
    } else {
      errorMessages.message = '';
    }

    // Gender Validation
    if (!formData.gender) {
      errorMessages.gender = 'Please select a gender.';
      isValid = false;
    } else {
      errorMessages.gender = '';
    }

    // Hobbies Validation
    if (formData.hobbies.length === 0) {
      errorMessages.hobbies = 'Please select at least one hobby.';
      isValid = false;
    } else {
      errorMessages.hobbies = '';
    }

    // File Validation
    if (formData.file) {
      if (!formData.file.type.match('image.*') && !formData.file.type.match('pdf')) {
        errorMessages.file = 'Please upload an image (JPG/PNG) or PDF file.';
        isValid = false;
      }
      if (formData.file.size > 5000000) { // 5MB file size limit
        errorMessages.file = 'File size must be less than 5MB.';
        isValid = false;
      }
    } else {
      errorMessages.file = '';
    }

    // Birthdate Validation
    if (formData.birthdate && new Date(formData.birthdate) > new Date()) {
      errorMessages.birthdate = 'Date of birth cannot be in the future.';
      isValid = false;
    } else {
      errorMessages.birthdate = '';
    }

     if (!formData.favoriteColor) {
      msgs.favoriteColor = 'Please select a color.';
      isValid = false;
    } else msgs.favoriteColor = '';

    setErrors(errorMessages);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormSuccess('Form submitted successfully!');
      // You can perform the actual form submission here
      console.log('Form data:', formData);
    } else {
      setFormSuccess('');
    }
  };

  return (
    <div class="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
  <h2 class="text-xl font-semibold mb-4 text-gray-800">Edge Case Form</h2>
  <form onSubmit={handleSubmit} class="space-y-4">
    {/* Name Input */}
    <div>
      <label htmlFor="name" class="block text-gray-700 text-sm font-bold mb-2">
        Name (Special Characters, Empty, Long Input)
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span className="text-red-500 text-xs italic">{errors.name}</span>
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

    {/* Email Input */}
    <div>
      <label htmlFor="email" class="block text-gray-700 text-sm font-bold mb-2">
        Email (Invalid Email)
      </label>
      <input
        type="email"
        id="emaill"
        name="email"
        value={formData.emaill}
        onChange={handleInputChange}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span className="text-red-500 text-xs italic">{errors.email}</span>
    </div>

    {/* Phone Input */}
    <div>
      <label htmlFor="phone" class="block text-gray-700 text-sm font-bold mb-2">
        Phone Number (Invalid Format)
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span className="text-red-500 text-xs italic">{errors.phone}</span>
    </div>

    {/* Message Input */}
    <div>
      <label htmlFor="message" class="block text-gray-700 text-sm font-bold mb-2">
        Message (Large Input)
      </label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        rows="4"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      <span className="text-red-500 text-xs italic">{errors.message}</span>
    </div>

    {/* Gender Input */}
    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Gender (Unchecked Selection)
      </label>
      <div class="flex items-center space-x-4">
        <div class="flex items-center">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleInputChange}
            class="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <label htmlFor="male" class="ml-2 text-gray-700 text-sm">Male</label>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleInputChange}
            class="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <label htmlFor="female" class="ml-2 text-gray-700 text-sm">Female</label>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={handleInputChange}
            class="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <label htmlFor="other" class="ml-2 text-gray-700 text-sm">Other</label>
        </div>
      </div>
      <span className="text-red-500 text-xs italic">{errors.gender}</span>
    </div>

    {/* Hobbies Input */}
    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Hobbies (Multiple Selections)
      </label>
      <div class="flex items-center space-x-4">
        <div class="flex items-center">
          <input
            type="checkbox"
            name="hobbies"
            value="reading"
            onChange={handleInputChange}
            class="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label class="ml-2 text-gray-700 text-sm">Reading</label>
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            name="hobbies"
            value="travelling"
            onChange={handleInputChange}
            class="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label class="ml-2 text-gray-700 text-sm">Travelling</label>
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            name="hobbies"
            value="sports"
            onChange={handleInputChange}
            class="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label class="ml-2 text-gray-700 text-sm">Sports</label>
        </div>
      </div>
      <span className="text-red-500 text-xs italic">{errors.hobbies}</span>
    </div>

    {/* File Upload Input */}
    <div>
      <label htmlFor="file" class="block text-gray-700 text-sm font-bold mb-2">
        Upload File (File Type and Size)
      </label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .png, .pdf"
        onChange={handleInputChange}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span className="text-red-500 text-xs italic">{errors.file}</span>
    </div>

    {/* Birthdate Input */}
    <div>
      <label htmlFor="birthdate" class="block text-gray-700 text-sm font-bold mb-2">
        Date of Birth (Invalid Date)
      </label>
      <input
        type="date"
        id="birthdate"
        name="birthdate"
        value={formData.birthdate}
        onChange={handleInputChange}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span className="text-red-500 text-xs italic">{errors.birthdate}</span>
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

    {/* Submit Button */}
    <button
      type="submit"
      class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Submit
    </button>
    <span className="text-green-500 text-sm italic">{formSuccess}</span>
  </form>
</div>  );
}

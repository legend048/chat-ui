import React, { useState } from 'react';

export function EdgeCaseForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    gender: '',
    hobbies: [],
    file: null,
    birthdate: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    gender: '',
    hobbies: '',
    file: '',
    birthdate: '',
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

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
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
    <div>
      <h2>Edge Case Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <label htmlFor="name">Name (Special Characters, Empty, Long Input)</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <span className="error">{errors.name}</span>

        {/* Email Input */}
        <label htmlFor="email">Email (Invalid Email)</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <span className="error">{errors.email}</span>

        {/* Phone Input */}
        <label htmlFor="phone">Phone Number (Invalid Format)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
        <span className="error">{errors.phone}</span>

        {/* Message Input */}
        <label htmlFor="message">Message (Large Input)</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows="4"
        ></textarea>
        <span className="error">{errors.message}</span>

        {/* Gender Input */}
        <label>Gender (Unchecked Selection)</label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          onChange={handleInputChange}
        /> Male
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onChange={handleInputChange}
        /> Female
        <input
          type="radio"
          id="other"
          name="gender"
          value="other"
          onChange={handleInputChange}
        /> Other
        <span className="error">{errors.gender}</span>

        {/* Hobbies Input */}
        <label>Hobbies (Multiple Selections)</label>
        <input
          type="checkbox"
          name="hobbies"
          value="reading"
          onChange={handleInputChange}
        /> Reading
        <input
          type="checkbox"
          name="hobbies"
          value="travelling"
          onChange={handleInputChange}
        /> Travelling
        <input
          type="checkbox"
          name="hobbies"
          value="sports"
          onChange={handleInputChange}
        /> Sports
        <span className="error">{errors.hobbies}</span>

        {/* File Upload Input */}
        <label htmlFor="file">Upload File (File Type and Size)</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .png, .pdf"
          onChange={handleInputChange}
        />
        <span className="error">{errors.file}</span>

        {/* Birthdate Input */}
        <label htmlFor="birthdate">Date of Birth (Invalid Date)</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
        />
        <span className="error">{errors.birthdate}</span>

        {/* Submit Button */}
        <button type="submit">Submit</button>
        <span className="success">{formSuccess}</span>
      </form>
    </div>
  );
}

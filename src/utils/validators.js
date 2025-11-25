// src/utils/validators.js

/**
 * Validate if a value is not empty
 */
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validate mail number format
 * Format: XXX/XXX/XXX/XXXX or B/123/DIR/2024
 */
export const validateMailNumber = (mailNumber) => {
 const pattern = /^[A-Z0-9/-]+$/i; // Garis miring (/) tidak perlu di-escape di dalam [].
  return pattern.test(mailNumber);
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

/**
 * Validate Indonesian phone number format
 * Format: 08xx-xxxx-xxxx or +62xxx
 */
export const validatePhone = (phone) => {
  const pattern = /^(\+62|08)[0-9]{8,12}$/;
  return pattern.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Validate date string
 */
export const validateDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Validate file size
 * @param {File} file - File object
 * @param {number} maxSizeMB - Maximum size in MB (default: 10)
 */
export const validateFileSize = (file, maxSizeMB = 10) => {
  const maxSize = maxSizeMB * 1024 * 1024;
  return file.size <= maxSize;
};

/**
 * Validate file type
 * @param {File} file - File object
 * @param {Array} allowedTypes - Array of allowed extensions
 */
export const validateFileType = (file, allowedTypes = []) => {
  if (allowedTypes.length === 0) return true;
  const fileExtension = file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileExtension);
};
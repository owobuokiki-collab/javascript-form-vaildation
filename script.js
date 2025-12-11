// Form validation with JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const inputs = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        age: document.getElementById('age')
    };

    const errorElements = {
        fullName: document.getElementById('fullNameError'),
        email: document.getElementById('emailError'),
        password: document.getElementById('passwordError'),
        confirmPassword: document.getElementById('confirmPasswordError'),
        age: document.getElementById('ageError')
    };

    // Validation patterns
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };

    // Validation functions
    const validators = {
        fullName: function(value) {
            const trimmed = value.trim();
            if (!trimmed) {
                return "Full name is required";
            }
            const words = trimmed.split(/\s+/);
            if (words.length < 2) {
                return "Full name must contain at least 2 words";
            }
            return "";
        },

        email: function(value) {
            if (!value.trim()) {
                return "Email address is required";
            }
            if (!patterns.email.test(value)) {
                return "Please enter a valid email address";
            }
            return "";
        },

        password: function(value) {
            if (!value) {
                return "Password is required";
            }
            if (value.length < 8) {
                return "Password must be at least 8 characters long";
            }
            if (!patterns.password.test(value)) {
                return "Password must contain at least one uppercase letter, one number, and one special character";
            }
            return "";
        },

        confirmPassword: function(value) {
            if (!value) {
                return "Please confirm your password";
            }
            if (value !== inputs.password.value) {
                return "Passwords do not match";
            }
            return "";
        },

        age: function(value) {
            if (!value) {
                return "Age is required";
            }
            const ageNum = parseInt(value);
            if (isNaN(ageNum) || ageNum < 18) {
                return "You must be 18 or older to register";
            }
            if (ageNum > 120) {
                return "Please enter a valid age";
            }
            return "";
        }
    };

    // Real-time validation function
    function validateField(fieldName) {
        const input = inputs[fieldName];
        const errorElement = errorElements[fieldName];
        const errorMessage = validators[fieldName](input.value);

        if (errorMessage) {
            errorElement.textContent = errorMessage;
            input.classList.remove('valid');
            input.classList.add('invalid');
            return false;
        } else {
            errorElement.textContent = "";
            input.classList.remove('invalid');
            input.classList.add('valid');
            return true;
        }
    }

    // Add real-time validation listeners
    Object.keys(inputs).forEach(fieldName => {
        inputs[fieldName].addEventListener('blur', () => validateField(fieldName));
        inputs[fieldName].addEventListener('input', () => {
            // Clear error styling on input
            if (inputs[fieldName].classList.contains('invalid')) {
                validateField(fieldName);
            }
        });
    });

    // Special case for confirm password - validate when password changes
    inputs.password.addEventListener('input', () => {
        if (inputs.confirmPassword.value) {
            validateField('confirmPassword');
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isFormValid = true;
        const errors = [];

        // Validate all fields
        Object.keys(validators).forEach(fieldName => {
            const isFieldValid = validateField(fieldName);
            if (!isFieldValid) {
                isFormValid = false;
                errors.push(errorElements[fieldName].textContent);
            }
        });

        if (!isFormValid) {
            // Show alert with all errors
            alert("Please fix the following errors:\n\n" + errors.join("\n"));
            return;
        }

        // Success - show success message
        showSuccessMessage();
        
        // Optional: Reset form after success
        setTimeout(() => {
            if (confirm("Registration successful! Would you like to register another user?")) {
                resetForm();
            }
        }, 2000);
    });

    // Success message function
    function showSuccessMessage() {
        // Remove any existing success message
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <strong>🎉 Registration Successful!</strong><br>
            Welcome, ${inputs.fullName.value}! Your account has been created successfully.
        `;
        
        form.appendChild(successDiv);
        
        // Show alert as well
        alert("🎉 Registration successful! Welcome, " + inputs.fullName.value + "!");
    }

    // Reset form function
    function resetForm() {
        form.reset();
        
        // Clear all validation classes and error messages
        Object.keys(inputs).forEach(fieldName => {
            inputs[fieldName].classList.remove('valid', 'invalid');
            errorElements[fieldName].textContent = "";
        });

        // Remove success message
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.remove();
        }
    }

    // Optional: Add password strength indicator
    inputs.password.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[@$!%*?&]/.test(password)) strength++;
        
        // You can add visual strength indicator here if desired
    });
});
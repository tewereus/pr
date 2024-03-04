const validateUser = (data) => {
    const { username, email, fullname, mobile, password } = data;
    const errors = [];

    // Validate username
    if (username && (username.length < 3 || username.length > 12)) {
        errors.push("Username must be between 3 and 12 characters long");
    }

    // Validate email
    if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.push("Please input a valid email address");
    }

    // Validate fullname
    if (fullname && fullname.trim().length < 3) {
        errors.push("Full name must be at least 3 characters long");
    }

    // Validate mobile
    if (mobile && !/^\d{9}$/.test(mobile)) {
        errors.push("Mobile number must contain exactly 9 digits");
    }

    // Validate password
    if (password && (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password))) {
        errors.push("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }

    return { error: errors.length > 0 ? { details: [{ message: errors }] } : null };
    // return { error: errors.length > 0 ? { details: errors } : null };
};

module.exports = validateUser
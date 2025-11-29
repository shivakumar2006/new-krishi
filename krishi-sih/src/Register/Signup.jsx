import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        agreeToTerms: false
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required'
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required'
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions'
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = validateForm()

        if (Object.keys(newErrors).length === 0) {
            try {
                const res = await axios.post('http://localhost:5000/api/signup', formData)
                alert('User registered successfully!')
                // Optionally reset form here
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phoneNumber: '',
                    agreeToTerms: false
                })
            } catch (err) {
                alert('Signup failed. Please try again.')
                console.error(err)
            }
        } else {
            setErrors(newErrors)
        }
    }

    return (
        <div style={{ backgroundColor: '#F9F3E0', minHeight: '100vh' }}>
            <div className="flex items-center justify-center min-h-screen px-6 py-8">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">Create Account</h1>
                        <p className="text-gray-600">Join Krishi community today</p>
                    </div>

                    {/* Registration Form */}
                    <div
                        className="bg-white rounded-lg shadow-lg p-8"
                        style={{
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px'
                        }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="First name"
                                        style={{ borderRadius: '8px', fontSize: '14px' }}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="Last name"
                                        style={{ borderRadius: '8px', fontSize: '14px' }}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                    placeholder="Enter your email"
                                    style={{ borderRadius: '8px', fontSize: '14px' }}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone Number Field */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-black mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                    placeholder="Enter your phone number"
                                    style={{ borderRadius: '8px', fontSize: '14px' }}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                            </div>

                            {/* Password Fields */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                    placeholder="Create a password"
                                    style={{ borderRadius: '8px', fontSize: '14px' }}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                    placeholder="Confirm your password"
                                    style={{ borderRadius: '8px', fontSize: '14px' }}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Role
                                </label>
                                <select onChange={handleChange} value={formData.role} name="role" id="role" className='w-full border-gray-300 px-3 border-1 h-10 rounded-lg'>
                                    <option value="">Select Role</option>
                                    <option value="farmer">Farmer</option>
                                    <option value="customer">Customer</option>
                                    <option value="driver">Driver</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start space-x-2">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-green-600 hover:underline">
                                        Terms and Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-green-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full text-white font-semibold py-3 px-4 rounded-lg transition duration-200 hover:opacity-90 mt-6"
                                style={{
                                    backgroundColor: '#205D21',
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            >
                                Create Account
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-6 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">OR</span>
                                </div>
                            </div>
                        </div>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold hover:underline" style={{ color: '#009F1D' }}>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

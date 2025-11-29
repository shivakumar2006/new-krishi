import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/login', formData)
            alert('Login successful!')
            console.log('Server Response:', res.data)
        } catch (err) {
            console.error('Login error:', err)
            alert('Login failed.')
        }
    }

    return (
        <div style={{ backgroundColor: '#F9F3E0', minHeight: '100vh' }}>

            <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: '0' }}>
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Please sign in to your account</p>
                    </div>

                    {/* Login Form */}
                    <div
                        className="bg-white rounded-lg shadow-lg p-8"
                        style={{
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px'
                        }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-black mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                    placeholder="Enter your email"
                                    style={{
                                        borderRadius: '8px',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-black mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                    placeholder="Enter your password"
                                    style={{
                                        borderRadius: '8px',
                                        fontSize: '16px'
                                    }}
                                />
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

                            {/* Forgot Password Link */}
                            <div className="text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm hover:underline"
                                    style={{ color: '#009F1D' }}
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full text-white font-semibold py-3 px-4 rounded-lg transition duration-200 hover:opacity-90"
                                style={{
                                    backgroundColor: '#205D21',
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            >
                                Sign In
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

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="font-semibold hover:underline"
                                    style={{ color: '#009F1D' }}
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

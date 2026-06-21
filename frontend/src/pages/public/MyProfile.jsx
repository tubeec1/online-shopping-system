import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearAuthState } from "../../features/auth/authSlice";

const MyProfile = () => {
  const dispatch = useDispatch();

  const { user, loading, success, message, error } = useSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    country: "",
    nationality: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        gender: user.gender || "",
        country: user.country || "",
        nationality: user.nationality || "",
        password: "",
      });

      setPreview(
        user.profile_image
          ? `http://localhost/online-shopping-system/backend/public/${user.profile_image}`
          : "",
      );
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearAuthState());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("fullName", formData.full_name);
    data.append("gender", formData.gender);
    data.append("country", formData.country);
    data.append("nationality", formData.nationality);

    if (formData.password.trim()) {
      data.append("password", formData.password);
    }

    if (image) {
      data.append("profileImage", image);
    }

    dispatch(updateProfile(data));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-orange-500 p-8 text-white">
          <h1 className="text-3xl font-bold">My Profile</h1>

          <p className="text-orange-100 mt-2">
            Manage your account information
          </p>
        </div>

        <div className="p-8">
          {/* Alerts */}
          {success && (
            <div className="mb-5 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
              {error.message || "Something went wrong"}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center">
                <img
                  src={
                    preview ||
                    "https://ui-avatars.com/api/?name=" + user?.full_name
                  }
                  alt={user?.full_name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-orange-500 shadow-md"
                />

                <label className="mt-4 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
                  Change Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>

                <div className="mt-6 text-center">
                  <h3 className="font-bold text-xl">{user?.full_name}</h3>

                  <p className="text-gray-500">{user?.role_name}</p>

                  <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {user?.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-medium mb-2">Full Name</label>

                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-medium mb-2">Gender</label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3"
                    >
                      <option value="">Select Gender</option>

                      <option value="male">Male</option>

                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Country</label>

                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2">Nationality</label>

                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">New Password</label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave empty if you don't want to change password"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

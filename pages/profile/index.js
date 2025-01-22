// pages/profile.js
import { useEffect, useState } from "react";
import { auth, db } from "..utils/config/firebase_config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchProfile(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfile = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProfileData(docSnap.data());
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadProfileImage = async (uid) => {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${uid}`);
    if (imageFile) {
      await uploadBytes(storageRef, imageFile);
      return await getDownloadURL(storageRef);
    }
    return profileData.profileImage;
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const imageUrl = await uploadProfileImage(user.uid);
      const updatedProfile = { ...profileData, profileImage: imageUrl };

      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, updatedProfile, { merge: true });
      setProfileData(updatedProfile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-5">Edit Profile</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Profile Image</label>
        <div className="flex items-center space-x-4">
          <img
            src={profileData.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-600"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={profileData.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className={`w-full p-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

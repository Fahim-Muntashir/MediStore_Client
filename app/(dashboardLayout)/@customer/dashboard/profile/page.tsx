import { fetchProfile } from "@/actions/profile.actions";
import UpdateProfileDialog from "./_components/UpdateProfileDialog";

export default async function ProfilePage() {
  const { data: profile, error } = await fetchProfile();

  if (error || !profile) {
    return <p className="text-red-500">Error loading profile</p>;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-md border overflow-hidden">
        {/* Top Banner */}
        <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-600" />

        {/* Main Content */}
        <div className="p-8 flex flex-col lg:flex-row gap-10">
          {/* Left Section - Avatar */}
          <div className="flex flex-col items-center lg:items-start -mt-20 lg:-mt-16">
            <img
              src={profile.image || "/avatar.png"}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {profile.name}
            </h2>
            <p className="text-sm text-blue-600 font-medium">
              {profile.role || "User"}
            </p>
          </div>

          {/* Right Section - Info */}
          <div className="flex-1 space-y-6">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium text-gray-900">{profile.email}</p>
              </div>

              <UpdateProfileDialog profile={profile} />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-gray-500">Phone</p>
                <p className="font-semibold text-gray-900">
                  {profile.phone || "Not set"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-gray-500">Role</p>
                <p className="font-semibold text-gray-900">
                  {profile.role || "User"}
                </p>
              </div>

              <div className="sm:col-span-2 bg-gray-50 rounded-xl p-4 border">
                <p className="text-gray-500">Shipping Address</p>
                <p className="font-semibold text-gray-900">
                  {profile.shippingAddress || "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

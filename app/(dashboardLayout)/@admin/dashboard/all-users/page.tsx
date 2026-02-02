import { getAllUsers } from "@/actions/admin.action";
import UsersTable from "./_components/UsersTable";

const page = async () => {
  const res = await getAllUsers();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Users</h1>
      <UsersTable users={res.data} />
    </div>
  );
};

export default page;

import React from "react";
// import { Button } from "reactstrap";
// import { Button } from "@/components/ui/button";

const InventoryTable = ({ inventory, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Condition</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item._id} className="text-center">
            <td className="border p-2">{item.name}</td>
            <td className="border p-2">{item.status}</td>
            <td className="border p-2">{item.condition}</td>
            <td className="border p-2">
              <a onClick={() => onEdit(item)} className="mr-2">
                Edit
              </a>
              <a onClick={() => onDelete(item._id)} variant="destructive">
                Delete
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;

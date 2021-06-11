import React, { useState } from "react";
import { Checkbox, Avatar, Button, Tooltip, Alert, Toastr } from "neetoui";

export default function ConatactTable({
  selectedContactIds,
  setSelectedContactIds,
  contacts = [],
}) {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox  nui-table--actions nui-table--hover">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const contacIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === contacIds.length) {
                    selectedContactIds([]);
                  } else {
                    selectedContactIds(contacIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Department</th>
            <th className="text-left">Contact Number</th>
            <th className="text-center">Add To BaseCamp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => {
            return (
              <tr key={contact.id}>
                <td>
                  <Checkbox
                    checked={selectedContactIds.includes(contact.id)}
                    onClick={event => {
                      event.stopPropagation();
                      const index = selectedContactIds.indexOf(contact.id);
                      if (index > -1) {
                        setSelectedContactIds([
                          ...selectedContactIds.slice(0, index),
                          ...selectedContactIds.slice(index + 1),
                        ]);
                      } else {
                        setSelectedContactIds([
                          ...selectedContactIds,
                          contact.id,
                        ]);
                      }
                    }}
                  />
                </td>
                <td className="flex items-center">
                  <Avatar contact={contact} className="mr-2.5" />
                  {contact.name}
                </td>
                <td className="text-left">{contact.email}</td>
                <td className="text-left">{contact.department}</td>
                <td className="text-left">{contact.contactNumber}</td>
                <td>
                  <div className="flex flex-row items-center justify-center">
                    <Checkbox checked={contact.addToBaseCamp} />
                  </div>
                </td>
                <td>
                  <div className="flex flex-row items-center justify-center space-x-3">
                    <Tooltip content="Edit" position="bottom">
                      <Button style="icon" icon="ri-pencil-line" />
                    </Tooltip>
                    <Tooltip content="Delete" position="bottom">
                      <Button
                        icon="ri-delete-bin-line"
                        style="icon"
                        onClick={() => {
                          setIsDeleteAlertOpen(true);
                        }}
                      />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Alert
        isOpen={isDeleteAlertOpen}
        title="Delete Contact"
        message="All of your data will be permanently removed from our database forever. This action cannot be undone."
        confirmationText="Are you sure you want to delete the contact?"
        submitButtonProps={{
          label: "Proceed",
          onClick: () => {
            setIsDeleteAlertOpen(false);
            Toastr.success("Contact deleted successfully");
          },
        }}
        cancelButtonProps={{
          onClick: () => {
            setIsDeleteAlertOpen(false);
          },
        }}
      />
    </div>
  );
}

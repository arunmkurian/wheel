import React, { useState } from "react";
import {
  Checkbox,
  Badge,
  Avatar,
  Button,
  Tooltip,
  Alert,
  Toastr,
} from "neetoui";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
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
                  selectedNoteIds.length === notes.map(note => note.id).length
                }
                onClick={() => {
                  const noteIds = notes.map(note => note.id);
                  if (selectedNoteIds.length === noteIds.length) {
                    setSelectedNoteIds([]);
                  } else {
                    setSelectedNoteIds(noteIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-center">Tags</th>
            <th className="text-center">Created Date</th>
            <th className="text-center">Due Date</th>
            <th className="text-center">Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr
              key={note.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedNoteIds.includes(note.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedNoteIds.indexOf(note.id);

                    if (index > -1) {
                      setSelectedNoteIds([
                        ...selectedNoteIds.slice(0, index),
                        ...selectedNoteIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedNoteIds([...selectedNoteIds, note.id]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-left">
                  <Button style="link" label={note.title} />
                </div>
              </td>
              <td className="truncate text-left max-w-200">
                {note.description}
              </td>
              <td className="text-center">
                <Badge color={note.tag.color}>{note.tag.name}</Badge>
              </td>
              <td className="text-center">{note.createdDate || "--"}</td>
              <td className="text-center">{note.dueDate || "--"}</td>
              <td className="flex flex-row items-center justify-center">
                <Avatar contact={{ name: note.contact }} />
              </td>
              <td>
                <div className="flex flex-row items-center justify-end space-x-3">
                  <Tooltip content="Edit" position="bottom">
                    <Button icon="ri-pencil-line" style="icon" />
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
          ))}
        </tbody>
      </table>
      <Alert
        isOpen={isDeleteAlertOpen}
        title="Delete Note"
        message="All of your data will be permanently removed from our database forever. This action cannot be undone."
        confirmationText="Are you sure you want to delete the note?"
        submitButtonProps={{
          label: "Proceed",
          onClick: () => {
            setIsDeleteAlertOpen(false);
            Toastr.success("Note deleted successfully");
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

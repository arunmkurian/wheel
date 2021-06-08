import React from "react";
import { Checkbox, Badge, Avatar, Button, Tooltip } from "neetoui";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox  nui-table--actions">
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
            <th className="text-center">Conact</th>
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
              <td className="flex flex-row items-center justify-start">
                <Button style="link" label={note.title} />
              </td>
              <td className="truncate text-left" style={{ maxWidth: 100 }}>
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
                  <Tooltip content="Delete" position="bottom" minimal>
                    <Button icon="ri-delete-bin-line" style="icon" />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

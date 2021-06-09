import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Textarea, Select } from "neetoui/formik";
import { Button, Toastr, Switch, DateInput } from "neetoui";
import { tags, contacts } from "common/mock-data";
// import notesApi from "apis/notes";

export default function NewNoteForm({ onClose, refetch }) {
  const handleSubmit = async () => {
    try {
      // await notesApi.create(values);
      Toastr.success("Note added successfully");
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };

  const [dueDateEnabled, setDueDateEnabled] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Title" name="title" className="mb-6" />
          <Select
            label="Tags"
            options={tags}
            name="tag"
            className="mb-6"
            placeholder="Select tag"
          />
          <Textarea
            label="Note Description"
            name="description"
            rows={8}
            className="mb-6"
          />
          <Select
            label="Assigned Contact"
            options={contacts}
            name="assignedContact"
            className="mb-6"
            placeholder="Select contact"
          />
          <div className="mb-6">
            Add Due Date to Note
            <Switch
              id="dueDateSwitch"
              className="float-right"
              checked={dueDateEnabled}
              onChange={e => setDueDateEnabled(e.target.checked)}
            />
          </div>
          {dueDateEnabled && (
            <DateInput
              type="date"
              label="Due date"
              name="dueDate"
              format="DD/MM/YYYY"
              value={dueDate}
              onChange={setDueDate}
            />
          )}
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

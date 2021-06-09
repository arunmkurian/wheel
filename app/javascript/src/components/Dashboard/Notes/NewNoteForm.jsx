import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Textarea, Select } from "neetoui/formik";
import { Button, Toastr, Switch, DateInput, Collapse } from "neetoui";
import { tags, contacts } from "common/mock-data";
import { 
  createNoteInitialValues as initialValues, 
  createNoteValidationSchema as validationSchema
} from "./constants";
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
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <Input label="Title" name="title"/>
          <Select
            label="Tags"
            options={tags}
            name="tag"
            placeholder="Select tag"
          />
          <Textarea
            label="Note Description"
            name="description"
            rows={8}
          />
          <Select
            label="Assigned Contact"
            options={contacts}
            name="assignedContact"
            placeholder="Select contact"
          />
          <div>
            Add Due Date to Note
            <Switch
              id="dueDateSwitch"
              className="float-right"
              checked={dueDateEnabled}
              onChange={e => setDueDateEnabled(e.target.checked)}
            />
          </div>
          <Collapse open={dueDateEnabled}>
              <DateInput
              type="date"
              label="Due date"
              name="dueDate"
              format="DD/MM/YYYY"
              value={dueDate}
              onChange={setDueDate}
            />
          </Collapse>
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

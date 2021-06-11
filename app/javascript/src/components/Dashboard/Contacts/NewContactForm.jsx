import React from "react";
import { Formik, Form } from "formik";
import { Input, Switch } from "neetoui/formik";
import { Button, Toastr, Label } from "neetoui";

import {
  newContactInitialValues as initialValues,
  newContactValidationSchema as validationSchema,
} from "./constants";

export default function NewContactForm({ onClose, refetch }) {
  const handleSubmit = async () => {
    try {
      Toastr.success("Contact added successfully");
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <Input placeholder="Name" label="Name" name="name" />
          <Input label="Email" placeholder="Email" name="email" />
          <Input
            label="Contact Number"
            placeholder="Contact Number"
            name="contactNumber"
          />
          <Input
            label="Department"
            placeholder="Department"
            name="department"
          />
          <div className="flex justify-between">
            <Label>Add to Basecamp</Label>
            <Switch name="addToBaseCamp" />
          </div>
          <div className="nui-pane__footer nui-pane__footer--absolute space-x-4">
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
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

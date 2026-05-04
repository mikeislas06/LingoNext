import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput } from "react-admin";

const validateUnitCreation = (values: Record<string, any>): any => {
	const errors: Record<string, string> = {};
	if (!values.title) {
		errors.title = "The title is required";
	}
	if (!values.description) {
		errors.description = "Description is required";
	}
	if (!values.order) {
		errors.order = "Order is required";
	}
	return errors;
};

export const UnitCreate = () => {
	return (
		<Create>
			<SimpleForm validate={validateUnitCreation}>
				<TextInput label="Title" source="title" />
				<TextInput label="Description" source="description" />
				<ReferenceInput source="courseId" reference="courses" />
				<NumberInput label="Order" source="order" />
			</SimpleForm>
		</Create>
	);
};

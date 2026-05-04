import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput } from "react-admin";

const validateLessonCreation = (values: Record<string, any>): any => {
	const errors: Record<string, string> = {};
	if (!values.title) {
		errors.title = "The title is required";
	}
	if (!values.order) {
		errors.order = "Order is required";
	}
	return errors;
};

export const LessonEdit = () => {
	return (
		<Edit>
			<SimpleForm validate={validateLessonCreation}>
				<NumberInput label="Id" source="id" />
				<TextInput label="Title" source="title" />
				<ReferenceInput source="unitId" reference="units" />
				<NumberInput label="Order" source="order" />
			</SimpleForm>
		</Edit>
	);
};

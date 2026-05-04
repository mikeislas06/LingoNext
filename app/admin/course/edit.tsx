import { Edit, SimpleForm, TextInput } from "react-admin";

const validateCourseCreation = (values: Record<string, any>): any => {
	const errors: Record<string, string> = {};
	if (!values.title) {
		errors.title = "The title is required";
	}
	if (!values.imageSrc) {
		errors.imageSrc = "Flag image is required";
	}
	return errors;
};

export const CourseEdit = () => {
	return (
		<Edit>
			<SimpleForm validate={validateCourseCreation}>
				<TextInput label="Id" source="id" />
				<TextInput label="Title" source="title" />
				<TextInput label="Image" source="imageSrc" />
			</SimpleForm>
		</Edit>
	);
};

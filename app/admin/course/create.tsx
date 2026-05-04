import { Create, FileField, FileInput, SimpleForm, TextInput } from "react-admin";

const validateCourseCreation = (values: Record<string, any>) => {
	const errors: Record<string, string> = {};
	if (!values.title) {
		errors.title = "The title is required";
	}
	if (!values.imageSrc) {
		errors.imageSrc = "Flag image is required";
	}
	return errors;
};

export const CourseCreate = () => {
	return (
		<Create>
			<SimpleForm validate={validateCourseCreation}>
				<TextInput label="Title" source="title" />
				<TextInput label="Image" source="imageSrc" />
			</SimpleForm>
		</Create>
	);
};

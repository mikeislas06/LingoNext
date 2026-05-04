import { BooleanInput, Edit, ReferenceInput, SimpleForm, TextInput } from "react-admin";

const validateChallengeOptionCreation = (values: Record<string, any>): any => {
	const errors: Record<string, string> = {};
	if (!values.text) {
		errors.text = "The text is required";
	}
	return errors;
};

export const ChallengeOptionEdit = () => {
	return (
		<Edit>
			<SimpleForm validate={validateChallengeOptionCreation}>
				<TextInput source="text" label="Text" />
				<BooleanInput source="correct" label="Correct option" />
				<ReferenceInput source="challengeId" reference="challenges" />
				<TextInput label="Image URL" source="imageSrc" />
				<TextInput label="Audio URL" source="audioSrc" />
			</SimpleForm>
		</Edit>
	);
};

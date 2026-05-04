import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

const validateChallengeEdit = (values: Record<string, any>) => {
	const errors: Record<string, string> = {};
	if (!values.question) {
		errors.question = "The question is required";
	}
	if (!values.type) {
		errors.type = "The type is required";
	}
	if (!values.order) {
		errors.order = "Order is required";
	}
	return errors;
};

export const ChallengeEdit = () => {
	return (
		<Edit>
			<SimpleForm validate={validateChallengeEdit}>
				<NumberInput label="Id" source="id" />
				<TextInput label="Question" source="question" />
				<SelectInput
					source="type"
					choices={[
						{ id: "SELECT", name: "SELECT" },
						{ id: "ASSIST", name: "ASSIST" },
					]}
				/>
				<ReferenceInput source="lessonId" reference="lessons" />
				<NumberInput label="Order" source="order" />
			</SimpleForm>
		</Edit>
	);
};

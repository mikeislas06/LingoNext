import {
	Create,
	NumberInput,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextInput,
} from "react-admin";

const validateChallengeCreation = (values: Record<string, any>): any => {
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

export const ChallengeCreate = () => {
	return (
		<Create>
			<SimpleForm validate={validateChallengeCreation}>
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
		</Create>
	);
};

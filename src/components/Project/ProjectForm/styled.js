import { Button } from "antd";
import styled from "@emotion/styled";
import FormInput from "components/Common/FormInput";
import FormDatePicker from "components/Common/FormDatePicker";

export const ProjectInput = styled(FormInput)`
	width: 60%;
	margin-left: 20%;
	align-self: center;
`;

export const ProjectDatePicker = styled(FormDatePicker)`
	width: 60%;
	margin-left: 20%;
	align-self: center;
`;

export const CreateProjectButton = styled(Button)`
	margin-right: 20%;
	margin-bottom: 20px;
	align-self: flex-end;
`;
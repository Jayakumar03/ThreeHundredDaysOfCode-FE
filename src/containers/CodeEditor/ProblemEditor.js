import { Box } from "@mui/system";
import CodeEditor from "./CodeEditor";
import ProblemDescription from "./ProblemDescription";

const ProblemEditorContainer = (props) => {
    return (
        <Box>
            <ProblemDescription>

            </ProblemDescription>
            <CodeEditor>

            </CodeEditor>
        </Box>
    )
}

export default ProblemEditorContainer;

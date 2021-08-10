import React, {useState} from 'react';
import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';

const ParserPage = () => {
		const [parser, setParser] = useState('');
		const [isValid, setIsValid] = useState(false)
		
		const handleValidation = annotations => setIsValid(!annotations.length)

    return (
			<div className="ace-editor__container">
				<AceEditor
					mode="javascript"
					theme="monokai"
					value={parser}
					onChange={setParser}
					name="UNIQUE_ID_OF_DIV"
					editorProps={{ $blockScrolling: true }}
					onValidate={handleValidation}
				/>
			</div>
	)
};

export default ParserPage;
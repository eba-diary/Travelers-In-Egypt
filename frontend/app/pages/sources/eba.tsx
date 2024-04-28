import React, { useState } from "react";
import parse from "html-react-parser";
import { Select } from "@chakra-ui/react";
import _ from "lodash";

const NUM_VOLUMES = 19;

export default function EBA() {
	const [volume, setVolume] = useState<number>(1);

	const readeriFrameHtml = `
		<iframe
			src="https://trveg01.s.uw.edu/exist/apps/emmabandrews/volumes/volume${volume}.xml"
			width="100%"
			height="550px"
		/>
	`;

	const contentContainer = typeof document !== 'undefined' && document.getElementById('contentContainer');
	console.log('contentContainer', contentContainer);
	return (
		<div
			className="content"
			style={{
				height: 'fit-content',
				marginBottom: '-20px',
			}}
		>
			<div
				style={{
					height: 0,
					width: '180px',
				}}
			>
				<Select
					defaultValue={1}
					onChange={e => setVolume(Number(e.target.value))}
					style={{
						margin: '12px 30px',
						outline: '2px solid #1a202c',
						outlineOffset: '-1px',
						backgroundColor: '#f0f0f0',
					}}
				>
					{_.range(1, NUM_VOLUMES + 1).map(volumeNumber => <option value={volumeNumber}>Volume {volumeNumber}</option>)}
				</Select>
			</div>
			{parse(readeriFrameHtml)}
		</div>

	);
}
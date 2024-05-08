import React, { useState } from "react";
import parse from "html-react-parser";
import { Select } from "@chakra-ui/react";
import _ from "lodash";

const NUM_VOLUMES = 19;

export default function EBA() {
	const [volume, setVolume] = useState<number>(1);

	const readeriFrameHtml = `
		<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
			<iframe
				src="https://ec2-54-188-209-13.us-west-2.compute.amazonaws.com/exist/apps/eba/volumes/volume${volume}.xml"
				width="100%"
				height="550px"
			/>
		</meta>
	`;

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
						fontFamily: '"Source Sans 3", sans-serif',
					}}
				>
					{_.range(1, NUM_VOLUMES + 1).map(volumeNumber => <option key={volumeNumber} value={volumeNumber}>Volume {volumeNumber}</option>)}
				</Select>
			</div>
			{parse(readeriFrameHtml)}
		</div>

	);
}
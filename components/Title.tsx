import React, {
	useRef,
	useState,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction,
} from "react";
import styled from "styled-components";
import TitleAnimation from "../animations/TitleAnimation";

type TitleProps = {
	dataIndex: number;
	dataSize: number;
	dataCurrent: number;
	children: React.ReactNode;
};

type TitleContainerProps = Pick<TitleProps, "dataIndex" | "dataCurrent"> & {
	translateX: number;
};

export type TitleRefHandles = {
	startAnimation: (direction: "up" | "down") => void;
};

const TitleContainer = styled.div<TitleContainerProps>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	text-align: right;
	margin: auto;
	transform: ${({ translateX }) => `matrix(1, 0, 0, 1, ${translateX}, 0)`};
	display: ${({ dataIndex, dataCurrent }) =>
		dataCurrent - dataIndex > 1 ? "none" : "table"};
`;

const TitleTextContainer = styled.div`
	height: 100%;
	display: table-cell;
	vertical-align: middle;
`;

const Titletext = styled.h1`
	position: relative;
	display: inline-block;
	font-size: 15.15vw;
	line-height: 16.15vw;
	font-weight: 500;
	transform: matrix(1, 0, 0, 1.08, 0, 21.7333);
	padding-bottom: 1.5rem;
`;

const Title: ForwardRefRenderFunction<TitleRefHandles, TitleProps> = (
	{ dataIndex, dataSize, dataCurrent, children },
	ref
) => {
	const titleRef = useRef<HTMLDivElement>(null);
	const [translateX, setTranslateX] = useState(
		dataIndex === 0 ? -(dataSize * 0.05) : -(dataSize * dataIndex * 0.95)
	);

	useImperativeHandle(ref, () => ({
		startAnimation: (direction) => {
			TitleAnimation(
				direction,
				titleRef.current,
				dataSize,
				translateX,
				dataCurrent,
				dataIndex,
				setTranslateX
			);
		},
	}));

	return (
		<TitleContainer
			ref={titleRef}
			dataIndex={dataIndex}
			translateX={translateX}
			dataCurrent={dataCurrent}
		>
			<TitleTextContainer>
				<Titletext>{children}</Titletext>
			</TitleTextContainer>
		</TitleContainer>
	);
};

export default forwardRef(Title);

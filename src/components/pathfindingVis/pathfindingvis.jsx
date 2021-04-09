import Grid from "../grid/grid";
export default function PathFindingVis() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				height: "100vh",
				justifyContent: "flex-start",
				overflow: "hidden",
			}}>
			<Grid />
		</div>
	);
}

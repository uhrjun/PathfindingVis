import Grid from "../grid/grid";
export default function PathFindingVis() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				height: "100vh",
				justifyContent: "space-around",
			}}>
			<Grid />
		</div>
	);
}

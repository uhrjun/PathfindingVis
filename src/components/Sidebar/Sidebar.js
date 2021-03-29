export default function Sidebar({ children }) {
	return (
		<div
			style={{
				color: "white",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-evenly",
				alignItems: "center",
				width: "90%",
				marginBottom: "1em",
				padding: "1em",
			}}>
			{children}
		</div>
	);
}

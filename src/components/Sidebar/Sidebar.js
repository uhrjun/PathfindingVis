export default function Sidebar({ children }) {
	return (
		<div
			style={{
				color: "white",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-evenly",
				alignItems: "center",
				width: "20%",
				borderRight: "3px solid white",
			}}>
			{children}
		</div>
	);
}

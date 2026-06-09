export default function ErrorBoundaryFallback() {
	return (
		<div className="absolute h-full w-full bg-black p-6">
			<h1 className="title text-red-500">Technical difficulties</h1>
			<p className="paragraph text-white">
				Check the console to view full error.
			</p>
		</div>
	);
}

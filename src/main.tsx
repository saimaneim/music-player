import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "@/styles/global.css";
import App from "@/pages/App";
import NoFolderAccess from "@/pages/NoFolderAccess";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<App />} />
				<Route path="/NoFolder" element={<NoFolderAccess />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);

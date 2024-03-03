import { StatusBar } from "expo-status-bar";

import Navigation from "./src/infrastructure/navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
    </>
  );
}

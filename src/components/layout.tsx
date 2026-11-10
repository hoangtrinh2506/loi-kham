import { Toaster } from "react-hot-toast";
import { ScrollRestoration } from "./scroll-restoration";
import Page from "./page";

// Screens in the clinic finder flow render their own back links, so there is no shared header or tab bar
export default function Layout() {
  return (
    <div className="w-screen h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Page />
      <Toaster containerClassName="toast-container" position="bottom-center" />
      <ScrollRestoration />
    </div>
  );
}

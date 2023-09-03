"use client";
import "bootstrap/dist/css/bootstrap.css";
import { store, persistor } from "./_bootstraps/store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedComponent from "./_components/ProtectedComponent";
import { Provider } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="mb-5">{children}</div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

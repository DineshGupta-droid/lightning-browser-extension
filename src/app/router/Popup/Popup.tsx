import { HashRouter, Outlet, Route, Routes } from "react-router-dom";

import { useAuth } from "~/app/context/AuthContext";

import Home from "~/app/screens/Home";
import Unlock from "~/app/screens/Unlock";
import Send from "~/app/screens/Send";
import Receive from "~/app/screens/Receive";
import LNURLPay from "~/app/screens/LNURLPay";
import ConfirmPayment from "~/app/screens/ConfirmPayment";

import { AuthProvider } from "~/app/context/AuthContext";
import { AccountsProvider } from "~/app/context/AccountsContext";
import RequireAuth from "../RequireAuth";
import Navbar from "~/app/components/Navbar";
import Keysend from "~/app/screens/Keysend";

const POPUP_MAX_HEIGHT = 600;

function Popup() {
  return (
    <AuthProvider>
      <AccountsProvider>
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route index element={<Home />} />
              <Route path="send" element={<Send />} />
              <Route path="receive" element={<Receive />} />
              <Route path="lnurlPay" element={<LNURLPay />} />
              <Route path="keysend" element={<Keysend />} />
              <Route path="confirmPayment" element={<ConfirmPayment />} />
            </Route>
            <Route path="unlock" element={<Unlock />} />
          </Routes>
        </HashRouter>
      </AccountsProvider>
    </AuthProvider>
  );
}

const Layout = () => {
  const auth = useAuth();

  return (
    <div className="flex flex-col" style={{ height: `${POPUP_MAX_HEIGHT}px` }}>
      <Navbar
        title={
          typeof auth.account?.name === "string"
            ? `${auth.account?.name} - ${auth.account?.alias}`.substring(0, 21)
            : ""
        }
        subtitle={
          typeof auth.account?.balance === "number"
            ? `${auth.account.balance} sat`
            : ""
        }
      />

      <div className="overflow-y-auto grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Popup;

import Spinner from "../components/Spinner";
import { Container, Form, Accordion } from "react-bootstrap";
import AccountDetails from "../components/AccountDetails";
import AccountSecurity from "../components/AccountSecurity";
import { useSelector } from "react-redux";

function AccountSettings() {
  const { isLoading } = useSelector((state) => state.user);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <header className="text-center">
            <h4 className="mt-4">Account settings</h4>
          </header>
          <main className="mt-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Form className="w-100">
                  <Accordion className="my-3" defaultActiveKey="0">
                    <AccountDetails />
                    <AccountSecurity />
                  </Accordion>
                </Form>
              </div>
            </div>
          </main>
        </Container>
      )}
    </>
  );
}

export default AccountSettings;

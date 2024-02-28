import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../store/features/user/user-thunk";
import Spinner from "../components/Spinner";
import { Container, Form, Accordion } from "react-bootstrap";
import AccountDetails from "../components/AccountDetails";
import AccountSecurity from "../components/AccountSecurity";

function AccountSettings() {
  const { isLoading, userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserDetails());
  // }, [dispatch]);

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
                    <AccountDetails userDetails={userDetails} isLoading={isLoading} />
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

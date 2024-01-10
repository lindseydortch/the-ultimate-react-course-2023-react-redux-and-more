import GlobaStyles from "./styles/GlobalStyles";
import styled from "styled-components";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobaStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>

            <div>
              <Heading as="h2">Check In and Check Out</Heading>
              <Button variation="primary" size="medium" onClick={() => {}}>
                Check In
              </Button>
              <Button variation="secondary" size="small" onClick={() => {}}>
                Check Out
              </Button>
            </div>
          </Row>
        </Row>

        <Row type="vertical">
          <Heading as="h3">The Wild Oasis</Heading>
          <form>
            <Input type="number" placeholder="Number of guests" />
          </form>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;

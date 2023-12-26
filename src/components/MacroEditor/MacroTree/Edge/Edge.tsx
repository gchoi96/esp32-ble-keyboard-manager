import EdgeBorder from "#types/EdgeBorder";
import { Col, Container, Row } from "#components/MacroEditor/MacroTree/Edge/Edge.styles";
import { useCallback } from "react";
interface Props {
  border: EdgeBorder;
}
function Edge({ border }: Props) {
  const getBorder = useCallback((value: boolean | undefined) => {
    return value ? "1px solid black" : "none";
  }, []);
  return (
    <Container>
      <Row>
        <Col style={{ borderBottom: getBorder(border.left) }} />
        <Col
          style={{
            borderBottom: getBorder(border.right),
            borderLeft: getBorder(border.top),
          }}
        />
      </Row>
      <Row>
        <Col style={{ borderTop: getBorder(border.left) }} />
        <Col style={{ borderLeft: getBorder(border.bottom) }} />
      </Row>
    </Container>
  );
}

export default Edge;

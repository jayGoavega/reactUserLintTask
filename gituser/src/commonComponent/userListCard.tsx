import React from "react";
import { Row, Image, Col } from "react-bootstrap";
import { gitUserType } from "../utils";

interface Props {
  gitUserData: { api: { read(): gitUserType[] } };
}

const userListCard: React.FC<Props> = ({ gitUserData }) => {
  let user: gitUserType[] = gitUserData.api.read();

  return (
    <div>
      {user &&
        user.slice(0, 10).map((item: gitUserType, index: number) => {
          return (
            <div key={index} style={{ margin: 10 }}>
              <Row
                style={{
                  backgroundColor: "#E8EAF6",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Col
                  md={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                    src={item.avatar_url}
                  />
                </Col>
                <Col
                  md={8}
                  className="d-flex justify-content-start align-items-center"
                >
                  <div>
                    <h4>{item.login}</h4>
                    <h4 className="text-success">{item.url}</h4>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
    </div>
  );
};

export default userListCard;

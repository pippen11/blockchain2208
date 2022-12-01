import styled from "styled-components";
import { Link } from "react-router-dom";

const Boardcomponent = ({ item, remove, isCreator }) => {
  return (
    <BoardBox>
      <h1>{item.title}</h1>
      {/* 다른파일에서 Routes추가해주니 안터짐 title을 못읽어와서터짐? */}
      <h3>
        userName:{item.userName}-{item.createdAt}
        {!isCreator || (
          <span>
            <Link to={`/edit/${item.id}`}>
              <button>Edit</button>
            </Link>

            <button
              onClick={() => {
                remove();
              }}
            >
              Delete
            </button>
          </span>
        )}
      </h3>

      <p>{item.text}</p>
    </BoardBox>
  );
};

export default Boardcomponent;

const BoardBox = styled.div``;

import styled from 'styled-components';

export const Loading = styled.div`
  color: $fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    font-size: 14px;
    margin-top: 5px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      width: 100%;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const State = styled.div`
  width: 700px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex: 1;
  width: 100%;
  margin-top: 10px;

  span {
    width: 10px;
  }

  button {
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    margin: 0 0.25rem;
    width: 100px;
    color: #7159c1;
    border: 1px solid #ddd;
    background: #ddd;
    font-weight: bold;

    &:nth-child(${props => props.active + 1}) {
      color: #eee;
      border: 1px solid #7159c1;
      background: #7159c1;
      font-weight: bold;
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 100%;
  margin-top: 10px;

  span {
    flex: 1;
  }

  button {
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    margin: 0 0.25rem;
    width: 100px;

    color: #7159c1;
    border: 1px solid #ddd;
    background: #ddd;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

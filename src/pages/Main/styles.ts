import styled from 'styled-components';
import Card from '@material-ui/core/Card';

import { MOBILE_MAX, TABLET_MIN } from 'utils/variables';

export const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
`;

export const List = styled.div`
  margin-top: 25px;
  flex: 1;
  overflow: scroll;
`;

export const ListItem = styled(Card)`
  width: 46%;
  margin: 2%;
  color: #000;
  background-color: whitesmoke;
  text-decoration: none;
  display: inline-block;

  .action-area {
    padding: 25px;
  }

  &:visited {
    color: #999;
  }

  &:hover {
    color: #fff;
    background-color: thistle;

    &:visited {
      background-color: #d2aed2;
    }
  }

  .image {
    height: 300px;

    @media (max-width: ${MOBILE_MAX}) {
      height: 140px;
    }

    @media (min-width: ${TABLET_MIN}) {
      height: 400px;
    }
  }
`;

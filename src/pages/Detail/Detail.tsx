import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { Typography, IconButton, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import useGetCollectable from 'hooks/useGetCollectable';
import Spinner from 'components/Spinner';

import { RouterProps } from './type';
import { Header, Img, TextWrapper, ButtonBlock } from './styles';

const initData = {
  image_url: '',
  name: '',
  collection: { name: '' },
  permalink: '',
};

const Detail: FC<RouteComponentProps<RouterProps>> = ({
  match: {
    params: { contract_address, token_id },
  },
  history: { push },
}) => {
  const { t } = useTranslation();

  const { isDone, data = initData, fetch } = useGetCollectable({
    contract_address,
    token_id,
  });

  const goList = () => push('/list');

  const onPermalinkClick = () => {
    window.open(data.permalink);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!isDone) return <Spinner wrapperHeight="100vh" />;

  return (
    <div>
      <Header>
        <IconButton onClick={goList}>
          <ArrowBackIcon />
        </IconButton>
        <Typography align="center" variant="h4" component="h1">
          {data.collection.name}
        </Typography>
      </Header>

      <Img src={data.image_url} alt={data.name} />

      <TextWrapper>
        <Typography align="center" variant="h5" component="h2">
          {data.name}
        </Typography>
        <Typography align="center" variant="body1" color="textSecondary" component="p">
          {data.description}
        </Typography>
      </TextWrapper>

      <ButtonBlock>
        <Button onClick={onPermalinkClick}>{t('permalink')}</Button>
      </ButtonBlock>
    </div>
  );
};

export default Detail;

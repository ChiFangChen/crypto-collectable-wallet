import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Snackbar,
  Fade,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@material-ui/core';

import useGetCollectables from 'hooks/useGetCollectables';
import LanguageSwitcher from 'components/LanguageSwitcher';
import Spinner from 'components/Spinner';
import TopButton from 'components/TopButton';

import { AppWrapper, List, ListItem } from './styles';

function Main() {
  /* i18n */

  const { t } = useTranslation();

  /* main data */
  const [page, setPage] = useState(1);

  const { isLoading, isDone, data: collectables, isFinished, fetch } = useGetCollectables({
    page,
  });

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (isDone) {
      if (page === 1) {
        listRef.current?.scrollTo(0, 0);
      }
      setPage((p) => p + 1);
    }
  }, [isDone]);

  /* scroll */

  const [showTopBtn, setShowTopBtn] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const closeSnackbar = () => setShowSnackbar(false);

  const listRef = useRef<HTMLDivElement>(null);

  const onTopBottomClick = (): void =>
    listRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

  const onListScroll = useCallback(() => {
    if (!listRef.current) return;

    // clientHeight + scrollTop = scrollHeight
    const { clientHeight, scrollTop, scrollHeight } = listRef.current;

    if (!isLoading && scrollTop + clientHeight >= scrollHeight) {
      if (isFinished) setShowSnackbar(true);
      else fetch();
    }

    if (scrollTop > 100) setShowTopBtn(true);
    else setShowTopBtn(false);
  }, [listRef, isLoading, isFinished, fetch]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.addEventListener('scroll', onListScroll);
    return () => {
      if (list) list.removeEventListener('scroll', onListScroll);
    };
  }, [onListScroll]);

  return (
    <AppWrapper>
      <Typography align="center" variant="h3" component="h1">
        {t('heading')}
      </Typography>

      <LanguageSwitcher />

      <List ref={listRef}>
        {collectables.map((c: any, i: number) => (
          <ListItem key={`${c.id}${i}`}>
            <CardActionArea className="action-area">
              <CardMedia image={c.image_url} title={c.name} className="image" />
              <CardContent>
                <Typography component="h5" align="center">
                  {c.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </ListItem>
        ))}

        <Spinner isLoading={isLoading} />

        <Snackbar
          open={showSnackbar}
          onClose={closeSnackbar}
          TransitionComponent={Fade}
          autoHideDuration={1000}
        >
          <Typography variant="overline" display="block">
            {t('noMoreData')}
          </Typography>
        </Snackbar>

        <TopButton show={showTopBtn} onClick={onTopBottomClick} />
      </List>
    </AppWrapper>
  );
}

export default Main;

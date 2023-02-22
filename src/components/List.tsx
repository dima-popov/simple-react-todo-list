/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import '../main.css';
import {
  Container,
  Card,
  CardContent,
  Divider,
  Checkbox,
  Stack,
  Button,
  Typography,
  TextField,
  Box,
  IconButton,
  List,
  ListItem,
  Tooltip,
} from '@mui/material';
import { Delete, Create } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import store from '../services/store';

function ListForm() {
  const [listState, setList] = React.useState(store.getState().listValue);
  const [inputState, setInput] = React.useState('');
  listState.sort((a, b) => Number(b[0]) - Number(a[0]));
  const setInputUnsubscribe = store.subscribe(() => setInput(store.getState().inputValue));
  const setListUnsubscribe = store.subscribe(() => {
    setList(store.getState().listValue);
  });

  React.useEffect(
    () => () => {
      setInputUnsubscribe();
      setListUnsubscribe();
    },
    [listState],
  );

  return (
    <Container sx={{ marginTop: '60px' }}>
      <Card
        variant="outlined"
        sx={{ width: 500, margin: 'auto', backgroundColor: '#fffe92' }}
      >
        <CardContent>
          <Typography variant="h6" component="h1">
            TodoList
          </Typography>
          <Divider />
          <List>
            {listState.map((elmArr) => {
              const elm = elmArr[1];
              return (
                <ListItem key={elm.id} sx={{ display: 'flex' }}>
                  <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <Tooltip title={elm.date} placement="top">
                      <Typography variant="body1" component="span">
                        {elm.ready === true ? <s>{elm.text}</s> : elm.text}
                      </Typography>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Checkbox
                      data-testid="check"
                      checked={elm.ready}
                      onChange={(event) => {
                        elm.ready = event.target.checked;
                        store.dispatch({ type: 'list/update' });
                      }}
                    />
                    <Link
                      to={{
                        pathname: '/edit',
                        search: `?id=${elm.id}`,
                      }}
                    >
                      <IconButton aria-label="create" color="primary">
                        <Create />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you want to delete this item?',
                          ) === true
                        ) {
                          store.dispatch({ type: 'list/delete', payload: elm });
                        }
                      }}
                    >
                      <Delete sx={{ color: 'red' }} />
                    </IconButton>
                  </Box>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <Stack direction="row" spacing={2} mt="20px">
            <TextField
              label="new task"
              variant="outlined"
              value={inputState}
              onChange={(event) => {
                store.dispatch({
                  type: 'input/update',
                  payload: event.target.value,
                });
              }}
              onKeyDown={(event) => {
                if (event.key) {
                  if (event.key === 'Enter') {
                    store.dispatch({ type: 'list/add' });
                  }
                } else if (event.keyCode === 13) {
                  store.dispatch({ type: 'list/add' });
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                store.dispatch({ type: 'list/add' });
              }}
            >
              ADD
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ListForm;

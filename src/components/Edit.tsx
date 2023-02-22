/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Container,
  Card,
  CardContent,
  Divider,
  Stack,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import store from '../services/store';

function Edit() {
  const queryString = window.location.hash.split('?')[1];
  const params = new URLSearchParams(queryString);
  const id = params.get('id');
  const elmArr = store.getState().listValue.filter((elm) => elm[1].id === id);
  const [value, setValue] = React.useState(elmArr[0][1].text);
  const navigate = useNavigate();

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
          <Stack direction="row" spacing={2}>
            <TextField
              autoFocus
              label="edit task"
              variant="outlined"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (
                  window.confirm('Are you sure you want to edit this item?')
                  === true
                ) {
                  store.getState().listValue.forEach((elm) => {
                    const elmLoc = elm;
                    if (elm[1].id === id) {
                      elmLoc[1].text = value || '------';
                      elmLoc[0] = Date.now();
                      elmLoc[1].date = `${new Date().toDateString()}, ${new Date().toTimeString()}`;
                      store.dispatch({ type: 'list/update' });
                    }
                  });

                  navigate('/');
                }
              }}
            >
              Save
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Edit;

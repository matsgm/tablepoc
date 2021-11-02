import * as React from 'react';
import useArticles, { usePostArticle } from './resources/useArticles';
import update from 'immutability-helper';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import Box from '@mui/system/Box';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker, LoadingButton } from '@mui/lab';

const columns = [
  { field: 'title', headerName: 'Title', width: 300 },
  {
    field: 'published',
    headerName: 'Published',
    width: 150,
    type: 'dateTime',
  },
  {
    field: 'site',
    headerName: 'Site',
    width: 150,
  },
  {
    field: 'adGroup',
    headerName: 'Ad group',
    width: 150,
  },
  {
    field: 'bids',
    headerName: 'Bids',
    width: 75,
    type: 'number',
  },
  {
    field: 'spending',
    headerName: 'Spending',
    width: 150,
    type: 'number',
    renderCell: (cell: any) => (
      <div style={{ width: '100%', textAlign: 'right' }}>kr {cell.value}</div>
    ),
  },
  {
    field: 'winRate',
    headerName: 'Win rate',
    width: 150,
    type: 'number',
    renderCell: (cell: any) => (
      <div style={{ width: '100%', textAlign: 'right' }}>{cell.value}%</div>
    ),
  },
  {
    field: 'impressions',
    headerName: 'Impressions',
    width: 150,
    type: 'number',
  },
  {
    field: 'clicks',
    headerName: 'Clicks',
    width: 150,
    type: 'number',
  },
  {
    field: 'ctr',
    headerName: 'CTR',
    width: 120,
    type: 'number',
    renderCell: (cell: any) => (
      <div style={{ width: '100%', textAlign: 'right' }}>{cell.value}%</div>
    ),
  },
];

const StyledButton = styled(Button)`
  background-color: #fff200;
  color: black;
  &:hover {
    background-color: #d3c904;
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

const StyledDialogActions = styled(DialogActions)`
  justify-content: flex-start;
`;

const emptyForm = {
  title: '',
  published: '',
  site: '',
  adGroup: '',
  bids: '',
  spending: '',
  winRate: '',
  impressions: '',
  clicks: '',
  ctr: '',
};

function App() {
  const { articles, isLoading } = useArticles();
  const { postArticle, isLoading: postArticleIsLoading } = usePostArticle();
  const [open, setOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    title: '',
    published: '',
    site: '',
    adGroup: '',
    bids: '',
    spending: '',
    winRate: '',
    impressions: '',
    clicks: '',
    ctr: '',
  });

  const handleChange = (event: any) => {
    setForm((oldState) => update(oldState, { [event.target.name]: { $set: event.target.value } }));
  };

  const handlePublishedValue = (newValue: string | null) => {
    setForm((oldState) => update(oldState, { published: { $set: newValue ?? '' } }));
  };

  const handlePost = async () => {
    const success = await postArticle(form);
    if (success) {
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setForm({ ...emptyForm });
    setOpen(false);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box style={{ height: 400, width: '100%', margin: '1rem' }}>
        <StyledButton
          variant='contained'
          startIcon={<AddIcon />}
          style={{ marginBottom: '1rem' }}
          onClick={handleClickOpen}
        >
          Create new
        </StyledButton>

        <DataGrid
          rows={articles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          style={{ maxWidth: '95%' }}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New article</DialogTitle>
        <DialogContent style={{ padding: '1rem' }}>
          <InputLabel htmlFor='title'>Title</InputLabel>
          <StyledTextField hiddenLabel id='title' name='title' onBlur={handleChange} />

          <InputLabel htmlFor='published'>Published</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={form.published}
              onChange={(newValue) => {
                handlePublishedValue(newValue);
              }}
              renderInput={(params) => <StyledTextField hiddenLabel id='published' {...params} />}
            />
          </LocalizationProvider>

          <InputLabel htmlFor='site'>Site</InputLabel>
          <StyledTextField
            hiddenLabel
            id='site'
            name='site'
            select
            fullWidth
            onChange={handleChange}
            value={form.site}
          >
            {[
              { key: '', value: '' },
              { key: 'faedrelandsvennen', value: 'Fædrelandsvennen' },
              { key: 'dinside', value: 'DinSide' },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </StyledTextField>

          <InputLabel htmlFor='adGroup'>Ad group</InputLabel>
          <StyledTextField
            hiddenLabel
            id='adGroup'
            name='adGroup'
            select
            fullWidth
            onChange={handleChange}
            value={form.adGroup}
          >
            {[
              { key: '', value: '' },
              { key: 'magnus-uten-bil', value: 'Magnus uten bil' },
              { key: 'documentation', value: 'Dokumentasjon' },
            ].map((option) => (
              <MenuItem id={option.key} key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </StyledTextField>

          <Grid container spacing={1}>
            <Grid item>
              <InputLabel htmlFor='bids'>Bids</InputLabel>
              <StyledTextField hiddenLabel id='bids' name='bids' onBlur={handleChange} />
            </Grid>
            <Grid item>
              <InputLabel htmlFor='spending'>Spending</InputLabel>
              <StyledTextField hiddenLabel id='spending' name='spending' onBlur={handleChange} />
            </Grid>
            <Grid item>
              <InputLabel htmlFor='winRate'>Win rate</InputLabel>
              <StyledTextField hiddenLabel id='winRate' name='winRate' onBlur={handleChange} />
            </Grid>
            <Grid item>
              <InputLabel htmlFor='impressions'>Impressions</InputLabel>
              <StyledTextField
                hiddenLabel
                id='impressions'
                name='impressions'
                onBlur={handleChange}
              />
            </Grid>
            <Grid item>
              <InputLabel htmlFor='clicks'>Clicks</InputLabel>
              <StyledTextField hiddenLabel id='clicks' name='clicks' onBlur={handleChange} />
            </Grid>
            <Grid item>
              <InputLabel htmlFor='ctr'>CTR</InputLabel>
              <StyledTextField hiddenLabel id='ctr' name='ctr' onBlur={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <StyledDialogActions style={{}}>
          <LoadingButton
            onClick={handlePost}
            loading={postArticleIsLoading}
            style={{ background: 'green', color: 'white' }}
          >
            Create article
          </LoadingButton>
          <Button onClick={handleClose} style={{ color: 'grey' }}>
            Cancel
          </Button>
        </StyledDialogActions>
      </Dialog>
    </>
  );
}

export default App;

import { Provider } from 'react-redux';
import './App.css';
import FormComponent from './Pages/UseFormWork';
import store from './redux/store';
import {
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Register yourself
            </Typography>
          </Toolbar>
        </AppBar>
        <FormComponent />
      </Provider>
    </div>
  );
}

export default App;

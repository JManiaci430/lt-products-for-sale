import { Card, Grid, Paper } from "@mui/material";

import Header from "../Header";
import Filter from "../Filter";
import ProductsPane from "../ProductsPane";

const Layout = () => {
  return (
    <>
      <Header />
      <Grid container>        
        <Grid item xs={2}>
          <Paper 
            variant="outlined" 
            style={{ height: '95vh' }}
          >
            <Filter />
          </Paper>          
        </Grid>
        <Grid item xs={10}>
          <Paper 
            variant="outlined"
            style={{ height: '95vh'}}
          >            
            <ProductsPane />
          </Paper>                  
        </Grid>
      </Grid>
    </>
  );
}

export default Layout;
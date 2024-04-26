import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material"
import { useUnit } from "effector-react";

import { $categories, selectCategory } from "../../model/Products";

const Header = () => {
  const categories = useUnit($categories);
  
  return (
    <AppBar 
      position="static"
      color="inherit" 
      style={{
        backgroundColor: '#F8F8F8',
        height: '5vh'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar variant="dense" disableGutters>
          <img data-testid="FNSlogo" src="images/logo.jpg" width="auto" height="45vh" style={{ marginRight: '16px' }}/>
          <>
            {categories.map(category => 
              <Button color="primary" size="large" key={`categorybutton-${category}`} onClick={() => selectCategory(category)}>
                <Typography variant="h6">
                  {category}
                </Typography>
              </Button>
            )}
          </>
        </Toolbar>
      </Container>      
    </AppBar>
  );
}

export default Header;
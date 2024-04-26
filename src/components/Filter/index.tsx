import { Button, Card, Divider, Stack, TextField } from "@mui/material";
import BrandCheckboxes from "./BrandCheckboxes";
import { useUnit } from "effector-react";
import { $searchTerm, searchProducts, setSearchTerm } from "@/model/Products";

const Filter = () => {
  const searchTerm = useUnit($searchTerm);

  return (
    <>
      <Card style={{height: '100%', padding: '16px 8px', overflowY: 'scroll'}}>
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <div style={{ display: 'flex' }}>
            <TextField
              label="Search By Product Name"
              size="small"
              onChange={(e: React.ChangeEvent<any>) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Button variant='contained' onClick={() => searchProducts()}>
              Search
            </Button>
          </div>
          <BrandCheckboxes />
        </Stack>        
      </Card>      
    </>
  );
};

export default Filter;
import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useUnit } from "effector-react";

import { $brands, $selectedBrands, updateBrands } from "@/model/Products";

const BrandCheckboxes = () => {
  const brands = useUnit($brands);
  const selectedBrands = useUnit($selectedBrands);

  return (
    <div>
      <Typography variant="h6">Brands</Typography>
      <FormGroup style={{ marginTop: 0, paddingLeft: '32px'}}>
        {brands.map(brand => (
          <FormControlLabel 
            key={`checkbox-${brand}`} 
            control={
              <Checkbox size="small" checked={selectedBrands.includes(brand)} onChange={() => updateBrands(brand)}/>
            } 
            label={brand} 
          />
        ))}
      </FormGroup>
    </div>
  );
}

export default BrandCheckboxes;
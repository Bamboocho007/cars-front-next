import { FormControl, InputLabel, MenuItem, Radio, RadioProps, Select, Checkbox } from '@mui/material'
import React, { FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SQuickSearchBox, SQuickSearchLine, SRadioGroup, SShortLine, SFormControlLabel, SShortLineLabel, SSearchButton, WithGaps } from './QuickSearchFormStyles'

const RadioBtnTemplate: FunctionComponent<RadioProps & {checkedLabel: string, label: string}> = ({checkedLabel, label, ...rest}) => {
  return <Radio 
    value="0"
    checkedIcon={<button className="btn">{checkedLabel}</button>}
    icon={<button className="btn">{label}</button>}
    disableRipple
    sx={{
      ":hover": {
        backgroundColor: 'initial'
      },
      padding: '0',
    }}
    {...rest}
  />
}

export const QuickSearchForm: FunctionComponent = () => {
  const { control, handleSubmit, getValues, formState: { errors }, setValue } = useForm()

  return (
    <SQuickSearchBox>
      <SQuickSearchLine>
        <Controller 
          name="carState"
          defaultValue="0"
          control={control}
          render={({ field }) =>
            <SRadioGroup
              {...field}
            >
              <RadioBtnTemplate value="0" checkedLabel={'All c'} label={'All'}/>
              <RadioBtnTemplate value="1" checkedLabel={'Were in use c'} label={'Were in use'}/>
              <RadioBtnTemplate value="2" checkedLabel={'New c'} label={'New'}/>
            </SRadioGroup>}
        />

        <SShortLine>
          <div></div>
          <Controller 
            name="checkedVin"
            control={control}
            render={({ field }) =>
            <SFormControlLabel
              control={<Checkbox  {...field}/>}
              label="Checked vin"
              labelPlacement="start"
              sx={{
                margin: 0,
              }}
            />}
          />
        </SShortLine>

      </SQuickSearchLine>

      <SQuickSearchLine>
        <WithGaps>
          <Controller
            name="vehicleType"
            control={control}
            defaultValue=""
            render={({ field }) => 
              <FormControl variant="standard" className="mt-2" style={{width: '100%'}}>
                <InputLabel id="demo-simple-select-standard-label">Vehicle type</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Cities of subdivision"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/* {subdivisionsWithCities && subdivisionsWithCities
                    .find(s => s.cityId === subdivisionsId)?.children
                    .map(c => {
                      return <MenuItem key={c.cityId} value={c.cityId}>{c.cityId}</MenuItem>
                  })} */}
                </Select>
              </FormControl>}
          />

          <Controller
            name="brand"
            control={control}
            defaultValue=""
            render={({ field }) => 
              <FormControl variant="standard" className="mt-2" style={{width: '100%'}}>
                <InputLabel id="demo-simple-select-standard-label">Brand</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Cities of subdivision"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/* {subdivisionsWithCities && subdivisionsWithCities
                    .find(s => s.cityId === subdivisionsId)?.children
                    .map(c => {
                      return <MenuItem key={c.cityId} value={c.cityId}>{c.cityId}</MenuItem>
                  })} */}
                </Select>
              </FormControl>}
          />

          <Controller
            name="model"
            control={control}
            defaultValue=""
            render={({ field }) => 
              <FormControl variant="standard" className="mt-2" style={{width: '100%'}}>
                <InputLabel id="model">Model</InputLabel>
                <Select
                  value=''
                  {...field}
                  labelId="model"
                  id="modelId"
                  label="Cities of subdivision"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/* {subdivisionsWithCities && subdivisionsWithCities
                    .find(s => s.cityId === subdivisionsId)?.children
                    .map(c => {
                      return <MenuItem key={c.cityId} value={c.cityId}>{c.cityId}</MenuItem>
                  })} */}
                </Select>
              </FormControl>}
          />
        </WithGaps>
        <WithGaps>
          <SShortLine>
            <SShortLineLabel>
              Subdivision
            </SShortLineLabel>
            <Controller 
              name="subdivision"
              control={control}
              defaultValue=""
              render={({ field }) =>
              <FormControl variant="standard">
                <InputLabel id="subdivision">Subdivision</InputLabel>
                <Select
                  labelId="subdivision"
                  value={''}
                  label="Subdivision"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>}
            />
          </SShortLine>
          <SShortLine>
            <SShortLineLabel>
              Year
            </SShortLineLabel>
          </SShortLine>
          <SShortLine>
            <SShortLineLabel>
              Price
            </SShortLineLabel>
          </SShortLine>
        </WithGaps>
      </SQuickSearchLine>

        
      <SQuickSearchLine>
        <button className='btn' type='button'>Aditional filters</button>

        <SShortLine>
          <div></div>
          <SSearchButton className='btn' type='button'>Search</SSearchButton>
        </SShortLine>
      </SQuickSearchLine>
      
    </SQuickSearchBox>
  )
}

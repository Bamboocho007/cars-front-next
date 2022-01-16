import { FormControlLabel, RadioGroup } from '@mui/material'
import { style } from '@mui/system'
import styled from 'styled-components'

export const SQuickSearchBox = styled.div`
  padding: 15px;
  background-color: #db5c4c;
`
export const SQuickSearchLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  &:first-child {
    margin-top: 0px;
  }
  & > *:first-child {
    width: 45%;
  }
  & > *:last-child {
    width: 55%;
    margin-left: 20px;
  }
`

export const WithGaps = styled.div`
  & > *:first-child {
    margin-top: 0px;
  }
  & > * {
    margin-top: 10px;
  }
`

export const SRadioGroup = styled(RadioGroup)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`

export const SShortLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > *:first-child {
    width: 100px;
  }
  & > *:last-child {
    flex-grow: 1;
  }
`

export const SFormControlLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    flex-grow: 1;
    text-align: center;
    background-color: #246799;
  }

  .MuiCheckbox-root {
    margin-right: -9px;
  }
`

export const SShortLineLabel = styled.label`
  margin-top: 16px;
`

export const SSearchButton = styled.button`
  
`
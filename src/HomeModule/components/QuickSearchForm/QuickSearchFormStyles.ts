import { FormControlLabel, RadioGroup } from '@mui/material'
import styled from 'styled-components'

const QuickSearchBox = styled.div`
  padding: 15px;
  background-color: #db5c4c;
`
const QuickSearchLine = styled.div`
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

const WithGaps = styled.div`
  & > *:first-child {
    margin-top: 0px;
  }
  & > * {
    margin-top: 10px;
  }
`

const RGroup = styled(RadioGroup)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`

const ShortLine = styled.div`
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

const ControlLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    flex-grow: 1;
    text-align: center;
    background-color: #246799;
  }

  .MuiCheckbox-root {
    margin-right: -9px;
  }
`

const TwoSelectsLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  & > * {
    width: 100%;
  }

  & > *:first-child {
    margin-right: 10px;
  }
`

const ShortLineLabel = styled.label`
  margin-top: 16px;
`

const SearchButton = styled.button`
  
`

export const QuickSearchFormStyles = {
  QuickSearchBox,
  QuickSearchLine,
  WithGaps,
  RGroup,
  ShortLine,
  ControlLabel,
  TwoSelectsLine,
  ShortLineLabel,
  SearchButton,
} 
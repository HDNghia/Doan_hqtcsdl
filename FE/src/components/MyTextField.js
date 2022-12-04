import { FormHelperText, TextField } from '@mui/material'
import { FastField } from 'formik'
import React from 'react'

const MyTextField = ({ name, ...otherProps }) => {
  return (
    <FastField name={name}>
      {({ field, form, meta }) => (
        <>
          <TextField {...otherProps} {...field} error={Boolean(meta.error && meta.touched)} />
          {meta.touched && meta.error && (
            <FormHelperText error sx={{ marginTop: '0px' }}>
              {meta.error}
            </FormHelperText>
          )}
        </>
      )}
    </FastField>
  )
}

export default MyTextField

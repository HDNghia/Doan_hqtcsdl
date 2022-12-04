import React, { useState, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { LoadingButton } from '@mui/lab'
import BuildIcon from '@mui/icons-material/Build'
import {
  Autocomplete,
  Stack,
  Tab,
  Tabs,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TextField,
} from '@mui/material'
import { TabPanelProps } from '../../../interface/interface'
import { Grid } from '@mui/material'
import * as yup from 'yup'
import axios from '../../config/axiosClient.js'
import { Form, Formik } from 'formik'
import MyTextField from '../../components/MyTextField'
import { uid } from 'uid'
var moment = require('moment')

const initialValuesKH = {
  HOTEN: '',
  NGAYSINH: '',
  GIOITINH: '',
  LOAIKH: '',
  DIEMTICHLUY: '',
  MAKH: '',
}

const validationSchema = yup.object({
  HOTEN: yup.string().required('Vui lòng nhập họ và tên').max(128, 'Vượt quá kí tự giới hạn'),
  NGAYSINH: yup.date().required('Vui lòng nhập ngày sinh của bạn'),
  DIEMTICHLUY: yup.number(),
  LOAIKH: yup.string(),
})

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  )
}

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function Admin() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number>(0)
  const [customer, setCustomer] = useState<any>()

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get('/customer')
      setCustomer(res.data.data)
      console.log(res.data.data)
    }
    getUserData()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  async function handleSubmitKH(value: any) {
    try {
      const res = await axios.put('/update-customer', value)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Tabs value={value} onChange={handleChange} orientation='vertical'>
          <Tab label='Quản Lý Khách Hàng' {...a11yProps(0)} />
          <Tab label='Quản Lý Nhân Viên' {...a11yProps(1)} />
          <Tab label='Quản Lý Phim' {...a11yProps(2)} />
          <Tab label='Quản Lý Lịch Chiếu' {...a11yProps(3)} />
          <Tab label='Quản Lý Suất Chiếu' {...a11yProps(4)} />
          <Tab label='Quản Lý Phòng' {...a11yProps(5)} />
        </Tabs>
        <Divider />
      </Drawer>
      <Main sx={{ pt: 10 }} open={open}>
        <TabPanel value={value} index={0}>
          <Formik
            initialValues={initialValuesKH}
            validationSchema={validationSchema}
            onSubmit={handleSubmitKH}
          >
            {(formik) => {
              console.log(formik.errors)
              function updateField(customer: any) {
                formik.setFieldValue('HOTEN', customer.HOTEN)
                formik.setFieldValue('NGAYSINH', moment(customer.NGAYSINH).format('YYYY-MM-DD'))
                formik.setFieldValue('GIOITINH', customer.GIOITINH)
                formik.setFieldValue('LOAIKH', customer.LOAIKH)
                formik.setFieldValue('DIEMTICHLUY', customer.DIEMTICHLUY)
                formik.setFieldValue('MAKH', customer.MAKH)
              }
              async function setSelectedRowKH(id: number) {
                try {
                  const res = await axios.get('/customer?id=' + id)
                  const customer = res.data.data
                  customer.map((cus: any) => updateField(cus))
                } catch (error) {
                  console.log(error)
                }
              }
              return (
                <Grid container spacing={3}>
                  <Grid item md={5}>
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                      <Typography variant='h4' color='red'>
                        Thông tin khách hàng
                      </Typography>
                    </Stack>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                      <Stack
                        direction='column'
                        justifyContent='center'
                        alignItems='flex-start'
                        spacing={2}
                        sx={{ p: 2 }}
                      >
                        <MyTextField
                          fullWidth
                          placeholder='Hãy nhập họ và tên'
                          label='Họ'
                          name='HOTEN'
                          variant='outlined'
                        />
                        <MyTextField
                          fullWidth
                          label='Ngày sinh'
                          placeholder='Ngày Sinh'
                          type='date'
                          name='NGAYSINH'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                        <Autocomplete
                          inputValue={formik.values.GIOITINH}
                          options={['Nam', 'Nữ']}
                          sx={{ width: 300 }}
                          onChange={(e, value) => {
                            const data = value
                            formik.setFieldValue('GIOITINH', value ? data : formik.values.GIOITINH)
                          }}
                          renderInput={(params) => (
                            <TextField name='GIOITINH' {...params} label='Giới tính' />
                          )}
                        />
                        <MyTextField
                          name='LOAIKH'
                          variant='outlined'
                          label='Loại'
                          placeholder='Loại khách hàng'
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <MyTextField
                          name='DIEMTICHLUY'
                          variant='outlined'
                          label='Tích lũy'
                          placeholder='Điểm tích lũy'
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Stack>
                      <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={2}
                        sx={{ p: 2 }}
                      >
                        <LoadingButton
                          startIcon={<BuildIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                        >
                          Sửa
                        </LoadingButton>
                      </Stack>
                    </Form>
                  </Grid>
                  <Divider orientation='vertical' flexItem />
                  <Grid item md={6}>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã</TableCell>
                            <TableCell>Họ tên</TableCell>
                            <TableCell>Ngày sinh</TableCell>
                            <TableCell>Giới tính</TableCell>
                            <TableCell>Loại</TableCell>
                            <TableCell>Tích lũy</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {customer
                            ? customer.map((row: any) => (
                                <TableRow
                                  hover
                                  key={uid()}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  onClick={() => setSelectedRowKH(row.MAKH)}
                                >
                                  <TableCell component='th' scope='row'>
                                    {row.MAKH}
                                  </TableCell>
                                  <TableCell>{row.HOTEN}</TableCell>
                                  <TableCell>{moment(row.NGAYSINH).format('D/M/YYYY')}</TableCell>
                                  <TableCell>{row.GIOITINH}</TableCell>
                                  <TableCell>{row.LOAIKH}</TableCell>
                                  <TableCell>{row.DIEMTICHLUY}</TableCell>
                                </TableRow>
                              ))
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              )
            }}
          </Formik>
        </TabPanel>
        <TabPanel value={value} index={1}>
          item 2
        </TabPanel>
        <TabPanel value={value} index={2}>
          item 3
        </TabPanel>
        <TabPanel value={value} index={3}>
          item 4
        </TabPanel>
      </Main>
    </Box>
  )
}

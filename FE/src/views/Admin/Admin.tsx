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
import { Alert } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { LoadingButton } from '@mui/lab'
import BuildIcon from '@mui/icons-material/Build'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import toast, { Toaster } from 'react-hot-toast';
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
  action: '',
}

const initialValuesNV = {
  HOTEN: '',
  NGAYSINH: '',
  GIOITINH: '',
  NGAYVL: '',
  DIACHI: '',
  CMND: '',
  LUONG: '',
  SDT: '',
  MANV: '',
  action: '',
}

const initialValuesMatches = {
  MATB: '',
  TENTB: '',
  NGAYBD: '',
  TRONGTAI: '',
  BLV: '',
  DOANHTHU: '',
  action: '',
}

const initialValuesDV = {
  MAKH: '',
  MATB: '',
  MANV: '',
  NGAYDAT: '',
  VITRI: '',
  GIAVE: '',
}

const LOAIVE = [
  { label: 'Vé loại 1', value: '1600000' },
  { label: 'Vé loại 2', value: '1200000' },
  { label: 'Vé loại 3', value: '800000' },
]

const validationSchemaKH = yup.object({
  HOTEN: yup.string().required('Vui lòng nhập họ và tên').max(128, 'Vượt quá kí tự giới hạn'),
  NGAYSINH: yup.date().required('Vui lòng nhập ngày sinh của bạn'),
  DIEMTICHLUY: yup.number(),
  LOAIKH: yup.string(),
})

const validationSchemaNV = yup.object({
  HOTEN: yup.string().required('Vui lòng nhập họ và tên').max(128, 'Vượt quá kí tự giới hạn'),
  NGAYSINH: yup.date().required('Vui lòng nhập ngày sinh của bạn'),
  SDT: yup.number().required('Vui lòng nhập số điện thoại'),
  CMND: yup
    .number()
    .required('Vui lòng nhập CMND')
    .integer('Số thập phân không cho phép')
    .positive('Phải là số dương'),
  LUONG: yup.number().required('Vui lòng nhập lương').positive('Phải là số dương'),
  DIACHI: yup.string().required('Vui lòng nhập địa chỉ'),
  NGAYVL: yup.date().required('Vui lòng nhập ngày vào làm'),
  MANV: yup.number().positive('Mã khách hàng không được âm'),
})

const validationSchemaMatches = yup.object({
  TENTB: yup.string().required('Nhập tên trận bóng').max(128, 'Vượt quá kí tự giới hạn'),
  NGAYBD: yup.date().required('Vui lòng nhập ngày bắt đầu'),
  DOANHTHU: yup.number(),
  TRONGTAI: yup.string().required('Vui lòng nhập tên trọng tài'),
  BLV: yup.string().required('Vui lòng nhập tên BLV'),
  MATB: yup.number(),
})
const validationSchemaDV = yup.object({
  MAKH: yup.number().required("Vui lòng chọn khách mua vé"),
  MATB: yup.number().required("Vui lòng chọn khách mua vé"),
  MANV: yup.number().required("Vui lòng chọn khách mua vé"),
  NGAYDAT: yup.string().required('Vui lòng nhập ngày'),
  VITRI: yup.string().required('Vui lòng nhập khán đài tầng - vị trí ghế'),
  GIAVE: yup.number().required("Vui lòng chọn loại vé"),
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
  const [staff, setStaff] = useState<any>()
  const [matches, setMatches] = useState<any>()
  const [errorNV, setErrorNV] = useState<string>('')
  const [errorKH, setErrorKH] = useState<string>('')
  const [errorMatches, setErrorMatches] = useState<string>('')
  const [errorBuyTicket, setErrorBuyTicket] = useState<string>('')

  //get data khách hàng
  const getUserData = async () => {
    try {
      const res = await axios.get('/customer')
      setCustomer(res.data.data)
    } catch (error) {
      setErrorKH(error.message)
    }
  }
  //get data trận bóng
  const getMatchesData = async () => {
    try {
      const res = await axios.get('/match')
      setMatches(res.data.data)
    } catch (error) {
      setErrorMatches(error.message)
    }
  }

  //get data nhân viên
  const getStaffData = async () => {
    try {
      const res = await axios.get('/staff')
      setStaff(res.data.data)
    } catch (error) {
      setErrorNV(error.message)
    }
  }

  useEffect(() => {
    getUserData()
    getStaffData()
    getMatchesData()
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

  const notify = (message: string) => toast.success(message);

  //submit funtion customer
  async function handleSubmitKH(value: any) {
    const action = value.action
    setErrorKH("")
    if (action === "change") {
      await axios.put('/update-customer', value).then(function (res) {
        const message = (Object.values(res.data.message)[0]) as string
        notify(message)
      }).catch(function (error) {
        if (error.response) {
          setErrorKH(error.response.data.message.message);
        } else if (error.request) {
          setErrorKH(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    } else if (action === "add") {
      await axios.post('/create-customer', value).then(function (res) {
        const message = (Object.values(res.data.message)[0]) as string
        notify(message)
      }).catch(function (error) {
        if (error.response) {
          setErrorKH(error.response.data.message.message);
        } else if (error.request) {
          setErrorKH(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    } else if (action === "delete") {
      await axios.delete('/delete-customer?id=' + value.MAKH).then(function (res) {
        console.log(res)
      }).catch(function (error) {
        if (error.response) {
          setErrorKH(error.response.data.message.message);
        } else if (error.request) {
          setErrorKH(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    }
    getUserData()
  }

  async function handleSubmitNV(value: any) {
    setErrorNV('')
    const { action, MANV } = value
    if (action === 'add') {
      await axios.post('/create-staff', value).then(function (res) {
        const message = (Object.values(res.data.message)[0]) as string
        notify(message)
      }).catch(function (error) {
        if (error.response) {
          setErrorNV(error.response.data.message.message);
        } else if (error.request) {
          setErrorNV(error.request);
        } else {
          console.log('Error', error.message);
        }
      });

    } else if (action === 'delete') {

      await axios.delete('/delete-staff?id=' + MANV).catch(function (error) {
        if (error.response) {
          setErrorNV(error.response.data.message.message);
        } else if (error.request) {
          setErrorNV(error.request);
        } else {
          console.log('Error', error.message);
        }
      });

    } else if (action === 'change') {

      await axios.put('/update-staff', value).then(function (res) {
        const message = (Object.values(res.data.message)[0]) as string
        notify(message)
      }).catch(function (error) {
        if (error.response) {
          setErrorNV(error.response.data.message.message);
        } else if (error.request) {
          setErrorNV(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    }
    getStaffData()
  }

  async function handleSubmitMatches(value: any) {
    setErrorMatches('')
    const { action, MATB } = value
    if (action === 'add') {
      await axios.post('/create-match', value).then(function (res) {
        const message = (Object.values(res.data.message)[0]) as string
        notify(message)
      }).catch(function (error) {
        if (error.response) {
          setErrorMatches(error.response.data.message.message);
        } else if (error.request) {
          setErrorMatches(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    } else if (action === 'delete') {
      await axios.delete('/delete-match?id=' + MATB).catch(function (error) {
        if (error.response) {
          setErrorMatches(error.response.data.message.message);
        } else if (error.request) {
          setErrorMatches(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    } else if (action === 'change') {
      await axios.put('/update-match', value).then(function (res) {
        const message = (Object.values(res.data.message)[0]) as string
        notify(message)
      }).catch(function (error) {
        if (error.response) {
          setErrorMatches(error.response.data.message.message);
        } else if (error.request) {
          setErrorMatches(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    }
    getMatchesData()
  }

  async function handleSubmitDV(params: any) {
    setErrorBuyTicket('')
    await axios.post('/book-ticket', params).then(function (res) {
      const message = (Object.values(res.data.message)[0]) as string
      notify(message)
    }).catch(function (error) {
      if (error.response) {
        setErrorBuyTicket(error.response.data.message.message);
      } else if (error.request) {
        setErrorBuyTicket(error.request);
      } else {
        console.log('Error', error.message);
      }
    });

  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
            Bảng thông tin
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
          <Tab label='Quản Lý Trận Bóng' {...a11yProps(2)} />
          <Tab label='Quản Lý Đặt Vé' {...a11yProps(3)} />
        </Tabs>
        <Divider />
      </Drawer>
      <Main sx={{ pt: 10 }} open={open}>
        <TabPanel value={value} index={0}>
          {errorKH ? <Alert severity='error'>{errorKH}</Alert> : null}
          <Formik
            initialValues={initialValuesKH}
            validationSchema={validationSchemaKH}
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
                          label='Họ và tên'
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
                          fullWidth
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
                          disabled
                          variant='outlined'
                          label='Loại'
                          placeholder='Loại khách hàng'
                        />
                        <MyTextField
                          name='DIEMTICHLUY'
                          disabled
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
                          startIcon={<AddIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='success'
                          onClick={() => formik.setFieldValue('action', 'add')}
                        >
                          Thêm
                        </LoadingButton>
                        <LoadingButton
                          startIcon={<DeleteIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='error'
                          onClick={() => formik.setFieldValue('action', 'delete')}
                        >
                          Xóa
                        </LoadingButton>
                        <LoadingButton
                          startIcon={<BuildIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='warning'
                          onClick={() => formik.setFieldValue('action', 'change')}
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
          {errorNV ? <Alert severity='error'>{errorNV}</Alert> : null}
          <Formik
            initialValues={initialValuesNV}
            validationSchema={validationSchemaNV}
            onSubmit={handleSubmitNV}
          >
            {(formik) => {
              console.log(formik.errors)
              function updateField(staff: any) {
                formik.setFieldValue('HOTEN', staff.HOTEN)
                formik.setFieldValue('NGAYSINH', moment(staff.NGAYSINH).format('YYYY-MM-DD'))
                formik.setFieldValue('NGAYVL', moment(staff.NGAYVL).format('YYYY-MM-DD'))
                formik.setFieldValue('GIOITINH', staff.GIOITINH)
                formik.setFieldValue('MANV', staff.MANV)
                formik.setFieldValue('SDT', staff.SDT)
                formik.setFieldValue('CMND', staff.CMND)
                formik.setFieldValue('DIACHI', staff.DIACHI)
                formik.setFieldValue('LUONG', staff.LUONG)
              }
              async function setSelectedRowKH(id: number) {
                try {
                  const res = await axios.get('/staff?id=' + id)
                  const customer = res.data.data
                  customer.map((cus: any) => updateField(cus))
                } catch (error) {
                  console.log(error)
                }
              }
              return (
                <Grid container spacing={3}>
                  <Grid item xs={5}>

                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                      <Typography variant='h4' color='red'>
                        Thông tin nhân viên
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
                          label='Họ và tên'
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
                          fullWidth
                          onChange={(e, value) => {
                            const data = value
                            formik.setFieldValue('GIOITINH', value ? data : formik.values.GIOITINH)
                          }}
                          renderInput={(params) => (
                            <TextField name='GIOITINH' {...params} label='Giới tính' />
                          )}
                        />
                        <MyTextField
                          name='NGAYVL'
                          variant='outlined'
                          label='Ngày vào làm'
                          type='date'
                          placeholder='Ngày vào làm nhân viên'
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                        <MyTextField
                          name='DIACHI'
                          variant='outlined'
                          label='Địa chỉ'
                          placeholder='Địa chỉ nhân viên'
                          fullWidth
                        />
                        <MyTextField
                          fullWidth
                          name='CMND'
                          variant='outlined'
                          label='CMND'
                          placeholder='Chứng minh nhân dân'
                        />
                        <MyTextField
                          fullWidth
                          name='SDT'
                          variant='outlined'
                          label='SDT'
                          placeholder='Số điện thoại'
                        />
                        <MyTextField
                          name='LUONG'
                          variant='outlined'
                          label='Lương'
                          placeholder='Lương nhân viên'
                          fullWidth
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
                          startIcon={<AddIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='success'
                          onClick={() => formik.setFieldValue('action', 'add')}
                        >
                          Thêm
                        </LoadingButton>
                        <LoadingButton
                          startIcon={<DeleteIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='error'
                          onClick={() => formik.setFieldValue('action', 'delete')}
                        >
                          Xóa
                        </LoadingButton>
                        <LoadingButton
                          startIcon={<BuildIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='warning'
                          onClick={() => formik.setFieldValue('action', 'change')}
                        >
                          Sửa
                        </LoadingButton>
                      </Stack>
                    </Form>
                  </Grid>
                  <Divider orientation='vertical' flexItem />
                  <Grid item xs={6.9}>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã</TableCell>
                            <TableCell>Họ tên</TableCell>
                            <TableCell>Ngày sinh</TableCell>
                            <TableCell>Giới tính</TableCell>
                            <TableCell>SĐT</TableCell>
                            <TableCell>CMND</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Ngày vào làm</TableCell>
                            <TableCell>Lương</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {staff
                            ? staff.map((row: any) => (
                              <TableRow
                                hover
                                key={uid()}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => setSelectedRowKH(row.MANV)}
                              >
                                <TableCell component='th' scope='row'>
                                  {row.MANV}
                                </TableCell>
                                <TableCell>{row.HOTEN}</TableCell>
                                <TableCell>{moment(row.NGAYSINH).format('D/M/YYYY')}</TableCell>
                                <TableCell>{row.GIOITINH}</TableCell>
                                <TableCell>{row.SDT}</TableCell>
                                <TableCell>{row.CMND}</TableCell>
                                <TableCell>{row.DIACHI}</TableCell>
                                <TableCell>{moment(row.NGAYVL).format('D/M/YYYY')}</TableCell>
                                <TableCell>{row.LUONG}</TableCell>
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
        <TabPanel value={value} index={2}>
          {errorMatches ? <Alert severity='error'>{errorMatches}</Alert> : null}
          <Formik
            initialValues={initialValuesMatches}
            validationSchema={validationSchemaMatches}
            onSubmit={handleSubmitMatches}
          >
            {(formik) => {
              console.log(formik.errors)
              function updateField(match: any) {
                formik.setFieldValue('TENTB', match.TENTB)
                formik.setFieldValue('NGAYBD', moment(match.NGAYBD).format('YYYY-MM-DD'))
                formik.setFieldValue('DOANHTHU', match.DOANHTHU)
                formik.setFieldValue('TRONGTAI', match.TRONGTAI)
                formik.setFieldValue('BLV', match.BLV)
                formik.setFieldValue('MATB', match.MATB)
              }
              async function setSelectedRowKH(id: number) {
                try {
                  const res = await axios.get('/match?id=' + id)
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
                        Thông tin trận bóng
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
                          placeholder='Hãy nhập tên trận bóng'
                          label='Tên trận bóng'
                          name='TENTB'
                          variant='outlined'
                        />
                        <MyTextField
                          fullWidth
                          label='Ngày bắt đầu'
                          placeholder='Ngày bắt đầu'
                          type='date'
                          name='NGAYBD'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                        <MyTextField
                          fullWidth
                          name='TRONGTAI'
                          variant='outlined'
                          label='Trọng tài'
                          placeholder='Trọng tài'
                        />
                        <MyTextField
                          fullWidth
                          name='BLV'
                          variant='outlined'
                          label='BLV'
                          placeholder='Trọng tài'
                        />
                        <MyTextField
                          fullWidth
                          name='DOANHTHU'
                          variant='outlined'
                          label='Doanh thu'
                          placeholder='Doanh thu'
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
                          startIcon={<AddIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='success'
                          onClick={() => formik.setFieldValue('action', 'add')}
                        >
                          Thêm
                        </LoadingButton>
                        <LoadingButton
                          startIcon={<DeleteIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='error'
                          onClick={() => formik.setFieldValue('action', 'delete')}
                        >
                          Xóa
                        </LoadingButton>
                        <LoadingButton
                          startIcon={<BuildIcon />}
                          loading={formik.isSubmitting}
                          variant='contained'
                          type='submit'
                          color='warning'
                          onClick={() => formik.setFieldValue('action', 'change')}
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
                            <TableCell>Mã trận bóng</TableCell>
                            <TableCell>Tên trận bóng</TableCell>
                            <TableCell>Ngày bắt đầu</TableCell>
                            <TableCell>Trọng tài</TableCell>
                            <TableCell>BLV</TableCell>
                            <TableCell>Doanh thu</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {matches
                            ? matches.map((row: any) => (
                              <TableRow
                                hover
                                key={uid()}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => setSelectedRowKH(row.MATB)}
                              >
                                <TableCell component='th' scope='row'>
                                  {row.MATB}
                                </TableCell>
                                <TableCell>{row.TENTB}</TableCell>
                                <TableCell>{moment(row.NGAYBD).format('D/M/YYYY')}</TableCell>
                                <TableCell>{row.TRONGTAI}</TableCell>
                                <TableCell>{row.BLV}</TableCell>
                                <TableCell>{row.DOANHTHU}</TableCell>
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
        <TabPanel value={value} index={3}>
          {errorBuyTicket ? <Alert severity='error'>{errorBuyTicket}</Alert> : null}
          <Formik
            initialValues={initialValuesDV}
            validationSchema={validationSchemaDV}
            onSubmit={handleSubmitDV}>
            {(formik) => {
              console.log(formik.errors)
              formik.values.NGAYDAT = moment().format('DD-MM-YYYY')
              return (<Grid container spacing={3}>
                <Grid item md={5} sx={{ p: 2 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant='h4' color='red'>Quản lý đặt vé bóng đá</Typography>
                  </Stack>

                  <Form noValidate onSubmit={formik.handleSubmit}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{ width: "100%" }}
                    >
                      <Autocomplete
                        fullWidth
                        onChange={(e, value) => {
                          const data = value[1]
                          formik.setFieldValue('MANV', value ? data : formik.values.MANV)
                        }}
                        options={staff.map((value: any) => ([value.HOTEN, value.MANV]))}
                        getOptionLabel={(option: any) => (option[0])}
                        renderInput={(params) => <TextField variant='outlined'
                          label='Tên nhân viên' {...params} />}
                      />
                      <Autocomplete
                        fullWidth

                        onChange={(e, value) => {
                          const data = value[1]
                          formik.setFieldValue('MAKH', value ? data : formik.values.MAKH)
                        }}
                        options={customer.map((value: any) => ([value.HOTEN, value.MAKH]))}
                        getOptionLabel={(option: any) => (option[0])}
                        renderInput={(params) => <TextField variant='outlined'
                          label='Tên khách hàng' {...params} />}
                      />
                      <Autocomplete
                        fullWidth
                        onChange={(e, value) => {
                          const data = value[1]
                          formik.setFieldValue('MATB', value ? data : formik.values.MATB)
                        }}
                        options={matches.map((value: any) => ([value.TENTB, value.MATB]))}
                        getOptionLabel={(option: any) => (option[0])}
                        renderInput={(params) => <MyTextField variant='outlined'
                          label='Tên trận bóng' name="MATB"  {...params} />}
                      />
                      <Autocomplete
                        fullWidth
                        onChange={(e, value) => {
                          const data = value
                          formik.setFieldValue('GIAVE', value ? data?.value : formik.values.GIAVE)
                        }}
                        options={LOAIVE}
                        renderInput={(params) => <MyTextField variant='outlined'
                          label='Loại vé' name="GIAVE" {...params} className='normal-field' />}
                      />
                      <MyTextField fullWidth
                        variant='outlined'
                        label='Ví trí'
                        placeholder='Vị trí ghế'
                        name="VITRI" />

                      <LoadingButton
                        loading={formik.isSubmitting}
                        variant='contained'
                        type='submit'
                      >
                        Đặt vé
                      </LoadingButton>
                    </Stack>
                  </Form>

                </Grid>
                <Divider orientation='vertical' flexItem />
                <Grid item md={6}>
                  <Box
                    sx={{
                      backgroundImage: `url(
                    'https://cdnmedia.webthethao.vn/uploads/2022-05-20/so-do-cho-ngoi-san-my-dinh.jpg'
                  )`,
                      height: '580px',
                      width: '700px',
                    }}
                  ></Box>
                </Grid>
              </Grid>)
            }}
          </Formik>
        </TabPanel>
      </Main>
    </Box>
  )
}

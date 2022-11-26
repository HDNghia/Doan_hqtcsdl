import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Stack, Tab, Tabs } from "@mui/material"
import { TabPanelProps } from "../../../interface/interface"
import axios from "axios"
import { Grid } from "@mui/material"
import * as yup from "yup"
import { Form, useFormik } from "formik"
import { TextField } from "@mui/material"

const initialValues = {
   ho: "",
   ten: "",
   ngaysinh: "",
   gioitinh: "",
   loai: "",
   tichluy: "",
}

const validationSchema = yup.object({
   ho: yup
      .string()
      .required("Vui lòng nhập họ")
      .max(128, "Vượt quá kí tự giới hạn"),
   ten: yup
      .string()
      .required("Vui lòng nhập tên của bạn")
      .max(128, "Vượt quá kí tự giới hạn"),
   ngaysinh: yup.date().required("Vui lòng nhập ngày sinh của bạn"),
   tichluy: yup.number(),
   loai: yup.string(),
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

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
   open?: boolean
}>(({ theme, open }) => ({
   flexGrow: 1,
   padding: theme.spacing(3),
   transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   marginLeft: `-${drawerWidth}px`,
   ...(open && {
      transition: theme.transitions.create("margin", {
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
      "aria-controls": `simple-tabpanel-${index}`,
   }
}

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
   transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
   justifyContent: "flex-end",
}))

export default function Admin() {
   const theme = useTheme()
   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState<number>(0)
   React.useEffect(() => {
      const getUserData = async () => {
         const res = await axios.get("/users")
         console.log(res)
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
   async function handleSubmit(value: any) {
      console.log(value)
   }
   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
   })

   return (
      <Box sx={{ display: "flex" }}>
         <CssBaseline />
         <AppBar position='fixed' open={open}>
            <Toolbar>
               <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
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
               "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
               },
            }}
            variant='persistent'
            anchor='left'
            open={open}
         >
            <DrawerHeader>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                     <ChevronLeftIcon />
                  ) : (
                     <ChevronRightIcon />
                  )}
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
               <Grid container spacing={3}>
                  <Grid item md={5}>
                     <Stack
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                        spacing={2}
                     >
                        <Typography variant='h4' color='red'>
                           Thông tin khách hàng
                        </Typography>
                        <Form noValidate onSubmit={formik.handleSubmit}></Form>
                     </Stack>
                  </Grid>
                  <Divider orientation='vertical' flexItem />
                  <Grid item md={6}>
                     hi
                  </Grid>
               </Grid>
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

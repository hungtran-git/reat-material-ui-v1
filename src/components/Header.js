import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles} from '@material-ui/core'
import { ChatBubbleOutline, PowerSettingsNew, NotificationsNone } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => {
    return (
        {
            root:{
                backgroundColor: '#fff'
            },
            searchInput:{
                opacity: '0.6',
                padding: '0px 8px',
                fontSize: '0.8rem',
                '&:hover':{
                    backgroundColor: '#f2f2f2',
                    '& .MuiSvgIcon-root':{
                        marginRight: theme.spacing(1)
                    }
                }
            }
        }
    )
});

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position='static' className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                        <InputBase 
                        placeholder="Search topics"
                        className={classes.searchInput}
                        startAdornment={<SearchIcon fontSize="small" />}
                        />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNone />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color="primary">
                                <ChatBubbleOutline />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge>
                                <PowerSettingsNew />
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

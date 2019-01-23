import React from "react";
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles, {StyleRules, WithStyles} from '@material-ui/core/styles/withStyles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from "@material-ui/core/Avatar/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {signUp} from "./firebase/auth";
import TextField from "@material-ui/core/TextField/TextField";
import {updateUser} from "./firebase/db";

const styles = (theme: Theme): StyleRules => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

interface Props extends WithStyles<typeof styles> {
}

// SignUp用のinterface
interface SignUpObject {
  username: string,
  email: string,
  password: string,
  error: any | null,
}

class SignUp extends React.Component<Props, SignUpObject> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: null
    };
  }

  // input要素が変更された時のハンドリング
  private handleChange = (event: any) => {
    // エラー内容をクリア
    this.setState({error: null});

    if (event.target.name === "username") {
      this.setState({username: event.target.value});
    } else if (event.target.name === "email") {
      this.setState({email: event.target.value});
    } else if (event.target.name === "password") {
      this.setState({password: event.target.value});
    }
  };

  // submitされた時の挙動
  private handleSubmit = async (event: any) => {
    event.preventDefault();
    //  // Firebaseにサインアップ
    try {
      // emailとpasswordで登録
      const authUser = await signUp(this.state.email, this.state.password);
      // ユーザ情報の更新
      if (authUser.user) {
          await updateUser({uid: authUser.user.uid, name: this.state.username, email: this.state.email});
      }
    } catch (e) {
      this.setState({
        error: e
      });
    }
  };

  // エラーハンドリング
  private handleError = () => {
    let errorMessage = "";
    if (this.state.error.code === "auth/weak-password") {
      errorMessage = "パスワードは6文字以上で入力して下さい。";
    } else {
      errorMessage = this.state.error.message;
    }
    return (
      <TextField
        error
        fullWidth
        id="outlined-error"
        label="Error"
        value={errorMessage}
        margin="normal"
        variant="filled"
      />
    );
  };

  render() {
    const state = this.state;
    const {classes} = this.props;
    return (
      <div>
        <main className={classes.main}>
          <CssBaseline/>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <form onSubmit={this.handleSubmit} className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">UserName</InputLabel>
                <Input name={"username"} id="username" value={state.username} onChange={this.handleChange}/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input name={"email"} id="email" value={state.email} onChange={this.handleChange}/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name={"password"} id="password" type="password" value={state.password}
                       onChange={this.handleChange}/>
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
          </Paper>
        </main>
        {state.error !== null && this.handleError()}
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);